import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key for cron job
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  // Optional: Add authorization header check to ensure only cron service can trigger this
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'secret'}`) {
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Fetch all pending partner transactions older than 7 days
    const { data: pendingTxs, error: fetchError } = await supabase
      .from('partner_transactions')
      .select('id, partner_account_id, amount')
      .eq('status', 'pending')
      .lte('created_at', sevenDaysAgo.toISOString());

    if (fetchError) throw fetchError;

    if (!pendingTxs || pendingTxs.length === 0) {
      return NextResponse.json({ message: 'No pending transactions to process.' });
    }

    let processedCount = 0;

    for (const tx of pendingTxs) {
      // 1. Mark transaction as approved
      const { error: updateTxError } = await supabase
        .from('partner_transactions')
        .update({ status: 'approved' })
        .eq('id', tx.id);

      if (!updateTxError) {
        // 2. Move funds from pending to approved in wallet
        const { data: wallet } = await supabase
          .from('partner_wallets')
          .select('pending_balance, approved_balance')
          .eq('partner_account_id', tx.partner_account_id)
          .single();

        if (wallet) {
          await supabase
            .from('partner_wallets')
            .update({
              pending_balance: Math.max(0, wallet.pending_balance - tx.amount),
              approved_balance: wallet.approved_balance + tx.amount,
              updated_at: new Date().toISOString()
            })
            .eq('partner_account_id', tx.partner_account_id);
            
          processedCount++;
        }
      }
    }

    return NextResponse.json({ message: `Successfully processed ${processedCount} transactions.` });
  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
