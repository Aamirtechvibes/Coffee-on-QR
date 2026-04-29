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

function validateLead(lead) {
  if (!lead.name?.trim()) return 'Your name is required.';
  if (!lead.cafe_name?.trim()) return 'Cafe name is required.';
  if (!lead.city?.trim()) return 'City is required.';

  const phone = String(lead.phone ?? '').replace(/\s/g, '');
  if (!/^[6-9]\d{9}$/.test(phone)) return 'Valid 10-digit Indian mobile number required.';

  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { data: null, error: 'Method not allowed.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing ENV:", { supabaseUrl, supabaseKey });
  return sendJson(res, 500, { data: null, error: 'Server env not configured properly.' });
}
  if (!supabaseUrl || !supabaseKey) {
    return sendJson(res, 500, { data: null, error: 'Server is missing Supabase environment variables.' });
  }

  const lead = parseBody(req.body);
  const validationError = validateLead(lead);

  if (validationError) {
    return sendJson(res, 400, { data: null, error: validationError });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const payload = {
    name: String(lead.name).trim(),
    cafe_name: String(lead.cafe_name).trim(),
    phone: String(lead.phone).replace(/\s/g, ''),
    city: String(lead.city).trim(),
    email: String(lead.email ?? '').trim(),
    status: 'lead',
    plan: 'early_access',
  };

  const { data, error } = await supabase
    .from('leads')
    .insert(payload)
    .select()
    .maybeSingle();

  if (error) {
    return sendJson(res, 500, { data: null, error: error.message || 'Failed to save lead.' });
  }

  return sendJson(res, 200, { data, error: null });
}
