import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { saveLead, updateLeadPayment, type Lead } from '../lib/supabase';
import BrandMark from './BrandMark';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'form' | 'processing' | 'success' | 'error';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill: { name: string; contact: string };
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayInstance {
  open: () => void;
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({
    name: '',
    cafe_name: '',
    phone: '',
    city: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('form');
      setErrors({});
      setErrorMsg('');
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep('processing');

    const lead: Lead = { ...form };
    const { data, error } = await saveLead(lead);

    if (error || !data) {
      setErrorMsg(error ?? 'Something went wrong. Please try again.');
      setStep('error');
      return;
    }

    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      setErrorMsg('Payment gateway failed to load. Please refresh and try again.');
      setStep('error');
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID as string;

    if (!razorpayKey) {
      await updateLeadPayment(data.id!, 'demo_payment', 'demo_order');
      setStep('success');
      return;
    }

    const options: RazorpayOptions = {
      key: razorpayKey,
      amount: 199900,
      currency: 'INR',
      name: 'Coffee on QR',
      description: 'Early Access — Loyalty System for Cafes',
      prefill: { name: form.name, contact: form.phone },
      theme: { color: '#3B82F6' },
      handler: async (response: RazorpayResponse) => {
        await updateLeadPayment(
          data.id!,
          response.razorpay_payment_id,
          response.razorpay_order_id ?? ''
        );
        setStep('success');
      },
      modal: {
        ondismiss: () => setStep('form'),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const inputClass = (field: string) =>
    `w-full bg-white/5 border ${
      errors[field] ? 'border-red-500/50' : 'border-white/10'
    } rounded-xl px-4 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all duration-200`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:max-w-md bg-[#111] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        {step === 'form' && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
                <BrandMark className="w-9 h-9 object-contain" alt="" />
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Claim Early Access
                  </p>
                  <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    ₹10,000/mo · Limited to 50 cafes
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass('name')}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="cafe_name"
                    value={form.cafe_name}
                    onChange={handleChange}
                    placeholder="Cafe name"
                    className={inputClass('cafe_name')}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  {errors.cafe_name && (
                    <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.cafe_name}</p>
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
                  className={inputClass('phone')}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                {errors.phone && (
                  <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={inputClass('city')}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                {errors.city && (
                  <p className="text-xs text-red-400 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{errors.city}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  className={inputClass('email')}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25 active:scale-[0.98] mt-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Continue to Payment
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                Secure payment via Razorpay · 30-day money-back guarantee
              </p>
            </form>
          </>
        )}

        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Loader size={24} className="text-blue-400 animate-spin" />
            </div>
            <p className="text-white font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Setting up your account…</p>
            <p className="text-sm text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              Opening secure payment gateway
            </p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-10 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle size={28} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Welcome to Coffee on QR!
              </p>
              <p className="text-sm text-gray-400 mt-2 max-w-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                You're in! Our team will WhatsApp you within 2 hours to complete your setup.
              </p>
            </div>
            <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/5 mt-2">
              <p className="text-sm text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                Check WhatsApp at{' '}
                <span className="text-white font-medium">+91 {form.phone}</span>
                <br />
                <span className="text-gray-500 text-xs">for your onboarding link & QR code</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors text-sm"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Close
            </button>
          </div>
        )}

        {step === 'error' && (
          <div className="p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertCircle size={24} className="text-red-400" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>Something went wrong</p>
              <p className="text-sm text-gray-400 mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>{errorMsg}</p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
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
