const { promisify } = require("util");
const fs = {
  existsSync: require("fs").existsSync,
  readFileSync: require("fs").readFileSync,
  readFile: promisify(require("fs").readFile),
  writeFile: promisify(require("fs").writeFile),
};

module.exports = fs;
