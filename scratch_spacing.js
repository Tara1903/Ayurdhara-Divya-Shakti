const fs = require('fs');

const files = [
  'src/app/(storefront)/HomepageClient.tsx',
  'src/app/(storefront)/(categories)/[category]/[subcategory]/BodyMassageOilLandingClient.tsx',
  'src/components/PDPClient.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace py-24 with py-12 md:py-16
    content = content.replace(/\bpy-24\b/g, 'py-12 md:py-16');
    
    // Replace py-16 with py-8 md:py-12 (except where we just added md:py-16 to avoid messing it up)
    // Actually safer to just do a direct string replace if they are in section classNames
    
    // We can also target mb-24 -> mb-12, mt-24 -> mt-12
    content = content.replace(/\bmb-24\b/g, 'mb-12 md:mb-16');
    content = content.replace(/\bmt-24\b/g, 'mt-12 md:mt-16');

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
