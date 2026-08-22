const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.allowScripts = {
  "core-js": true,
  "unrs-resolver": true
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Fixed warnings');
