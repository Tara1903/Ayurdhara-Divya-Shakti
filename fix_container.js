const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

// The pattern is:
// </div> (closing the text-center div)
// <div className="flex overflow-x-auto...
// ...
// </div> (closing the tabs)
// <div className="min-h-[400px]">
// We need to move the tabs OUTSIDE the container.

// Let's replace the structure for all 4 sections.
// Section 3, 5, 7, 9 all have:
/*
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            ...
          </div>
  
          {/* Category Tabs *\/}
          <div className="flex overflow-x-auto ...">
            ...
          </div>
  
          {/* Product Grid *\/}
*/

c = c.replace(
  /<div className="text-center mb-12">\s*<h2(.*?)<\/h2>\s*<p(.*?)<\/p>\s*<\/div>\s*\{\/\* Category Tabs \*\/}/g,
  '<div className="text-center mb-12">\n            <h2$1</h2>\n            <p$2</p>\n          </div>\n        </div>\n\n        {/* Category Tabs - Edge to Edge */}'
);

c = c.replace(
  /<\/div>\s*\{\/\* Product Grid \*\/\}/g,
  '</div>\n\n        <div className="container mx-auto px-4 sm:px-6 lg:px-8">\n          {/* Product Grid */}'
);

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed container nesting');
