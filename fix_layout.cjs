const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const navMatch = html.match(/<nav class="site-nav"[^>]*>([\s\S]*?)<\/nav>/);
const mobileNavMatch = html.match(/<div class="mobile-nav-overlay"[^>]*>([\s\S]*?)<\/div>\s*<!-- Chapter I/);
const footerMatch = html.match(/<footer class="footer-chapter">([\s\S]*?)<\/footer>/);

const navHtml = navMatch ? `<nav class="site-nav" id="site-nav">${navMatch[1]}</nav>` : '';
const mobileNavHtml = mobileNavMatch ? `<div class="mobile-nav-overlay" id="mobile-nav-overlay">${mobileNavMatch[1]}</div>` : '';
const footerHtml = footerMatch ? `<footer class="footer-chapter">${footerMatch[1]}</footer>` : '';

// I need to change href="/collections.html" to href="/collections" in the raw html
const processHtml = (str) => {
  return str.replace(/href="\/collections\.html"/g, 'href="/collections"')
            .replace(/href="index\.html"/g, 'href="/"')
            .replace(/`/g, '\\`')
            .replace(/\$/g, '\\$');
};

const layoutCode = `import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ayurdhara Divya Shakti - Premium Ayurvedic Wellness",
  description: "Experience the pure essence of Ayurveda with Ayurdhara Divya Shakti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Exact Original Navbar */}
        <div dangerouslySetInnerHTML={{ __html: \`${processHtml(navHtml)}\` }} />
        
        {/* Exact Original Mobile Navbar */}
        <div dangerouslySetInnerHTML={{ __html: \`${processHtml(mobileNavHtml)}\` }} />

        <main>{children}</main>

        {/* Exact Original Footer */}
        <div dangerouslySetInnerHTML={{ __html: \`${processHtml(footerHtml)}\` }} />
      </body>
    </html>
  );
}
`;

fs.writeFileSync('src/app/layout.tsx', layoutCode);
console.log('Layout updated with exact original HTML header/footer.');
