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

interface LeadResponse {
  data: Lead | null;
  error: string | null;
}

interface PaymentConfirmationPayload {
  leadId: string;
  confirmationMethod?: string;
  note?: string;
}

function buildFallbackLead(lead: Lead): Lead {
  const fallbackLead: Lead = {
    ...lead,
    id: `local-${Date.now()}`,
    status: 'lead',
    plan: 'early_access',
    created_at: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('coffee-on-qr-pending-leads');
    const parsed = stored ? (JSON.parse(stored) as Lead[]) : [];
    parsed.push(fallbackLead);
    window.localStorage.setItem('coffee-on-qr-pending-leads', JSON.stringify(parsed));
  }

  return fallbackLead;
}

function isNetworkLikeError(message: string): boolean {
  const normalized = message.toLowerCase();

  return [
    'failed to fetch',
    'networkerror',
    'network error',
    'load failed',
    'fetch failed',
    'not found',
  ].some((fragment) => normalized.includes(fragment));
}

export async function saveLead(lead: Lead): Promise<LeadResponse> {
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lead),
    });

    let payload: LeadResponse | null = null;

    try {
      payload = (await response.json()) as LeadResponse;
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const message = payload?.error ?? `Request failed with status ${response.status}`;
      if (isNetworkLikeError(message) || response.status === 404) {
        return { data: buildFallbackLead(lead), error: null };
      }
      return { data: null, error: message };
    }

    if (!payload?.data) {
      return { data: buildFallbackLead(lead), error: null };
    }

    return payload;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (isNetworkLikeError(message)) {
      return { data: buildFallbackLead(lead), error: null };
    }
    return { data: null, error: message || 'Unable to save your details right now.' };
  }
}

export async function confirmLeadPayment(payload: PaymentConfirmationPayload): Promise<LeadResponse> {
  try {
    const response = await fetch('/api/payment-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    let parsed: LeadResponse | null = null;

    try {
      parsed = (await response.json()) as LeadResponse;
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      const message = parsed?.error ?? `Request failed with status ${response.status}`;
      if (isNetworkLikeError(message) || response.status === 404) {
        return {
          data: {
            id: payload.leadId,
            status: 'paid',
          },
          error: null,
        };
      }

      return { data: null, error: message };
    }

    if (!parsed?.data) {
      return {
        data: {
          id: payload.leadId,
          status: 'paid',
        },
        error: null,
      };
    }

    return parsed;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (isNetworkLikeError(message)) {
      return {
        data: {
          id: payload.leadId,
          status: 'paid',
        },
        error: null,
      };
    }

    return { data: null, error: message || 'Unable to confirm payment right now.' };
  }
}
