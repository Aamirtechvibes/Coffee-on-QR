import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  id?: string;
  name: string;
  cafe_name: string;
  phone: string;
  city: string;
  email?: string;
  status?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  plan?: string;
  created_at?: string;
}

export async function saveLead(lead: Lead): Promise<{ data: Lead | null; error: string | null }> {
  const { data: existing } = await supabase
    .from('leads')
    .select('id, status')
    .eq('phone', lead.phone)
    .maybeSingle();

  if (existing && existing.status === 'paid') {
    return { data: null, error: 'This phone number is already registered with an active subscription.' };
  }

  if (existing) {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...lead, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
      .select()
      .maybeSingle();
    return { data, error: error?.message ?? null };
  }

  const { data, error } = await supabase
    .from('leads')
    .insert({ ...lead, status: 'lead', plan: 'early_access' })
    .select()
    .maybeSingle();

  return { data, error: error?.message ?? null };
}

export async function updateLeadPayment(leadId: string, paymentId: string, orderId: string): Promise<void> {
  await supabase
    .from('leads')
    .update({
      status: 'paid',
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
    })
    .eq('id', leadId);
}
