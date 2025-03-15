const { exec } = require("child_process");
const fs = require("fs");

exec("pnpm outdated -r", (err, stdout, stderr) => {
  fs.writeFile("REPORT_OUTDATED_DEPENDENCIES.md", stdout, (err) => {
    if (err) {
      console.error(`File write error : ${err}`);
      return;
    }
  });
});
