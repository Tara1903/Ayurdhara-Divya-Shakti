const fs = require('fs');
let c = fs.readFileSync('src/app/globals.css', 'utf8');

const utility = `

@layer utilities {
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
`;

c = c + utility;
fs.writeFileSync('src/app/globals.css', c);
console.log('Added scrollbar-hide');
