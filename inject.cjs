const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'collections.html');
const productsHtmlPath = path.join(__dirname, 'products_html.txt');

let html = fs.readFileSync(htmlPath, 'utf8');
const productsHtml = fs.readFileSync(productsHtmlPath, 'utf8');

const startTag = '<div class="product-grid-collection" id="product-grid">';
const endTag = '</div>\n\n    <!-- Load More -->';

const startIndex = html.indexOf(startTag);
const endIndex = html.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  const newHtml = html.substring(0, startIndex + startTag.length) + '\n' + productsHtml + '\n      ' + html.substring(endIndex);
  fs.writeFileSync(htmlPath, newHtml);
  console.log('Successfully injected products HTML');
} else {
  console.error('Could not find start or end tags in collections.html');
}
