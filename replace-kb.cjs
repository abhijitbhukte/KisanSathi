const fs = require('fs');

const newKbContent = fs.readFileSync('new-kb.ts', 'utf-8');
const kbArrayStr = newKbContent.replace('export const newKB = ', 'const KB = ');

const files = [
  'frontend/src/components/ChatbotWidget.tsx',
  'frontend/src/pages/ChatbotPage.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Find the start of the KB array
  const startIdx = content.indexOf('const KB = [');
  // Find the end of the KB array (right before function detectLanguage)
  const endIdx = content.indexOf('];\n\nfunction detectLanguage');
  
  if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find KB in', file);
    continue;
  }
  
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx + 2); // keep the semi-colon and on
  
  const newContent = before + kbArrayStr + after;
  fs.writeFileSync(file, newContent, 'utf-8');
  console.log('Updated', file);
}
