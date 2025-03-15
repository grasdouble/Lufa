const { exec } = require("child_process");
const fs = require("fs");

exec("pnpm outdated -r", (err, stdout, stderr) => {
  const reportContent = `# Outdated Dependencies Report\n\n${
    stdout.trim() || "No outdated dependency"
  }`;

  fs.writeFile(
    "docs/reports/OUTDATED_DEPENDENCIES.report",
    reportContent,
    (err) => {
      if (err) {
        console.error(`File write error : ${err}`);
        return;
      }
      console.log("Report generated successfully.");
    }
  );
});
