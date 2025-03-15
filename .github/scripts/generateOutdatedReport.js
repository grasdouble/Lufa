const { exec } = require("child_process");
const fs = require("fs");

exec("pnpm outdated -r", (err, stdout, stderr) => {
  fs.writeFile("reports/OUTDATED_DEPENDENCIES.report", stdout, (err) => {
    if (err) {
      console.error(`File write error : ${err}`);
      return;
    }
  });
});
