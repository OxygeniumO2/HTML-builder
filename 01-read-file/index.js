const path = require('path');
const fs = require('fs');

let stream = new fs.ReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});
let arrData = [];

stream.on('readable', () => {
  let data = stream.read();
  arrData.push(data);
});

stream.on('end', () => {
  console.log(arrData.join(''));
});
