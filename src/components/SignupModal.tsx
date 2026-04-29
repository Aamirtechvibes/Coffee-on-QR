import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle, AlertCircle, Loader, Copy, Smartphone } from 'lucide-react';
import { confirmLeadPayment, saveLead, type Lead } from '../lib/supabase';
import BrandMark from './BrandMark';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'form' | 'processing' | 'payment' | 'success' | 'error';

const UPI_ID = 'rubinakhan123462@okicici';
const UPI_AMOUNT = '₹10,000.00';
const UPI_QR_IMAGE = '/upi-qr-whatsapp.jpeg';

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedOffline, setSavedOffline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState('');
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [form, setForm] = useState({ name: '', cafe_name: '', phone: '', city: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncViewport = () => setIsMobile(window.innerWidth < 640);
    syncViewport();
    window.addEventListener('resize', syncViewport, { passive: true });
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setStep('form');
    setErrors({});
    setErrorMsg('');
    setCopied(false);
    setSavedOffline(false);
    setCurrentLeadId('');
    setConfirmingPayment(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Your name is required';
    if (!form.cafe_name.trim()) newErrors.cafe_name = 'Cafe name is required';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Valid 10-digit Indian mobile number required';
    }
    if (!form.city.trim()) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStep('processing');

    try {
      const lead: Lead = { ...form };
      const { data, error } = await saveLead(lead);

      if (error || !data) {
        setErrorMsg(error ?? 'Something went wrong. Please try again.');
        setStep('error');
        return;
      }

      setSavedOffline(String(data.id).startsWith('local-'));
      setCurrentLeadId(data.id ?? '');
      setStep('payment');
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      setStep('error');
    }
  };

  const handlePaymentConfirmation = async () => {
    if (!currentLeadId) {
      setStep('success');
      return;
    }

    setConfirmingPayment(true);

    try {
      const { error } = await confirmLeadPayment({
        leadId: currentLeadId,
        confirmationMethod: 'upi_manual',
        note: 'customer_clicked_payment_complete',
      });

      if (error) {
        setErrorMsg(error);
        setStep('error');
        return;
      }

      setStep('success');
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Unable to confirm payment right now.');
      setStep('error');
    } finally {
      setConfirmingPayment(false);
    }
  };

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-secondary)',
    border: '1.5px solid var(--border-soft)',
    borderRadius: '0.75rem',
    padding: '0.75rem 0.875rem',
    color: 'var(--text-primary)',
    fontSize: '0.875rem',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'all 0.2s ease',
    WebkitAppearance: 'none',
  };

  const inputErr = (field: string): React.CSSProperties => ({
    ...inputBase,
    background: errors[field] ? 'rgba(239,68,68,0.04)' : 'var(--bg-secondary)',
    border: `1.5px solid ${errors[field] ? 'rgba(239,68,68,0.40)' : 'var(--border-soft)'}`,
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(26,26,26,0.34)', backdropFilter: isMobile ? 'blur(4px)' : 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Sheet / modal */}
      <div
        className="relative w-full sm:max-w-md sm:mx-4 rounded-t-[1.75rem] rounded-b-none sm:rounded-3xl overflow-y-auto overflow-x-hidden"
        style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-soft)',
          boxShadow: isMobile ? '0 -10px 28px rgba(26,26,26,0.14)' : '0 24px 64px rgba(26,26,26,0.16)',
          width: '100%',
          maxWidth: isMobile ? '100vw' : '28rem',
          maxHeight: isMobile ? '100dvh' : 'min(92dvh, 820px)',
          overscrollBehavior: 'contain',
        }}
      >
        {/* ─── FORM ─── */}
        {step === 'form' && (
          <>
            {/* Drag handle — mobile only */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border-soft)' }} />
            </div>

            {/* Header */}
            <div
              className="flex items-start justify-between gap-3 px-4 py-4 sm:p-6"
              style={{ borderBottom: '1px solid var(--border-soft)' }}
            >
              <div className="flex items-center gap-3">
                <BrandMark className="w-8 h-8 sm:w-9 sm:h-9 object-contain" alt="" />
                <div>
                  <p className="font-semibold text-sm sm:text-base leading-tight" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                    Claim Early Access
                  </p>
                  <p className="text-[10px] sm:text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                    ₹10,000/mo · Limited to 50 cafes
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-6 space-y-3 sm:space-y-4"
              style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
            >
              {/* Name + Cafe — side by side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={{ ...inputErr('name'), minHeight: '48px' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,162,79,0.55)')}
                    onBlur={e => (e.currentTarget.style.borderColor = errors.name ? 'rgba(239,68,68,0.40)' : 'var(--border-soft)')}
                  />
                  {errors.name && (
                    <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#EF4444', fontFamily: 'Inter, sans-serif' }}>{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="cafe_name"
                    value={form.cafe_name}
                    onChange={handleChange}
                    placeholder="Cafe name"
                    style={{ ...inputErr('cafe_name'), minHeight: '48px' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,162,79,0.55)')}
                    onBlur={e => (e.currentTarget.style.borderColor = errors.cafe_name ? 'rgba(239,68,68,0.40)' : 'var(--border-soft)')}
                  />
                  {errors.cafe_name && (
                    <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#EF4444', fontFamily: 'Inter, sans-serif' }}>{errors.cafe_name}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="WhatsApp number (10 digits)"
                  style={{ ...inputErr('phone'), minHeight: '48px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,162,79,0.55)')}
                  onBlur={e => (e.currentTarget.style.borderColor = errors.phone ? 'rgba(239,68,68,0.40)' : 'var(--border-soft)')}
                />
                {errors.phone && (
                  <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#EF4444', fontFamily: 'Inter, sans-serif' }}>{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  style={{ ...inputErr('city'), minHeight: '48px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,162,79,0.55)')}
                  onBlur={e => (e.currentTarget.style.borderColor = errors.city ? 'rgba(239,68,68,0.40)' : 'var(--border-soft)')}
                />
                {errors.city && (
                  <p className="text-[10px] sm:text-xs mt-1" style={{ color: '#EF4444', fontFamily: 'Inter, sans-serif' }}>{errors.city}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  style={{ ...inputBase, minHeight: '48px' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(145,162,79,0.55)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-soft)')}
                />
              </div>

            

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] mt-1"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'var(--accent-primary)',
                  color: '#1A1A1A',
                  boxShadow: '0 4px 20px rgba(145,162,79,0.25)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(145,162,79,0.35)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(145,162,79,0.25)';
                }}
              >
                Continue to UPI Payment
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-[10px] sm:text-xs pb-1" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                Secure manual UPI payment · Welcome mail and invoice within 1 hour
              </p>
            </form>
          </>
        )}

        {/* ─── PROCESSING ─── */}
        {step === 'processing' && (
          <div
            className="p-8 sm:p-12 flex flex-col items-center justify-center gap-4"
            style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
          >
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center"
              style={{ background: 'rgba(145,162,79,0.08)', borderColor: 'rgba(145,162,79,0.25)' }}
            >
              <Loader size={22} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <p className="font-medium text-sm sm:text-base" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
              Saving your details…
            </p>
            <p className="text-xs sm:text-sm text-center" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
              Preparing your UPI payment screen
            </p>
          </div>
        )}

        {/* ─── PAYMENT ─── */}
        {step === 'payment' && (
          <div
            className="p-4 sm:p-6"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
              <div className="min-w-0">
                <p className="font-semibold text-base sm:text-lg leading-tight" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                  Scan and pay with any UPI app
                </p>
                <p className="text-xs sm:text-sm mt-1 max-w-xs sm:max-w-sm" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
                  Use Google Pay, PhonePe, Paytm, BHIM, or any banking app to complete your subscription securely.
                </p>
              </div>
              <div
                className="w-fit px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold"
                style={{ background: 'rgba(145,162,79,0.10)', color: 'var(--accent-primary)' }}
              >
                {UPI_AMOUNT}
              </div>
            </div>

            <div
              className="rounded-[1.5rem] sm:rounded-[1.75rem] p-3.5 sm:p-5"
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #f8f8f5 100%)',
                border: '1px solid rgba(145,162,79,0.16)',
                boxShadow: isMobile ? '0 10px 24px rgba(145,162,79,0.08)' : '0 20px 40px rgba(145,162,79,0.10)',
              }}
            >
              <img
                src={UPI_QR_IMAGE}
                alt="UPI QR code for Coffee on QR payment"
                className="w-full max-w-[280px] sm:max-w-[320px] mx-auto rounded-[1.1rem] sm:rounded-[1.25rem] object-cover"
              />
            </div>

            <div
              className="mt-4 rounded-2xl p-4"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-soft)' }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.18em]" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}>
                    UPI ID
                  </p>
                  <p className="text-sm sm:text-base font-semibold mt-1 break-all leading-snug" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-primary)' }}>
                    {UPI_ID}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-soft)', color: 'var(--text-primary)' }}
                >
                  <Copy size={14} />
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="mt-3 flex items-start gap-3 rounded-xl p-3" style={{ background: 'rgba(145,162,79,0.06)' }}>
                <Smartphone size={16} style={{ color: 'var(--accent-primary)', marginTop: '2px', flexShrink: 0 }} />
                <p className="text-xs sm:text-sm" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
                  After payment, tap the confirmation button below. We will mark your payment request as received and our team will send your welcome mail and invoice within an hour.
                </p>
              </div>

              {savedOffline && (
                <div
                  className="mt-3 rounded-xl p-3"
                  style={{ background: 'rgba(233,168,124,0.10)', border: '1px solid rgba(233,168,124,0.24)' }}
                >
                  <p className="text-xs sm:text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#8A5A33' }}>
                    The payment screen is working in backup mode right now. Please add your Vercel Supabase server keys so every signup and payment confirmation is stored live.
                  </p>
                </div>
              )}
            </div>

            <div
              className="mt-5 space-y-3"
              style={isMobile ? { position: 'sticky', bottom: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.97) 18%, rgba(255,255,255,0.97) 100%)', paddingTop: '0.75rem' } : undefined}
            >
            

              <button
                type="button"
                onClick={handlePaymentConfirmation}
                disabled={confirmingPayment}
                className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'var(--accent-primary)',
                  color: '#1A1A1A',
                  boxShadow: '0 10px 24px rgba(145,162,79,0.22)',
                  opacity: confirmingPayment ? 0.8 : 1,
                }}
              >
                {confirmingPayment ? 'Confirming payment…' : 'I’ve completed the payment'}
              </button>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="w-full py-3.5 rounded-xl text-sm transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'var(--bg-card)',
                  border: '1.5px solid var(--border-soft)',
                  color: 'var(--text-secondary)',
                }}
              >
                Edit details
              </button>
            </div>
          </div>
        )}

        {/* ─── SUCCESS ─── */}
        {step === 'success' && (
          <div
            className="p-6 sm:p-10 flex flex-col items-center gap-4 text-center"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center"
              style={{ background: 'rgba(145,162,79,0.08)', borderColor: 'rgba(145,162,79,0.25)' }}
            >
              <CheckCircle size={26} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                Payment request received.
              </p>
              <p className="text-xs sm:text-sm mt-2 max-w-[16rem] sm:max-w-xs" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
                Thanks for joining Coffee on QR. You will receive a welcome mail and invoice from our team within an hour.
              </p>
            </div>
            <div className="w-full p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1.5px solid var(--border-soft)' }}>
              <p className="text-xs sm:text-sm" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
                We’ll contact you on WhatsApp at{' '}
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>+91 {form.phone}</span>
                <br />
                <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                  with onboarding details and your next steps
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl text-sm transition-colors"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: 'var(--bg-secondary)',
                border: '1.5px solid var(--border-soft)',
                color: 'var(--text-secondary)',
              }}
            >
              Close
            </button>
          </div>
        )}

        {/* ─── ERROR ─── */}
        {step === 'error' && (
          <div
            className="p-6 sm:p-10 flex flex-col items-center gap-4 text-center"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
          >
            <div
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.20)' }}
            >
              <AlertCircle size={22} style={{ color: '#EF4444' }} />
            </div>
            <div>
              <p className="text-base sm:text-lg font-semibold" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                Something went wrong
              </p>
              <p className="text-xs sm:text-sm mt-2" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
                {errorMsg}
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-colors"
                style={{ background: 'var(--accent-primary)', color: '#ffffff' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent-primary)'}
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl text-sm transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'var(--bg-secondary)',
                  border: '1.5px solid var(--border-soft)',
                  color: 'var(--text-secondary)',
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
