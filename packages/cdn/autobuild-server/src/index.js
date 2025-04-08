import express from "express";
import path from "path";
import fs from "fs-extra";
import { build } from "esbuild";
import pacote from "pacote";
import os from "os";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import sanitize from "sanitize-filename";
import escapeHtml from "escape-html";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});
const PORT = process.env.PORT || 3000;
const TMP_DIR = process.env.TMP_DIR || path.join(os.tmpdir(), "tmp_cdn");
const CDN_DIR = process.env.CDN_DIR || path.join(os.tmpdir(), "cdn");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Generates a clear file name, with @ and / preserved
const makeDirName = (pkg, version) => `${pkg}@${version}`;

app.use(limiter);
app.get(
  [
    "/npm{/:scope}/:name@:version{/:exportPath}",
    "/gh{/:scope}/:name@:version{/:exportPath}",
  ],
  async (req, res) => {
    const { scope, name, version, exportPath } = req.params;
    const sanitizedScope = scope ? sanitize(scope) : "";
    const sanitizedName = sanitize(name);
    const sanitizedVersion = sanitize(version);
    const pkgName = sanitizedScope
      ? `${sanitizedScope}/${sanitizedName}`
      : sanitizedName;
    const fullName = `${pkgName}@${sanitizedVersion}`;
    const dirName = makeDirName(pkgName, sanitizedVersion);

    const pkgPath = path.resolve(CDN_DIR, dirName);
    if (path.relative(CDN_DIR, pkgPath).startsWith('..') || path.isAbsolute(path.relative(CDN_DIR, pkgPath))) {
      return res.status(403).send("Forbidden");
    }

    const packageJsonPath = path.resolve(pkgPath, "package.json");

    if (
      !packageJsonPath.startsWith(CDN_DIR) ||
      !fs.existsSync(packageJsonPath)
    ) {
      console.log(`Package ${fullName} not yet in the cdn.`);

      try {
        if (sanitizedScope === "@grasdouble") {
          const cdnDir = path.resolve(CDN_DIR, dirName);
          if (!cdnDir.startsWith(CDN_DIR)) {
            return res.status(403).send("Forbidden");
          }
          await fs.emptyDir(cdnDir);
          // For @grasdouble packages, we use the GitHub registry
          await pacote.extract(fullName, cdnDir, {
            registry: "https://npm.pkg.github.com",
            scope: "@grasdouble",
            headers: {
              authorization: `Bearer ${GITHUB_TOKEN}`,
            },
          });
        } else {
          const tmpDir = path.resolve(TMP_DIR, dirName);
          if (!tmpDir.startsWith(TMP_DIR)) {
            return res.status(403).send("Forbidden");
          }
          await fs.emptyDir(tmpDir);
          await pacote.extract(fullName, tmpDir);

          const pkgJson = await fs.readJson(
            path.resolve(tmpDir, "package.json")
          );
          let entry =
            pkgJson.module ||
            pkgJson.exports?.["."]?.import ||
            pkgJson.exports?.["."]?.default ||
            pkgJson.main;

          if (typeof entry !== "string") {
            return res
              .status(500)
              .send(
                `The entry point for ${escapeHtml(fullName)} is not valid.`
              );
          }

          const entryPath = path.resolve(tmpDir, entry);
          const outputFile = path.resolve(pkgPath, entry);
          if (
            !entryPath.startsWith(tmpDir) ||
            !outputFile.startsWith(pkgPath)
          ) {
            return res.status(403).send("Invalid path");
          }

          const externals = [
            ...Object.keys(pkgJson.peerDependencies || {}),
            "react/jsx-runtime",
            "react-dom/client",
          ];

          // TODO: Evaluate if this approach should be removed to prevent potential errors.
          await build({
            entryPoints: [entryPath],
            bundle: true,
            outfile: outputFile,
            platform: "browser",
            format: "esm",
            external: externals,
          });

          // Copy the package.json to the output folder
          await fs.copy(
            path.resolve(tmpDir, "package.json"),
            path.resolve(pkgPath, "package.json")
          );
          return res.sendFile(outputFile);
        }
      } catch (err) {
        console.error(`❌ Error with ${fullName}:`, err);
        return res
          .status(500)
          .send(`Error with the package ${escapeHtml(fullName)}`);
      }
    } else {
      console.log(`The package ${fullName} already exists.`);
      const pkgJson = await fs.readJson(path.join(pkgPath, "package.json"));
      let entry =
        pkgJson.module ||
        pkgJson.exports?.["."]?.import ||
        pkgJson.exports?.["."]?.default ||
        pkgJson.main;

      if (typeof entry !== "string") {
        return res
          .status(500)
          .send(`The entry point for ${fullName} is not valid.`);
      }
      const outputFile = path.join(pkgPath, `${entry}`);
      return res.sendFile(outputFile);
    }
  }
);

app.listen(PORT, () => {
  console.log(`🚀 CDN auto-build dispo sur http://localhost:${PORT}`);
  console.log("TMP_DIR: ", TMP_DIR);
  console.log("CDN_DIR: ", CDN_DIR);
});
