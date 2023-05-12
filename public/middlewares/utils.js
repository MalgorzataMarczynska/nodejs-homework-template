const fs = require("fs/promises");
const isAccessible = (dir) =>
  fs
    .access(dir)
    .then(() => true)
    .catch(() => false);

const initDirectory = async (dir) => {
  if (await isAccessible(dir))
    return console.log(`Directory '${dir}' already exists.`);

  console.log(`Initializing directory '${dir}'...`);
  await fs.mkdir(dir);
};

module.exports = { isAccessible, initDirectory };
