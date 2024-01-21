const path = require('path');
const fs = require('fs');
const { readdir } = require('fs').promises;

(async () => {
  const bundleCssStream = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    {
      encoding: 'utf-8',
    },
  );
  const folderToCopyPath = path.join(__dirname, 'styles');
  const files = await readdir(folderToCopyPath);
  for (let file of files) {
    if (path.extname(file) === '.css') {
      const filePath = path.join(folderToCopyPath, file);
      const readStreamFile = fs.createReadStream(filePath);
      readStreamFile.pipe(bundleCssStream, { end: false });
      readStreamFile.on('end', () => {
        if (file === files[files.length - 1]) {
          bundleCssStream.end();
        }
      });
    }
  }
})();
