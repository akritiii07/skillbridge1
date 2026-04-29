const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function extractPDF() {
  try {
    const pdfBuffer = fs.readFileSync('pranaw_pp.pdf');
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pages = pdfDoc.getPages();
    console.log('Total Pages:', pages.length);
    
    let fullText = '';
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { height } = page.getSize();
      const textContent = page.getTextContent();
      
      console.log(`\n=== PAGE ${i + 1} ===\n`);
      for (const item of textContent.items) {
        fullText += item.str;
      }
      console.log(fullText);
      fullText = '';
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

extractPDF();