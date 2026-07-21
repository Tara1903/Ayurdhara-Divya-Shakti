import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = "C:\\Users\\taras\\OneDrive\\Pictures\\ads";
const outputDir = "C:\\Users\\taras\\OneDrive\\Documents\\Ayurdhara Divya Shakti\\public\\images\\products";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const imagesToProcess = [
  {
    filename: "WhatsApp Image 2026-07-18 at 9.53.58 PM.jpeg",
    rows: 1,
    cols: 4,
    names: [
      "feet-kids-150ml",
      "feet-men-150ml",
      "feet-women-150ml",
      "feet-senior-150ml"
    ]
  },
  {
    filename: "WhatsApp Image 2026-07-18 at 9.53.59 PM (1).jpeg",
    rows: 4,
    cols: 4,
    names: [
      "nabhi-kids-smart-15ml", "nabhi-kids-gentle-15ml", "nabhi-kids-daily-15ml", "nabhi-kids-pure-15ml",
      "nabhi-men-strength-15ml", "nabhi-men-vital-15ml", "nabhi-men-balance-15ml", "nabhi-men-pure-15ml",
      "nabhi-women-harmony-15ml", "nabhi-women-care-15ml", "nabhi-women-glow-15ml", "nabhi-women-pure-15ml",
      "nabhi-senior-comfort-15ml", "nabhi-senior-vital-15ml", "nabhi-senior-balance-15ml", "nabhi-senior-pure-15ml"
    ]
  },
  {
    filename: "WhatsApp Image 2026-07-18 at 9.53.59 PM.jpeg",
    rows: 1,
    cols: 4,
    names: [
      "feet-kids-30ml",
      "feet-men-30ml",
      "feet-women-30ml",
      "feet-senior-30ml"
    ]
  },
  {
    filename: "WhatsApp Image 2026-07-18 at 9.57.55 PM.jpeg",
    rows: 4,
    cols: 4,
    names: [
      "nabhi-kids-smart-10ml", "nabhi-kids-gentle-10ml", "nabhi-kids-daily-10ml", "nabhi-kids-pure-10ml",
      "nabhi-men-strength-10ml", "nabhi-men-vital-10ml", "nabhi-men-balance-10ml", "nabhi-men-pure-10ml",
      "nabhi-women-harmony-10ml", "nabhi-women-care-10ml", "nabhi-women-glow-10ml", "nabhi-women-pure-10ml",
      "nabhi-senior-comfort-10ml", "nabhi-senior-vital-10ml", "nabhi-senior-balance-10ml", "nabhi-senior-pure-10ml"
    ]
  },
  {
    filename: "WhatsApp Image 2026-07-18 at 9.59.07 PM.jpeg",
    rows: 5,
    cols: 1,
    names: [
      "combo-individual-trial",
      "combo-family-trial",
      "combo-individual-gold",
      "combo-family-gold",
      "combo-individual-premium"
    ]
  }
];

async function processImage(info) {
  const imgPath = path.join(inputDir, info.filename);
  if (!fs.existsSync(imgPath)) {
    console.error(`File not found: ${imgPath}`);
    return;
  }

  try {
    const metadata = await sharp(imgPath).metadata();
    const width = metadata.width;
    const height = metadata.height;
    
    const cellW = width / info.cols;
    const cellH = height / info.rows;
    
    let count = 0;
    
    // sharp's extract needs integer values
    for (let r = 0; r < info.rows; r++) {
      for (let c = 0; c < info.cols; c++) {
        if (count >= info.names.length) break;
        
        let left = Math.round(c * cellW);
        let top = Math.round(r * cellH);
        let w = Math.round(cellW);
        let h = Math.round(cellH);
        
        // Ensure we don't go out of bounds
        if (left + w > width) w = width - left;
        if (top + h > height) h = height - top;
        
        // Minor cleanup: crop 5 pixels from edges to remove grid lines if any
        left += 5;
        top += 5;
        w -= 10;
        h -= 10;
        
        const outputName = `${info.names[count]}.jpg`;
        const outputPath = path.join(outputDir, outputName);
        
        await sharp(imgPath)
          .extract({ left, top, width: w, height: h })
          .jpeg({ quality: 95 })
          .toFile(outputPath);
          
        console.log(`Saved ${outputName}`);
        count++;
      }
    }
  } catch (error) {
    console.error(`Error processing ${info.filename}:`, error);
  }
}

async function run() {
  for (const info of imagesToProcess) {
    console.log(`Processing ${info.filename}...`);
    await processImage(info);
  }
  console.log("Done cropping images.");
}

run();
