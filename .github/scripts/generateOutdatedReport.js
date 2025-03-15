const { exec } = require("child_process");
const fs = require("fs").promises;

const generateReport = async () => {
  try {
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec("pnpm outdated -r", (err, stdout, stderr) => {
        if (err) {
          reject(err);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });

    const report = `# Outdated Dependencies Report\n\n${
      stdout || "No outdated dependencies identified"
    }`;

    await fs.writeFile("REPORT_OUTDATED_DEPENDENCIES.md", report);
    console.log("Report generated successfully.");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

generateReport();
