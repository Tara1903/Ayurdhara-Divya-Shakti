const fs = require('fs');

function extractMain(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const mainMatch = html.match(/<main>([\s\S]*?)<\/main>/);
  if (!mainMatch) return '';
  return mainMatch[1];
}

function convertToJSX(htmlFile, outFile) {
  let content = extractMain(htmlFile);
  if (!content) return;
  
  // Since we are wrapping it in dangerouslySetInnerHTML, we don't need to change class to className!
  // Wait, dangerouslySetInnerHTML requires a string, so we just pass the raw HTML string.
  
  const pageCode = `export default function Page() {
  return (
    <main dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}`;

  fs.writeFileSync(outFile, pageCode);
}

convertToJSX('index.html', 'src/app/page.tsx');
// For collections, we'll need to create the dir first
if (!fs.existsSync('src/app/collections')) fs.mkdirSync('src/app/collections');
convertToJSX('collections.html', 'src/app/collections/page.tsx');
console.log('Converted pages to Next.js using dangerouslySetInnerHTML');
