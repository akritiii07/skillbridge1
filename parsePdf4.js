const fs = require('fs');
const path = require('path');

// Use pdfjs-dist
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf');

async function extractText() {
  const data = new Uint8Array(fs.readFileSync('pranaw_pp.pdf'));
  
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  
  console.log('Total Pages:', pdf.numPages);
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    const pageText = textContent.items.map(item => item.str).join(' ');
    console.log(`\n=== PAGE ${i} ===\n`);
    console.log(pageText);
    fullText += pageText + '\n\n';
  }
  
  // Save to file for reference
  fs.writeFileSync('pdf_content.txt', fullText);
  console.log('\n\nSaved full content to pdf_content.txt');
}

extractText().catch(console.error);