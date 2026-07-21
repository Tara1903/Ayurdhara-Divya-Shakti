import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgPath = "C:\\Users\\taras\\OneDrive\\Pictures\\ads\\WhatsApp Image 2026-07-18 at 9.59.07 PM.jpeg";
const outputDir = "C:\\Users\\taras\\OneDrive\\Documents\\Ayurdhara Divya Shakti\\public\\images\\products";

// We define the Y boundaries for each crop as a percentage of the total height.
// By looking at the image, we can estimate:
const crops = [
  { name: 'combo-individual-trial.jpg', top_pct: 0.174, height_pct: 0.14 },
  { name: 'combo-family-trial.jpg', top_pct: 0.320, height_pct: 0.14 },
  { name: 'combo-individual-gold.jpg', top_pct: 0.465, height_pct: 0.14 },
  { name: 'combo-family-gold.jpg', top_pct: 0.612, height_pct: 0.14 },
  { name: 'combo-individual-premium.jpg', top_pct: 0.760, height_pct: 0.14 }
];

async function run() {
  const metadata = await sharp(imgPath).metadata();
  const H = metadata.height;
  const W = metadata.width;
  
  for (const crop of crops) {
    const top = Math.round(crop.top_pct * H);
    const height = Math.round(crop.height_pct * H);
    
    // Add small padding to avoid borders
    const cropParams = {
      left: 10,
      top: top + 5,
      width: W - 20,
      height: height - 10
    };
    
    const outputPath = path.join(outputDir, crop.name);
    await sharp(imgPath)
      .extract(cropParams)
      .jpeg({ quality: 95 })
      .toFile(outputPath);
      
    console.log(`Saved ${crop.name} (Top: ${top}, Height: ${height})`);
  }
}

run();
