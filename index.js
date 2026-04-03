const { spawn, execSync } = require("child_process");

function checkDockerRunning() {
  try {
    execSync("docker info", { stdio: "ignore" });
    return true;
  } catch (err) {
    return false;
  }
}

function checkMigrationStatus() {
  try {
    execSync("cd ./backend && node ace migration:status", { stdio: "inherit" });
    return true;
  } catch (err) {
    return false;
  }
}

// const dockerRunning = checkDockerRunning();
// if (!dockerRunning) {
//   console.log("Please start docker!");
//   process.exit(1);
// }

// const migrateExecuted = checkMigrationStatus();
// if (!migrateExecuted) {
//   console.log("Please execute migration!");
//   process.exit(1);
// }

const npm = spawn("npm", ["run", "start"], {
  shell: true,
  stdio: "ignore",
  detached: true,
});

npm.unref();

const fs = require("fs");