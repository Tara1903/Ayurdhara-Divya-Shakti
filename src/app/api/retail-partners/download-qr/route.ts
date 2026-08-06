import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return new NextResponse('Code is required', { status: 400 });
  }

  const supabase = await createClient();

  const { data: partner } = await supabase
    .from('retail_partners')
    .select('*')
    .eq('partner_code', code)
    .single();

  if (!partner) {
    return new NextResponse('Partner not found', { status: 404 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.ayurdharadivyashakti.store';
  const qrUrl = `${appUrl}/rp/${partner.partner_code}`;
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrUrl)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ayurdhara Wellness Kit - ${partner.shop_name}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background: #fdfdf9;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .kit-container {
          background: white;
          width: 210mm;
          min-height: 297mm; /* A4 */
          padding: 40mm 20mm;
          box-sizing: border-box;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          text-align: center;
          position: relative;
        }
        .header {
          color: #2C3E2D;
          font-size: 32px;
          margin-bottom: 10px;
          font-family: serif;
        }
        .subheader {
          color: #B8860B;
          font-size: 20px;
          margin-bottom: 50px;
        }
        .qr-box {
          border: 4px solid #2C3E2D;
          padding: 20px;
          display: inline-block;
          border-radius: 20px;
          margin-bottom: 30px;
          background: white;
        }
        .qr-code {
          width: 300px;
          height: 300px;
        }
        .cta {
          font-size: 28px;
          font-weight: bold;
          color: #2C3E2D;
          margin-bottom: 15px;
        }
        .discount {
          font-size: 36px;
          color: #B8860B;
          font-weight: 900;
          margin-bottom: 30px;
        }
        .partner-info {
          margin-top: 60px;
          font-size: 18px;
          color: #666;
        }
        @media print {
          body { background: white; }
          .kit-container { box-shadow: none; width: 100%; min-height: auto; padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="kit-container">
        <h1 class="header">Ayurdhara Divya Shakti</h1>
        <div class="subheader">AUTHORISED WELLNESS PARTNER</div>
        
        <div class="cta">Scan to Order Authentic Ayurveda</div>
        <div class="discount">Get EXTRA 2% OFF</div>
        
        <div class="qr-box">
          <img src="${qrImage}" class="qr-code" alt="QR Code">
        </div>
        
        <div class="partner-info">
          <strong>${partner.shop_name}</strong><br>
          Partner ID: ${partner.partner_id}
        </div>
        
        <script>
          // Auto print dialog when loaded
          window.onload = function() { window.print(); }
        </script>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
