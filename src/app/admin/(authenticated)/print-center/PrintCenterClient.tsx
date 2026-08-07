'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { jsPDF } from 'jspdf';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import 'svg2pdf.js';
import { calculatePrintLayout } from '@/utils/printLayoutEngine';
import { Upload, Printer, ZoomIn, ZoomOut, Maximize, RefreshCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

const PRESET_SIZES = [
  { label: '10 ml (24 x 36 mm)', width: 24, height: 36 },
  { label: '15 ml (26 x 39 mm)', width: 26, height: 39 },
  { label: '20 ml (28 x 42 mm)', width: 28, height: 42 },
  { label: '30 ml (30 x 45 mm)', width: 30, height: 45 },
  { label: '50 ml (40 x 60 mm)', width: 40, height: 60 },
  { label: '100 ml (50 x 75 mm)', width: 50, height: 75 },
  { label: '200 ml (60 x 90 mm)', width: 60, height: 90 },
];

export default function PrintCenterClient({ categories, products }: { categories: any[], products: any[] }) {
  // Label Source
  const [sourceType, setSourceType] = useState<'existing' | 'upload'>('existing');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  
  // Upload State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Preview URL
  const [uploadedFileType, setUploadedFileType] = useState<string | null>(null);
  const [uploadedBuffer, setUploadedBuffer] = useState<ArrayBuffer | null>(null); // For PDF
  const [uploadedSvgString, setUploadedSvgString] = useState<string | null>(null); // For SVG
  const [imageMetadata, setImageMetadata] = useState<{width: number, height: number} | null>(null);

  // Size
  const [sizeMode, setSizeMode] = useState<'preset' | 'custom'>('preset');
  const [selectedPreset, setSelectedPreset] = useState(3);
  const [customWidth, setCustomWidth] = useState(50);
  const [customHeight, setCustomHeight] = useState(75);

  // Quantity
  const [quantityMode, setQuantityMode] = useState<'fill' | 'custom'>('fill');
  const [customQuantity, setCustomQuantity] = useState(20);

  // Zoom
  const [zoom, setZoom] = useState(1);

  // Print Options
  const [addBleed, setAddBleed] = useState(false);
  const [addCropMarks, setAddCropMarks] = useState(false);
  const [printQuality, setPrintQuality] = useState<300 | 600 | 1200>(600);

  // Derived active values
  const activeWidth = sizeMode === 'preset' ? PRESET_SIZES[selectedPreset].width : customWidth;
  const activeHeight = sizeMode === 'preset' ? PRESET_SIZES[selectedPreset].height : customHeight;
  const activeImage = sourceType === 'existing' ? selectedImageUrl : uploadedImage;
  const bleedMm = addBleed ? 2 : 0;

  // Calculate layout
  const layout = useMemo(() => {
    return calculatePrintLayout(activeWidth, activeHeight, bleedMm);
  }, [activeWidth, activeHeight, bleedMm]);

  const targetQuantity = quantityMode === 'fill' ? layout.maxStickersPerSheet : (customQuantity || 1);
  const totalSheets = Math.ceil(targetQuantity / layout.maxStickersPerSheet) || 1;

  // Required Pixels Calculation
  const requiredWidthPx = Math.ceil((activeWidth / 25.4) * printQuality);
  const requiredHeightPx = Math.ceil((activeHeight / 25.4) * printQuality);

  let qualityWarning = null;
  if (sourceType === 'upload' && uploadedFileType?.startsWith('image/') && uploadedFileType !== 'image/svg+xml' && imageMetadata) {
    if (imageMetadata.width < requiredWidthPx || imageMetadata.height < requiredHeightPx) {
      const maxDpiWidth = Math.floor((imageMetadata.width / (activeWidth / 25.4)));
      const maxDpiHeight = Math.floor((imageMetadata.height / (activeHeight / 25.4)));
      const maxRecommendedDpi = Math.min(maxDpiWidth, maxDpiHeight);
      
      let recommendedStr = "300 DPI";
      if (maxRecommendedDpi < 300) recommendedStr = "Lower than 300 DPI (Not recommended)";
      else if (maxRecommendedDpi >= 600 && maxRecommendedDpi < 1200) recommendedStr = "600 DPI";
      else if (maxRecommendedDpi >= 1200) recommendedStr = "1200 DPI";

      qualityWarning = `Uploaded image resolution (${imageMetadata.width}×${imageMetadata.height}px) is too low for ${printQuality} DPI printing. Maximum recommended quality: ${recommendedStr}.`;
    }
  }

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileType(file.type);
      const reader = new FileReader();
      
      if (file.type === 'application/pdf') {
        reader.onload = (ev) => {
          setUploadedBuffer(ev.target?.result as ArrayBuffer);
          setUploadedImage(null);
          setUploadedSvgString(null);
          setImageMetadata(null);
        };
        reader.readAsArrayBuffer(file);
      } else if (file.type === 'image/svg+xml') {
        reader.onload = (ev) => {
          setUploadedSvgString(ev.target?.result as string);
          const url = URL.createObjectURL(file);
          setUploadedImage(url);
          setUploadedBuffer(null);
          setImageMetadata(null);
        };
        reader.readAsText(file);
      } else {
        reader.onload = (ev) => {
          const result = ev.target?.result as string;
          setUploadedImage(result);
          setUploadedBuffer(null);
          setUploadedSvgString(null);
          
          const img = new window.Image();
          img.onload = () => {
            setImageMetadata({ width: img.width, height: img.height });
          };
          img.src = result;
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const generateWithPdfLib = async () => {
    const pdfDoc = await PDFDocument.create();
    const uploadedPdf = await PDFDocument.load(uploadedBuffer!);
    const [embeddedPage] = await pdfDoc.embedPdf(uploadedPdf, [0]);
    
    let remainingToPrint = targetQuantity;
    const pt = (mm: number) => mm * 2.83465;
    
    for (let sheet = 0; sheet < totalSheets; sheet++) {
      const page = pdfDoc.addPage([pt(210), pt(297)]);

      for (let row = 0; row < layout.rows; row++) {
        for (let col = 0; col < layout.columns; col++) {
          if (remainingToPrint <= 0) break;
          
          const x = layout.xMargin + (col * layout.cellSize.width);
          const y = layout.yMargin + (row * layout.cellSize.height);
          
          // PDF-lib is bottom-left origin
          const isRotated = layout.layoutOrientation === 'Rotated';
          
          let drawX = pt(x);
          let drawY = pt(297 - y - layout.cellSize.height);
          let drawWidth = pt(layout.cellSize.width);
          let drawHeight = pt(layout.cellSize.height);
          
          if (isRotated) {
            // Adjust coordinates for rotation
            page.drawPage(embeddedPage, {
              x: pt(x),
              y: pt(297 - y),
              width: pt(layout.cellSize.height), // Swapped
              height: pt(layout.cellSize.width), // Swapped
              rotate: degrees(-90)
            });
          } else {
            page.drawPage(embeddedPage, {
              x: drawX,
              y: drawY,
              width: drawWidth,
              height: drawHeight,
            });
          }
          
          if (addCropMarks) {
            const cm = pt(3);
            const w = drawWidth;
            const h = drawHeight;
            const b = pt(bleedMm);
            const color = rgb(0, 0, 0);
            const thickness = pt(0.2);
            
            // Draw lines (bottom-left origin math)
            // Top Left
            page.drawLine({ start: { x: drawX + b, y: drawY + h }, end: { x: drawX + b, y: drawY + h - cm }, color, thickness });
            page.drawLine({ start: { x: drawX, y: drawY + h - b }, end: { x: drawX + cm, y: drawY + h - b }, color, thickness });
            
            // Top Right
            page.drawLine({ start: { x: drawX + w - b, y: drawY + h }, end: { x: drawX + w - b, y: drawY + h - cm }, color, thickness });
            page.drawLine({ start: { x: drawX + w - cm, y: drawY + h - b }, end: { x: drawX + w, y: drawY + h - b }, color, thickness });
            
            // Bottom Left
            page.drawLine({ start: { x: drawX + b, y: drawY + cm }, end: { x: drawX + b, y: drawY }, color, thickness });
            page.drawLine({ start: { x: drawX, y: drawY + b }, end: { x: drawX + cm, y: drawY + b }, color, thickness });
            
            // Bottom Right
            page.drawLine({ start: { x: drawX + w - b, y: drawY + cm }, end: { x: drawX + w - b, y: drawY }, color, thickness });
            page.drawLine({ start: { x: drawX + w - cm, y: drawY + b }, end: { x: drawX + w, y: drawY + b }, color, thickness });
          }
          
          remainingToPrint--;
        }
      }
    }
    
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const filename = `ayurdhara-stickers-${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}.pdf`;
    link.download = filename;
    link.click();
  };

  const upscaleImage = async (dataUrl: string, targetWidthPx: number, targetHeightPx: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidthPx;
        canvas.height = targetHeightPx;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetWidthPx, targetHeightPx);
        resolve(canvas.toDataURL('image/png', 1.0));
      };
      img.onerror = reject;
      img.src = dataUrl;
    });
  };

  const generateWithJsPDF = async () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    let remainingToPrint = targetQuantity;
    
    let processedImage = activeImage!;
    if (uploadedFileType !== 'image/svg+xml') {
      try {
        console.log(`Upscaling image to ${printQuality} DPI...`);
        processedImage = await upscaleImage(activeImage!, requiredWidthPx, requiredHeightPx);
      } catch (e) {
        console.error("Failed to upscale image", e);
      }
    }

    for (let sheet = 0; sheet < totalSheets; sheet++) {
      if (sheet > 0) doc.addPage();

      console.log(`Generating sheet ${sheet + 1} of ${totalSheets}...`);

      for (let row = 0; row < layout.rows; row++) {
        for (let col = 0; col < layout.columns; col++) {
          if (remainingToPrint <= 0) break;

          const x = layout.xMargin + (col * layout.cellSize.width);
          const y = layout.yMargin + (row * layout.cellSize.height);
          const isRotated = layout.layoutOrientation === 'Rotated';
          
          if (uploadedFileType === 'image/svg+xml' && uploadedSvgString) {
            // Draw SVG vector data
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(uploadedSvgString, 'image/svg+xml');
            
            // svg2pdf plugin requires a DOM element
            await doc.svg(svgDoc.documentElement, { 
              x: x, 
              y: y, 
              width: layout.cellSize.width, 
              height: layout.cellSize.height 
              // Note: svg2pdf doesn't natively support rotation parameter directly in the same way,
              // for rotated layout we might need to rely on standard raster if complex, 
              // but we'll try to preserve vectors.
            });
          } else {
            // Raster image
            doc.addImage(
              processedImage, 
              'PNG', 
              x, 
              y, 
              layout.cellSize.width, 
              layout.cellSize.height,
              undefined,
              'NONE',
              isRotated ? 90 : 0
            );
          }

          if (addCropMarks) {
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.2);
            const cm = 3;
            const w = layout.cellSize.width;
            const h = layout.cellSize.height;
            const b = bleedMm;

            doc.line(x + b, y, x + b, y + cm);
            doc.line(x, y + b, x + cm, y + b);
            doc.line(x + w - b, y, x + w - b, y + cm);
            doc.line(x + w - cm, y + b, x + w, y + b);
            doc.line(x + b, y + h - cm, x + b, y + h);
            doc.line(x, y + h - b, x + cm, y + h - b);
            doc.line(x + w - b, y + h - cm, x + w - b, y + h);
            doc.line(x + w - cm, y + h - b, x + w, y + h - b);
          }

          remainingToPrint--;
        }
      }
    }

    const filename = `ayurdhara-stickers-${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}.pdf`;
    doc.save(filename);
  };

  const generatePDF = async () => {
    if (sourceType === 'upload' && !uploadedImage && !uploadedBuffer && !uploadedSvgString) {
      alert("Please select or upload a label first.");
      return;
    }
    if (sourceType === 'existing' && !activeImage) {
      alert("Please select a product first.");
      return;
    }
    if (layout.maxStickersPerSheet === 0) {
      alert("Invalid sticker dimensions.");
      return;
    }

    if (sourceType === 'upload' && uploadedFileType === 'application/pdf' && uploadedBuffer) {
      await generateWithPdfLib();
    } else {
      await generateWithJsPDF();
    }
  };

  // Generate Preview Grid Elements
  const previewItems = [];
  const previewSheetStickers = Math.min(targetQuantity, layout.maxStickersPerSheet);
  for (let row = 0; row < layout.rows; row++) {
    for (let col = 0; col < layout.columns; col++) {
      const index = row * layout.columns + col;
      if (index < previewSheetStickers) {
        previewItems.push(
          <div 
            key={index}
            className="absolute border border-dashed border-gray-400 bg-gray-100 flex items-center justify-center overflow-hidden"
            style={{
              left: `${layout.xMargin + (col * layout.cellSize.width)}mm`,
              top: `${layout.yMargin + (row * layout.cellSize.height)}mm`,
              width: `${layout.cellSize.width}mm`,
              height: `${layout.cellSize.height}mm`,
            }}
          >
            {activeImage || uploadedFileType === 'application/pdf' ? (
              uploadedFileType === 'application/pdf' ? (
                <div className="text-gray-500 font-medium text-xs flex flex-col items-center gap-1">
                  <span className="bg-red-500 text-white px-2 py-1 rounded">PDF</span>
                  Vector Data
                </div>
              ) : (
                <img 
                  src={activeImage!} 
                  alt="Label" 
                  className="object-cover"
                  style={{
                    width: layout.layoutOrientation === 'Rotated' ? `${activeWidth}mm` : '100%',
                    height: layout.layoutOrientation === 'Rotated' ? `${activeHeight}mm` : '100%',
                    transform: layout.layoutOrientation === 'Rotated' ? 'rotate(-90deg)' : 'none'
                  }} 
                />
              )
            ) : (
              <span className="text-gray-300 text-xs">Blank</span>
            )}
          </div>
        );
      }
    }
  }

  let sheetMessage = '';
  if (layout.maxStickersPerSheet > 0) {
    if (totalSheets === 1) {
      sheetMessage = `⚡ This layout fits ${layout.maxStickersPerSheet} stickers on one A4 sheet.`;
    } else {
      let msg = `⚡ ${targetQuantity} stickers will require ${totalSheets} A4 sheets. `;
      let rem = targetQuantity;
      for (let i = 1; i <= totalSheets; i++) {
        const onThisSheet = Math.min(rem, layout.maxStickersPerSheet);
        msg += `Sheet ${i}: ${onThisSheet}${i < totalSheets ? ' | ' : ''}`;
        rem -= onThisSheet;
      }
      sheetMessage = msg;
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Settings Panel */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Section 1: Label Source */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">1. Label Source</h2>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={sourceType === 'existing'} onChange={() => setSourceType('existing')} className="text-[#4B7B3B] focus:ring-[#4B7B3B]" />
              <span className="text-sm font-medium">Existing Product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={sourceType === 'upload'} onChange={() => setSourceType('upload')} className="text-[#4B7B3B] focus:ring-[#4B7B3B]" />
              <span className="text-sm font-medium">Upload File</span>
            </label>
          </div>

          {sourceType === 'existing' && (
            <div className="space-y-3">
              <select 
                className="w-full p-2 border border-gray-200 rounded-md text-sm"
                value={selectedCategoryId}
                onChange={(e) => {
                  setSelectedCategoryId(e.target.value);
                  setSelectedProductId('');
                  setSelectedImageUrl('');
                }}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              <select 
                className="w-full p-2 border border-gray-200 rounded-md text-sm"
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  const p = products.find(p => p.id === e.target.value);
                  setSelectedImageUrl(p?.image_url || '');
                }}
                disabled={!selectedCategoryId}
              >
                <option value="">Select Product</option>
                {products.filter(p => p.category_id === selectedCategoryId).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          )}

          {sourceType === 'upload' && (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors">
              <Upload className="text-gray-400 mb-2" size={24} />
              <p className="text-sm font-medium text-gray-700 mb-1">Click to upload artwork</p>
              <p className="text-xs text-gray-500 mb-4">JPG, PNG, SVG or PDF</p>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/svg+xml, application/pdf"
                className="text-sm"
                onChange={handleFileUpload}
              />
            </div>
          )}
        </div>

        {/* Quality Info Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">2. Quality Engine</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Print Quality</label>
            <select 
              value={printQuality} 
              onChange={(e) => setPrintQuality(Number(e.target.value) as any)}
              className="w-full p-2 border border-gray-200 rounded-md text-sm"
            >
              <option value={300}>Standard (300 DPI)</option>
              <option value={600}>High (600 DPI)</option>
              <option value={1200}>Ultra (1200 DPI)</option>
            </select>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Format</span>
                <span className="text-sm font-bold text-gray-800">
                  {uploadedFileType ? uploadedFileType.split('/')[1]?.toUpperCase() || 'UNKNOWN' : (sourceType === 'existing' && activeImage) ? 'REMOTE_IMG' : 'N/A'}
                </span>
             </div>
             {imageMetadata && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Source Res</span>
                  <span className="text-sm font-bold text-gray-800">{imageMetadata.width} × {imageMetadata.height} px</span>
                </div>
             )}
             
             {uploadedFileType === 'application/pdf' || uploadedFileType === 'image/svg+xml' ? (
                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-200">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs font-medium text-green-700 leading-relaxed">
                    Vector elements detected. Document will be rendered perfectly at any DPI without rasterization.
                  </p>
                </div>
             ) : qualityWarning ? (
                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-200">
                  <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs font-medium text-amber-700 leading-relaxed">
                    {qualityWarning}
                  </p>
                </div>
             ) : (imageMetadata || (sourceType === 'existing' && activeImage)) ? (
                <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-200">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs font-medium text-green-700 leading-relaxed">
                    Excellent quality for professional {printQuality} DPI printing.
                  </p>
                </div>
             ) : null}
          </div>
        </div>

        {/* Section 3: Size Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">3. Dimensions</h2>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={sizeMode === 'preset'} onChange={() => setSizeMode('preset')} className="text-[#4B7B3B] focus:ring-[#4B7B3B]" />
              <span className="text-sm font-medium">Preset Sizes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={sizeMode === 'custom'} onChange={() => setSizeMode('custom')} className="text-[#4B7B3B] focus:ring-[#4B7B3B]" />
              <span className="text-sm font-medium">Custom</span>
            </label>
          </div>

          {sizeMode === 'preset' ? (
            <select 
              className="w-full p-2 border border-gray-200 rounded-md text-sm"
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(Number(e.target.value))}
            >
              {PRESET_SIZES.map((preset, index) => (
                <option key={index} value={index}>{preset.label}</option>
              ))}
            </select>
          ) : (
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Width (mm)</label>
                <input type="number" min="10" max="210" value={customWidth} onChange={e => setCustomWidth(Number(e.target.value))} className="w-full p-2 border border-gray-200 rounded-md text-sm" />
              </div>
              <span className="text-gray-400 pt-5">×</span>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Height (mm)</label>
                <input type="number" min="10" max="297" value={customHeight} onChange={e => setCustomHeight(Number(e.target.value))} className="w-full p-2 border border-gray-200 rounded-md text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Settings & Generate */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">4. Layout Settings</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex flex-col gap-2 mb-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={quantityMode === 'fill'} onChange={() => setQuantityMode('fill')} className="text-[#4B7B3B] focus:ring-[#4B7B3B]" />
                <span className="text-sm">Fill Entire Sheet</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={quantityMode === 'custom'} onChange={() => setQuantityMode('custom')} className="text-[#4B7B3B] focus:ring-[#4B7B3B]" />
                <span className="text-sm">Custom Quantity</span>
              </label>
            </div>
            
            {quantityMode === 'custom' && (
              <input 
                type="number" min="1" 
                value={customQuantity} 
                onChange={(e) => setCustomQuantity(Number(e.target.value))}
                className="w-full p-2 border border-gray-200 rounded-md text-sm" 
              />
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Professional Print Options</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={addBleed} onChange={(e) => setAddBleed(e.target.checked)} className="text-[#4B7B3B] focus:ring-[#4B7B3B] rounded" />
                <span className="text-sm">Add 2mm Bleed Margin</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={addCropMarks} onChange={(e) => setAddCropMarks(e.target.checked)} className="text-[#4B7B3B] focus:ring-[#4B7B3B] rounded" />
                <span className="text-sm">Include Crop Marks (Cut Lines)</span>
              </label>
            </div>
          </div>
        </div>

        <button 
          onClick={generatePDF}
          disabled={(sourceType === 'upload' && !uploadedImage && !uploadedBuffer && !uploadedSvgString) || (sourceType === 'existing' && !activeImage) || layout.maxStickersPerSheet === 0}
          className="w-full py-4 bg-[#2D5A27] hover:bg-[#1f3f1b] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Printer size={20} />
          Generate Print-ready PDF
        </button>

      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-7 flex flex-col gap-4">
        
        <div className="bg-blue-50 border border-blue-100 text-blue-800 p-3 rounded-lg text-sm font-medium">
          {sheetMessage || 'Waiting for configuration...'}
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col min-h-[600px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Live Preview</h2>
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1.5 hover:bg-white rounded text-gray-600"><ZoomOut size={16} /></button>
              <span className="text-xs font-medium w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-1.5 hover:bg-white rounded text-gray-600"><ZoomIn size={16} /></button>
              <button onClick={() => setZoom(1)} className="p-1.5 hover:bg-white rounded text-gray-600 ml-1 border-l border-gray-200"><Maximize size={16} /></button>
            </div>
          </div>

          <div className="flex-1 bg-gray-100 rounded-lg border border-gray-200 overflow-auto flex items-center justify-center p-4 relative">
             <div 
                className="bg-white shadow-xl relative transition-transform origin-top"
                style={{ 
                  width: '210mm', 
                  height: '297mm',
                  transform: `scale(${zoom})`,
                  maxWidth: zoom === 1 ? '100%' : 'none'
                }}
             >
                {previewItems}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
