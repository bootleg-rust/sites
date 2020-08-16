const { promisify } = require("util");
const _exec = promisify(require("child_process").exec);

module.exports = {
  exec,
};

/* eslint-disable no-console */

// TODO: this should really stream to stdout and stderr
async function exec(str) {
  console.log(`> ${str}`);
  const { stdout, stderr } = await _exec(str);
  if (stdout) {
    console.log("stdout:", stdout);
  }
  if (stderr) {
    console.log("stderr:", stderr);
  }
  return stdout.trim();
}
