const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1AA975"/>
  <circle cx="256" cy="256" r="120" fill="white"/>
  <text x="256" y="280" font-family="Arial, sans-serif" font-size="80" font-weight="bold" text-anchor="middle" fill="#1AA975">$</text>
</svg>
`;

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Write the SVG icon
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);

console.log('Placeholder icon created at public/icon.svg');
console.log('For production, replace with proper PNG icons:');
console.log('- icon-192.png (192x192)');
console.log('- icon-512.png (512x512)'); 