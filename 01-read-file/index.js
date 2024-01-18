const path = require('path');
const fs = require('fs');

let stream = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});
let data = '';

stream.on('data', (chunk) => {
  data += chunk;
});

stream.on('end', () => {
  console.log(data);
});
