const fs = require('fs');

function extractAppContent(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  // Get everything between <!-- Collection Hero --> and the footer
  const contentMatch = html.match(/<!-- Collection Hero -->([\s\S]*?)<footer/);
  if (!contentMatch) return '';
  return '<!-- Collection Hero -->' + contentMatch[1];
}

function convertToJSX(htmlFile, outFile) {
  let content = extractAppContent(htmlFile);
  if (!content) {
    console.error('Failed to extract content!');
    return;
  }
  
  // Remove reveal classes
  content = content.replace(/class="([^"]*)reveal([^"]*)"/g, 'class="$1visible$2"');
  
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

  const pageCode = `'use client';
import { useEffect } from 'react';

export default function CollectionsPage() {
  useEffect(() => {
    // Dynamically load the collections.js script to run the filter logic
    const script = document.createElement('script');
    script.src = '/collections.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div id="app" className="text-charcoal" dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}`;

  fs.writeFileSync(outFile, pageCode);
}

convertToJSX('collections.html', 'src/app/collections/page.tsx');
console.log('Collections page perfectly wired and written to page.tsx!');
