const path = require('path');
const fs = require('fs');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

console.log('Welcome, enter your text');

process.stdin.on('data', (data) => {
  const userData = data.toString().trim();

  if (userData === 'exit') {
    writeStream.end();
    process.exit();
  }

  writeStream.write(userData);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  console.log('Writing is done');
});
