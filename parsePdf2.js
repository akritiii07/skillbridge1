const PDFJS = require('pdf2json');
const fs = require('fs');

const pdfParser = new PDFJS();

pdfParser.on('pdfParser_dataReady', function(evt) {
  console.log('=== PDF CONTENT ===\n');
  // Get all text from all pages
  const text = pdfParser.getRawTextContent();
  console.log(text.substring(0, 15000));
});

pdfParser.on('pdfParser_error', function(evt) {
  console.error('Error:', evt);
});

pdfParser.loadPDF('pranaw_pp.pdf');