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
    
    // Original py-16 that was untouched
    content = content.replace(/\bpy-16\b/g, 'py-8');
    
    // What we changed py-24 to:
    content = content.replace(/py-12 md:py-16/g, 'py-8 md:py-10');
    content = content.replace(/mb-12 md:mb-16/g, 'mb-8 md:mb-10');
    content = content.replace(/mt-12 md:mt-16/g, 'mt-8 md:mt-10');
    
    // What we changed py-20 to:
    content = content.replace(/py-10 md:py-14/g, 'py-6 md:py-8');
    content = content.replace(/mb-10 md:mb-14/g, 'mb-6 md:mb-8');
    content = content.replace(/mt-10 md:mt-14/g, 'mt-6 md:mt-8');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + filePath);
    }
  }
});
