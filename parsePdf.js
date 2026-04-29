const pdf = require('pdf-parse');
const fs = require('fs');

const dataBuffer = fs.readFileSync('pranaw_pp.pdf');

pdf(dataBuffer).then(function(data) {
  console.log('Total Pages:', data.numpages);
  console.log('\n=== PDF CONTENT ===\n');
  console.log(data.text);
}).catch(function(error) {
  console.error('Error:', error);
});