import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const bucket = formData.get('bucket') as string;
    const files = formData.getAll('files') as File[];

    if (!bucket || files.length === 0) {
      return NextResponse.json({ error: 'Missing bucket or files' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const urls: string[] = [];

    for (const file of files) {
      const ext = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      urls.push(publicUrl);
    }

    return NextResponse.json({ success: true, urls }, { status: 200 });

  } catch (error: any) {
    console.error('API Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
