const path = require('path');
const fs = require('fs');
const { readdir, mkdir, writeFile, appendFile, rm, readFile } =
  require('fs').promises;

(async () => {
  let files = await readdir(__dirname);
  let isFolderExist = false;
  for (let file of files) {
    if (file === 'project-dist') isFolderExist = true;
  }
  if (isFolderExist) {
    await rm(path.join(__dirname, 'project-dist'), { recursive: true });
  }
  const projectFolder = path.join(__dirname, 'project-dist');
  await mkdir(projectFolder);

  const indexPath = path.join(projectFolder, 'index.html');
  const stylePath = path.join(projectFolder, 'style.css');

  await appendFile(indexPath, '');
  await appendFile(stylePath, '');

  const componentsPath = path.join(__dirname, 'components');
  const htmlFiles = (await readdir(componentsPath)).filter((file) =>
    file.endsWith('.html'),
  );

  const templatePath = path.join(__dirname, 'template.html');
  let templateData = await readFile(templatePath, 'utf-8');

  for (let file of htmlFiles) {
    const sectionName = path.basename(file, '.html');
    const sectionData = await readFile(
      path.join(__dirname, 'components', file),
      'utf-8',
    );
    const pattern = new RegExp(`{{${sectionName}}}`, 'g');
    templateData = templateData.replace(pattern, sectionData);
  }

  await writeFile(indexPath, templateData);

  const styleCssStream = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'style.css'),
    {
      encoding: 'utf-8',
    },
  );
  const folderToCopyPath = path.join(__dirname, 'styles');
  const filesStyle = await readdir(folderToCopyPath);
  for (let file of filesStyle) {
    if (path.extname(file) === '.css') {
      const filePath = path.join(folderToCopyPath, file);
      const readStreamFile = fs.createReadStream(filePath);
      readStreamFile.on('data', (chunk) => {
        styleCssStream.write(chunk);
      });
    }
  }

  const srcAssetsFolder = path.join(__dirname, 'assets');
  const destAssetsFolder = path.join(__dirname, 'project-dist', 'assets');
  const destAssetsImg = path.join(__dirname, 'project-dist', 'assets', 'img');
  const destAssetsFonts = path.join(
    __dirname,
    'project-dist',
    'assets',
    'fonts',
  );
  const destAssetsSvg = path.join(__dirname, 'project-dist', 'assets', 'svg');

  await mkdir(destAssetsFolder);
  await mkdir(destAssetsImg);
  await mkdir(destAssetsFonts);
  await mkdir(destAssetsSvg);

  const srcAssetsImg = path.join(srcAssetsFolder, 'img');
  const fileSourceImg = await readdir(srcAssetsImg);

  for (let file of fileSourceImg) {
    const fileContent = await readFile(path.join(srcAssetsImg, file));
    await writeFile(path.join(destAssetsImg, file), fileContent);
  }

  const srcAssetsFonts = path.join(srcAssetsFolder, 'fonts');
  const fileSourceFonts = await readdir(srcAssetsFonts);

  for (let file of fileSourceFonts) {
    const fileContent = await readFile(path.join(srcAssetsFonts, file));
    await writeFile(path.join(destAssetsFonts, file), fileContent);
  }

  const srcAssetsSvg = path.join(srcAssetsFolder, 'svg');
  const fileSourceSvg = await readdir(srcAssetsSvg);

  for (let file of fileSourceSvg) {
    const fileContent = await readFile(path.join(srcAssetsSvg, file));
    await writeFile(path.join(destAssetsSvg, file), fileContent);
  }
})();
