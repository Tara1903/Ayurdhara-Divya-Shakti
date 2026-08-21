const fs = require('fs');
let c = fs.readFileSync('src/components/PDPClient.tsx', 'utf8');

c = c.replace(/return \\ - \\;/g, "return fmt(d1) + ' - ' + fmt(d2);");
fs.writeFileSync('src/components/PDPClient.tsx', c);
console.log('Fixed delivery');
