const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/logo.svg'));
    
    // Generate ICO
    await sharp(svgBuffer)
      .resize(64, 64)
      .toFile(path.join(__dirname, '../public/favicon.ico'));
    
    // Generate PNG versions
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '../public/favicon-32x32.png'));
    
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(__dirname, '../public/favicon-16x16.png'));

    console.log('Favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicon(); 