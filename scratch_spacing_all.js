const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/app/(storefront)', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    content = content.replace(/\bpy-24\b/g, 'py-12 md:py-16');
    content = content.replace(/\bpy-20\b/g, 'py-10 md:py-14');
    content = content.replace(/\bmb-24\b/g, 'mb-12 md:mb-16');
    content = content.replace(/\bmb-20\b/g, 'mb-10 md:mb-14');
    content = content.replace(/\bmt-24\b/g, 'mt-12 md:mt-16');
    content = content.replace(/\bmt-20\b/g, 'mt-10 md:mt-14');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + filePath);
    }
  }
});
