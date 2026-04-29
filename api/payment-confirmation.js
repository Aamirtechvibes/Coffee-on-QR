import { createClient } from '@supabase/supabase-js';

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function parseBody(body) {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { data: null, error: 'Method not allowed.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return sendJson(res, 500, { data: null, error: 'Server is missing Supabase environment variables.' });
  }

  const body = parseBody(req.body);
  const leadId = String(body.leadId ?? '').trim();

  if (!leadId) {
    return sendJson(res, 400, { data: null, error: 'Lead id is required.' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const updates = {
    status: 'paid',
    razorpay_payment_id: String(body.confirmationMethod ?? 'upi_manual'),
    razorpay_order_id: String(body.note ?? 'upi_confirmation_received'),
  };

  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', leadId)
    .select()
    .maybeSingle();

  if (error) {
    return sendJson(res, 500, { data: null, error: error.message || 'Failed to confirm payment.' });
  }

  return sendJson(res, 200, { data, error: null });
}
