export interface PrintLayoutResult {
  paperSize: { width: 210; height: 297 };
  stickerSize: { width: number; height: number };
  cellSize: { width: number; height: number };
  layoutOrientation: 'Portrait' | 'Rotated';
  rows: number;
  columns: number;
  maxStickersPerSheet: number;
  xMargin: number;
  yMargin: number;
  paperUtilizationPercentage: number;
  remainingSpacePercentage: number;
  bleedMm: number;
}

export function calculatePrintLayout(stickerWidth: number, stickerHeight: number, bleedMm: number = 0): PrintLayoutResult {
  const pw = 210;
  const ph = 297;
  
  if (stickerWidth <= 0 || stickerHeight <= 0) {
    return {
      paperSize: { width: pw, height: ph },
      stickerSize: { width: stickerWidth, height: stickerHeight },
      cellSize: { width: stickerWidth, height: stickerHeight },
      layoutOrientation: 'Portrait',
      rows: 0,
      columns: 0,
      maxStickersPerSheet: 0,
      xMargin: 0,
      yMargin: 0,
      paperUtilizationPercentage: 0,
      remainingSpacePercentage: 100,
      bleedMm: 0
    };
  }

  // The actual cell size required per sticker including bleed
  const cellW = stickerWidth + (bleedMm * 2);
  const cellH = stickerHeight + (bleedMm * 2);

  // Calculate Portrait using cell size
  const pCols = Math.floor(pw / cellW);
  const pRows = Math.floor(ph / cellH);
  const pTotal = pCols * pRows;
  
  // Calculate Rotated using cell size (flipped)
  const rCols = Math.floor(pw / cellH);
  const rRows = Math.floor(ph / cellW);
  const rTotal = rCols * rRows;
  
  let chosenCols = 0;
  let chosenRows = 0;
  let orientation: 'Portrait' | 'Rotated' = 'Portrait';
  let activeCellW = cellW;
  let activeCellH = cellH;
  let total = 0;
  
  if (rTotal > pTotal) {
    chosenCols = rCols;
    chosenRows = rRows;
    orientation = 'Rotated';
    activeCellW = cellH;
    activeCellH = cellW;
    total = rTotal;
  } else {
    chosenCols = pCols;
    chosenRows = pRows;
    orientation = 'Portrait';
    activeCellW = cellW;
    activeCellH = cellH;
    total = pTotal;
  }
  
  const totalStickerArea = total * (stickerWidth * stickerHeight); // utilization based on actual sticker size
  const totalPaperArea = pw * ph;
  
  const utilPct = total === 0 ? 0 : Math.round((totalStickerArea / totalPaperArea) * 100);
  const remPct = 100 - utilPct;
  
  // Center alignment based on CELL size
  const usedWidth = chosenCols * activeCellW;
  const usedHeight = chosenRows * activeCellH;
  
  const xMargin = (pw - usedWidth) / 2;
  const yMargin = (ph - usedHeight) / 2;
  
  return {
    paperSize: { width: pw, height: ph },
    stickerSize: { width: orientation === 'Portrait' ? stickerWidth : stickerHeight, height: orientation === 'Portrait' ? stickerHeight : stickerWidth },
    cellSize: { width: activeCellW, height: activeCellH },
    layoutOrientation: orientation,
    rows: chosenRows,
    columns: chosenCols,
    maxStickersPerSheet: total,
    xMargin,
    yMargin,
    paperUtilizationPercentage: utilPct,
    remainingSpacePercentage: remPct,
    bleedMm
  };
}
