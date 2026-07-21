const fs = require('fs');

function extractAppContent(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  // Get everything inside <div id="app">
  const appMatch = html.match(/<div id="app">([\s\S]*?)<\/div>\s*<script/);
  if (!appMatch) return '';
  let content = appMatch[1];
  
  // Remove the <nav id="site-nav">
  content = content.replace(/<nav class="site-nav"[^>]*>([\s\S]*?)<\/nav>/, '');
  // Remove the mobile nav overlay
  content = content.replace(/<div class="mobile-nav-overlay"[^>]*>([\s\S]*?)<\/div>\s*<!-- Hero Section -->/, '<!-- Hero Section -->');
  // Remove the footer
  content = content.replace(/<footer class="site-footer"[^>]*>([\s\S]*?)<\/footer>/, '');
  
  return content;
}

function convertToJSX(htmlFile, outFile) {
  let content = extractAppContent(htmlFile);
  if (!content) {
    console.error('Failed to extract content!');
    return;
  }
  
  // Wire up the product cards in the raw HTML to link to the PDPs
  const productRegex = /<div class="col-product-card([^>]*)data-name="([^"]*)"([^>]*)>([\s\S]*?)<\/div>\s*<\/div>/g;
  
  content = content.replace(productRegex, (match, before, name, after, inner) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Replace <img ...> with <a href="/products/slug"><img ...></a>
    let newInner = inner.replace(/(<img[^>]+class="product-main-img"[^>]*>)/, `<a href="/products/${slug}">$1</a>`);
    
    // Replace <h3 ...>Name</h3> with <a href="/products/slug"><h3 ...>Name</h3></a>
    newInner = newInner.replace(/(<h3 class="col-card-name">[^<]*<\/h3>)/, `<a href="/products/${slug}" style="text-decoration:none;color:inherit;">$1</a>`);
    
    // Wire the Add to Cart button to act as a Buy Now that goes to the PDP for now
    newInner = newInner.replace(/<button class="col-card-add-btn">Add to Cart<\/button>/, `<a href="/products/${slug}" class="col-card-add-btn" style="display:block;text-align:center;text-decoration:none;line-height:48px;">View Options</a>`);
    
    return `<div class="col-product-card${before}data-name="${name}"${after}>${newInner}</div>\n        </div>`;
  });

  const pageCode = `export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}`;

  fs.writeFileSync(outFile, pageCode);
}

convertToJSX('index.html', 'src/app/page.tsx');
console.log('Homepage successfully wired and written to page.tsx!');
