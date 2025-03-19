# Checklist to Analyze and Identify Licenses of Dependencies in a Monorepo

## Step 1: Create the Node.js Script

1. **Create the file `check-licenses.js` at the root of the monorepo with the following content:**

   ```javascript name=check-licenses.js
   const licenseChecker = require("license-checker");
   const fs = require("fs");

   licenseChecker.init(
     {
       start: ".", // Start at the root of the monorepo
       json: true,
     },
     function (err, packages) {
       if (err) {
         console.error(err);
         process.exit(1);
       } else {
         const licenseMap = {};

         Object.keys(packages).forEach((pkg) => {
           const license = packages[pkg].licenses;
           if (!licenseMap[license]) {
             licenseMap[license] = [];
           }
           licenseMap[license].push(pkg);
         });

         fs.writeFileSync("licenses.json", JSON.stringify(licenseMap, null, 2));
         console.log(
           "Licenses have been successfully checked and grouped. See licenses.json for details."
         );
       }
     }
   );
   ```

## Step 2: Set Up a GitHub Actions Workflow

1. **Create the GitHub Actions workflow file `.github/workflows/check-licenses.yml` with the following content:**

   ```yaml name=.github/workflows/check-licenses.yml
   name: Check Licenses

   on:
     push:
       branches:
         - main
     pull_request:
       branches:
         - main
     workflow_dispatch:

   jobs:
     check-licenses:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout repository
           uses: actions/checkout@v4

         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: "14"

         - name: Install dependencies
           run: npm install license-checker

         - name: Run license checker script
           run: node check-licenses.js

         - name: Upload licenses report
           uses: actions/upload-artifact@v2
           with:
             name: licenses-report
             path: licenses.json
   ```

## Step 3: Install Dependencies

1. **Install the `license-checker` package in your project:**

   ```sh
   npm install license-checker --save-dev
   ```

## Summary Checklist

1. **Create the Node.js script `check-licenses.js` with the provided content.**
2. **Create the GitHub Actions workflow file `.github/workflows/check-licenses.yml` with the provided content.**
3. **Install the `license-checker` package by running `npm install license-checker --save-dev`.**
4. **Push the changes to the `main` branch of the repository.**
