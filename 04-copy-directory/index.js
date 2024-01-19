const path = require('path');
const fs = require('fs').promises;
const { readdir, mkdir } = require('fs').promises;

(async () => {
  let files = await readdir(__dirname);
  let isFolderExist = false;
  for (let file of files) {
    if (file === 'files-copy') isFolderExist = true;
  }
  if (isFolderExist) {
    await fs.rm(path.join(__dirname, 'files-copy'), { recursive: true });
  }
  const newFolder = path.join(__dirname, 'files-copy');
  await mkdir(newFolder);
  const fileSourceDir = await readdir(path.join(__dirname, 'files'));
  for (let file of fileSourceDir) {
    const fileContent = await fs.readFile(path.join(__dirname, 'files', file));
    await fs.writeFile(path.join(__dirname, 'files-copy', file), fileContent);
  }
})();
