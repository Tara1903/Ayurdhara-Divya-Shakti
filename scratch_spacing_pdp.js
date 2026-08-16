const fs = require('fs');

const files = [
  'src/components/PDPClient.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    content = content.replace(/\bpy-16\b/g, 'py-8');
    content = content.replace(/py-12 md:py-16/g, 'py-8 md:py-10');
    content = content.replace(/mb-12 md:mb-16/g, 'mb-8 md:mb-10');
    content = content.replace(/mt-12 md:mt-16/g, 'mt-8 md:mt-10');
    content = content.replace(/py-10 md:py-14/g, 'py-6 md:py-8');
    content = content.replace(/mb-10 md:mb-14/g, 'mb-6 md:mb-8');
    content = content.replace(/mt-10 md:mt-14/g, 'mt-6 md:mt-8');

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
