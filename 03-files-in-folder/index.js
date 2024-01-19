const path = require('path');
const { readdir, stat } = require('fs').promises;

(async () => {
  const folderPath = path.join(__dirname, 'secret-folder');
  const files = await readdir(folderPath);
  for (let file of files) {
    const filePath = path.join(folderPath, file);
    const fileStat = await stat(filePath);
    if (fileStat.isFile()) {
      const fileName = file.slice(0, file.lastIndexOf('.')) || file;
      const extName = path.extname(file).slice(1);
      const fileSize = fileStat.size;
      console.log(`${fileName} - ${extName} - ${fileSize}bytes`);
    }
  }
})();
