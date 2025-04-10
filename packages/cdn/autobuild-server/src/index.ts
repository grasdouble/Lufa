import express, { type Request, type Response } from 'express';
import path from 'path';
import fs from 'fs-extra';
import pacote from 'pacote';
import os from 'os';
import rateLimit from 'express-rate-limit';
import sanitize from 'sanitize-filename';
import escapeHtml from 'escape-html';

import '@dotenvx/dotenvx/config';

interface PackageJson {
    name: string;
    version: string;
    type?: 'module' | 'commonjs';
    main?: string;
    module?: string;
    exports?: Record<string, string | { import?: string; default?: string }>;
    peerDependencies?: Record<string, string>;
}

interface ExtractedParams {
    scope?: string;
    exportPath?: string;
    fullName: string;
    dirName: string;
    cdnPkgPath: string;
    tmpPkgPath: string;
}

interface LoadLibraryResult {
    status: number;
    message: string;
}

const app: express.Application = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

const PORT = process.env.PORT || 3000;
const TMP_DIR = process.env.TMP_DIR || path.join(os.tmpdir(), 'tmp_cdn');
const CDN_DIR = process.env.CDN_DIR || path.join(os.tmpdir(), 'cdn');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const NODE_ENV = process.env.NODE_ENV;

// Generates a clear file name, with @ and / preserved
const makePackageDirName = (pkg: string, version: string) => `${pkg}@${version}`;

const getPackageName = (scope: string | undefined, name: string) => {
    if (scope) {
        return `${scope}/${name}`;
    }
    return name;
};

type ExtractParamsProps = {
    urlScope?: string;
    urlName: string;
    urlVersion?: string;
    urlExportPath?: string;
};

const extractParams = ({ urlScope, urlName, urlVersion, urlExportPath }: ExtractParamsProps) => {
    // Sanitize the inputs
    const scope = typeof urlScope === 'string' ? sanitize(urlScope) : undefined;
    const name = typeof urlName === 'string' ? sanitize(urlName) : '';
    const version = typeof urlVersion === 'string' ? sanitize(urlVersion) : '';
    const exportPath = typeof urlExportPath === 'string' ? `./${sanitize(urlExportPath)}` : '.';

    const fullName = `${getPackageName(scope, name)}@${version}`;
    const dirName = makePackageDirName(getPackageName(scope, name), version);

    const cdnPkgPath = path.resolve(CDN_DIR, dirName);
    const tmpPkgPath = path.resolve(TMP_DIR, dirName);

    return {
        scope,
        exportPath,
        fullName,
        dirName,
        tmpPkgPath,
        cdnPkgPath,
    };
};

type LoadLibraryProps = {
    scope?: string;
    fullName: string;
    tmpPkgPath: string;
    cdnPkgPath: string;
};
const loadLibrary = async ({ scope, fullName, tmpPkgPath, cdnPkgPath }: LoadLibraryProps) => {
    // Check if the path is outside the CDN_DIR
    if (!tmpPkgPath.startsWith(TMP_DIR) || !cdnPkgPath.startsWith(CDN_DIR)) {
        console.error('❌ Path is outside the CDN_DIR or TMP_DIR');
        return {
            status: 403,
            message: 'Forbidden',
        };
    }

    try {
        if (scope === '@grasdouble') {
            console.log(`Loading package ${fullName} from GitHub...`);
            // For @grasdouble packages, we use the GitHub registry
            await pacote.extract(fullName, cdnPkgPath, {
                registry: 'https://npm.pkg.github.com',
                scope: '@grasdouble',
                headers: {
                    authorization: `Bearer ${GITHUB_TOKEN}`,
                },
            });
        } else {
            console.log(`Loading package ${fullName} from npm...`);
            await pacote.extract(fullName, tmpPkgPath);
        }
        console.log(`Package ${fullName} loaded successfully.`);
        return {
            status: 200,
            message: 'Package loaded successfully from npm or github',
        };
    } catch (err) {
        console.error(`❌ Error with ${fullName}:`, err);
        if (tmpPkgPath) {
            await fs.remove(tmpPkgPath);
        }
        if (cdnPkgPath) {
            await fs.remove(cdnPkgPath);
        }
        return {
            status: 500,
            message: `Error with the package ${escapeHtml(fullName)}`,
        };
    }
};

type SendEntryProps = {
    exportPath: string;
    cdnPkgPath: string;
    fullName: string;
};
const sendEntry = async ({ exportPath, cdnPkgPath, fullName }: SendEntryProps) => {
    const pkgJson: PackageJson = await fs.readJson(path.join(cdnPkgPath, 'package.json'));

    const entry =
        (typeof pkgJson.exports?.[exportPath] === 'object' && pkgJson.exports?.[exportPath]?.import) ||
        (typeof pkgJson.exports?.[exportPath] === 'object' && pkgJson.exports?.[exportPath]?.default) ||
        pkgJson.exports?.[exportPath] ||
        pkgJson.module ||
        pkgJson.main;
    if (typeof entry !== 'string') {
        return {
            status: 500,
            message: `The entry point for ${escapeHtml(fullName)} is not valid.`,
        };
    }
    const outputFile = path.resolve(cdnPkgPath, entry);
    console.log(`Entry point path found: ${outputFile}`);

    return { status: 200, outputFile };
};

app.use(limiter);

app.get(['{/:urlScope}/:urlName@:urlVersion{/:urlExportPath}'], async (req: Request, res: Response): Promise<void> => {
    const { scope, exportPath, fullName, tmpPkgPath, cdnPkgPath }: ExtractedParams = extractParams(req.params as ExtractParamsProps);

    // Confirm that the path is not outside the CDN_DIR
    // and that it is not an absolute path
    // This is a security measure to prevent path traversal attacks
    // and to ensure that the package is being extracted in the correct directory
    if (path.relative(CDN_DIR, cdnPkgPath).startsWith('..') || path.isAbsolute(path.relative(CDN_DIR, cdnPkgPath))) {
        res.status(403).send('Forbidden');
        return;
    }

    const pkgJsonPath = path.resolve(cdnPkgPath, 'package.json');
    const tmpPkgJsonPath = path.resolve(tmpPkgPath, 'package.json');

    if (!pkgJsonPath || !fs.existsSync(pkgJsonPath)) {
        console.log(`Package ${fullName} not yet in the cdn.`);

        if (tmpPkgJsonPath && fs.existsSync(tmpPkgJsonPath)) {
            const pkgJson: PackageJson = await fs.readJson(tmpPkgJsonPath);
            if (pkgJson.type !== 'module') {
                console.log(`Package ${fullName} is not in ESM format. Skip it`);
                res.status(415).send(`⚠ We can't manage ${fullName} ⚠<br/> The CDN can manage only ESM packages.`);
                return;
            }
        }

        const loadResult: LoadLibraryResult = await loadLibrary({
            scope,
            fullName,
            tmpPkgPath,
            cdnPkgPath,
        });

        // Check if the load was successful from npm or github
        if (loadResult.status !== 200) {
            console.log(`❌ Error loading package ${fullName}:`, loadResult.message);
            res.status(loadResult.status).send(loadResult.message);
            return;
        }

        // An extra step is needed for packages not in the @grasdouble scope
        // we want to ensure that package is built in ESM format
        // and that the entry point is correct
        if (scope !== '@grasdouble') {
            console.log(`Start to check if the package ${fullName} is in ESM format...`);
            const pkgJson: PackageJson = await fs.readJson(path.join(tmpPkgPath, 'package.json'));
            if (pkgJson.type !== 'module') {
                console.log(`Package ${fullName} is not in ESM format. Skip it`);
                res.status(415).send(`⚠ We can't manage ${fullName} ⚠<br/> The CDN can manage only ESM packages.`);
            } else {
                console.log(`Package ${fullName} is already in ESM format.`);
                console.log(`Copying package.json to the CDN...`);
                await fs.copy(path.resolve(tmpPkgPath), path.resolve(cdnPkgPath));
            }
        }
    }

    // Starting from this point, we assume that the package is already in the CDN
    // and we just need to serve it
    console.log(`Package ${fullName} is in the CDN. Serving...`);
    const result = await sendEntry({
        cdnPkgPath,
        exportPath,
        fullName,
    });
    if (result.status !== 200) {
        res.status(result.status).send(result.message);
        return;
    }

    if (result.outputFile) {
        console.log(`Serving file ${result.outputFile}...`);
        if (!fs.existsSync(result.outputFile)) {
            // Need to wait a bit for the file to be created
            // This is a workaround for the fact that the file may not be created yet
            setTimeout(() => {
                res.status(200).sendFile(result.outputFile);
            }, 500);
        } else {
            res.status(200).sendFile(result.outputFile);
        }
    } else {
        res.status(500).send('Error: No output file found but it should the case');
    }
    return;
});

app.listen(PORT, () => {
    console.log(`🚀 CDN auto-build dispo sur http://localhost:${PORT}`);
    console.log('TMP_DIR: ', TMP_DIR);
    console.log('CDN_DIR: ', CDN_DIR);
});
