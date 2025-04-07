import express from "express";
import path from "path";
import fs from "fs-extra";
import { build } from "esbuild";
import pacote from "pacote";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const TMP_DIR = process.env.TMP_DIR || path.join(os.tmpdir(), "tmp_cdn");
const CDN_DIR = process.env.CDN_DIR || path.join(os.tmpdir(), "cdn");
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Generates a clear file name, with @ and / preserved
const makeDirName = (pkg, version) => `${pkg}@${version}`;

app.get(
  [
    "/npm{/:scope}/:name@:version{/:exportPath}",
    "/gh{/:scope}/:name@:version{/:exportPath}",
  ],
  async (req, res) => {
    const { scope, name, version, exportPath } = req.params;
    const pkgName = scope ? `${scope}/${name}` : name;
    const fullName = `${pkgName}@${version}`;
    const dirName = makeDirName(pkgName, version);

    const pkgPath = path.join(CDN_DIR, dirName);

    const packageJsonPath = path.join(pkgPath, "package.json");

    if (!fs.existsSync(packageJsonPath)) {
      console.log(`Package ${fullName} not yet in the cdn.`);

      try {
        if (scope === "@grasdouble") {
          const cdnDir = path.join(CDN_DIR, dirName);
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
          const tmpDir = path.join(TMP_DIR, dirName);
          await fs.emptyDir(tmpDir);
          await pacote.extract(fullName, tmpDir);

          const pkgJson = await fs.readJson(path.join(tmpDir, "package.json"));
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

          const entryPath = path.join(tmpDir, entry);
          const outputFile = path.join(pkgPath, entry);
          console.log("entry", entry);
          console.log("entryPath", entryPath);
          console.log("pkgPath", pkgPath);
          console.log("outputFile", outputFile);

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
            path.join(tmpDir, "package.json"),
            path.join(pkgPath, "package.json")
          );
          return res.sendFile(outputFile);
        }
      } catch (err) {
        console.error(`❌ Error with ${fullName}:`, err);
        return res.status(500).send(`Error with the package ${fullName}`);
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
