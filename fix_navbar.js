const fs = require('fs');
let c = fs.readFileSync('src/components/CategoryNavbar.tsx', 'utf8');

c = c.replace(
  "{navigationData.map((category) => {",
  "{navigationData.map((category, index) => {\n            const positionClass = index < 3 ? 'left-0' : index > navigationData.length - 4 ? 'right-0' : 'left-1/2 -translate-x-1/2';"
);

c = c.replace(
  /className=\{`absolute top-full left-1\/2 -translate-x-1\/2 w-\[600px\]/g,
  "className={`absolute top-full ${positionClass} w-[600px]"
);

fs.writeFileSync('src/components/CategoryNavbar.tsx', c);
console.log('Fixed navbar alignment');
