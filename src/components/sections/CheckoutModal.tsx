'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Building2,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  MessageCircle,
  QrCode,
  CreditCard,
  Smartphone,
  Copy,
  Check,
  Shield,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: string;
  packagePriceAmount: number;
}

type PaymentStep = 'form' | 'payment' | 'success';
type PaymentMethod = 'qr' | 'upi' | 'razorpay';

interface FormData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  requirements: string;
}

const WHATSAPP_NUMBER = '916297097642';

export default function CheckoutModal({
  isOpen,
  onClose,
  packageName,
  packagePrice,
  packagePriceAmount,
}: CheckoutModalProps) {
  const [step, setStep] = useState<PaymentStep>('form');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qr');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    requirements: '',
  });
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);

  const isCustomQuote = packagePriceAmount === 0;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isCustomQuote) {
      // For custom quote, go directly to WhatsApp
      const message = generateWhatsAppMessage();
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      setStep('success');
      return;
    }
    setStep('payment');
  };

  const generateWhatsAppMessage = () => {
    return `Hi SubzAgency! I'd like to proceed with:

📋 Name: ${formData.name}
🏢 Business: ${formData.businessName}
📦 Package: ${packageName}
💰 Amount: ${packagePrice}
📱 Phone: ${formData.phone}
📧 Email: ${formData.email}
📝 Requirements: ${formData.requirements || 'N/A'}

Please confirm my order!`;
  };

  const handlePaymentComplete = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep('success');
    }, 2000);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('subzagency@upi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep('form');
    setFormData({
      name: '',
      businessName: '',
      phone: '',
      email: '',
      requirements: '',
    });
    setPaymentMethod('qr');
    onClose();
  };

  const inputClass =
    'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-strong relative w-full max-w-lg overflow-hidden rounded-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {step === 'form' && 'Complete Your Order'}
                    {step === 'payment' && 'Secure Payment'}
                    {step === 'success' && 'Order Confirmed!'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-neon-green font-semibold">{packageName}</span>
                    {' — '}
                    <span className="font-semibold" style={{ color: '#00f0ff' }}>
                      {packagePrice}
                    </span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
                <AnimatePresence mode="wait">
                  {/* ===== FORM STEP ===== */}
                  {step === 'form' && (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          required
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`${inputClass} pl-10`}
                        />
                      </div>

                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          required
                          placeholder="Business Name *"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className={`${inputClass} pl-10`}
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`${inputClass} pl-10`}
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                          type="email"
                          required
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`${inputClass} pl-10`}
                        />
                      </div>

                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <textarea
                          rows={3}
                          placeholder="Project Requirements (optional)"
                          value={formData.requirements}
                          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                          className={`${inputClass} resize-none pl-10`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-lg bg-neon-green py-3 text-sm font-semibold text-deep-black transition-shadow hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]"
                      >
                        {isCustomQuote ? 'Contact Us on WhatsApp' : 'Proceed to Payment'}
                      </motion.button>
                    </motion.form>
                  )}

                  {/* ===== PAYMENT STEP ===== */}
                  {step === 'payment' && (
                    <motion.div
                      key="payment"
                      className="space-y-5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {/* Payment Method Tabs */}
                      <div className="flex gap-2 rounded-xl bg-white/5 p-1">
                        {[
                          { id: 'qr' as const, label: 'Scan QR', icon: QrCode },
                          { id: 'upi' as const, label: 'UPI Pay', icon: Smartphone },
                          { id: 'razorpay' as const, label: 'Razorpay', icon: CreditCard },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setPaymentMethod(tab.id)}
                            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                              paymentMethod === tab.id
                                ? 'bg-neon-green/10 text-neon-green shadow-[0_0_10px_rgba(57,255,20,0.1)]'
                                : 'text-gray-400 hover:text-foreground'
                            }`}
                          >
                            <tab.icon size={14} />
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* QR Code */}
                      {paymentMethod === 'qr' && (
                        <div className="flex flex-col items-center gap-4 py-4">
                          {/* QR Code Placeholder */}
                          <div className="relative rounded-xl bg-white p-3">
                            <div className="grid grid-cols-11 gap-0.5" style={{ width: 180, height: 180 }}>
                              {Array.from({ length: 121 }).map((_, i) => {
                                const row = Math.floor(i / 11);
                                const col = i % 11;
                                const isCorner = (row < 3 && col < 3) || (row < 3 && col > 7) || (row > 7 && col < 3);
                                const isBorder = row === 0 || row === 10 || col === 0 || col === 10;
                                const isCenter = row >= 4 && row <= 6 && col >= 4 && col <= 6;
                                const filled = isCorner || isCenter || (isBorder && (row + col) % 2 === 0) || ((row + col) % 3 === 0 && !isBorder);
                                return (
                                  <div
                                    key={i}
                                    className="rounded-[1px]"
                                    style={{
                                      width: 16,
                                      height: 16,
                                      backgroundColor: filled ? '#050510' : '#ffffff',
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium text-foreground">Scan To Pay</p>
                            <p className="text-xs text-muted-foreground mt-1">Use any UPI app to scan</p>
                          </div>
                          <div className="glass w-full rounded-lg p-3 text-center">
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-2xl font-bold text-neon-green">{packagePrice}</p>
                          </div>
                        </div>
                      )}

                      {/* UPI Payment */}
                      {paymentMethod === 'upi' && (
                        <div className="flex flex-col items-center gap-4 py-4">
                          <div className="glass w-full rounded-lg p-4 text-center space-y-3">
                            <p className="text-xs text-muted-foreground">UPI ID</p>
                            <p className="text-lg font-mono font-semibold text-neon-cyan">subzagency@upi</p>
                            <button
                              onClick={handleCopyUpi}
                              className="inline-flex items-center gap-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-2 text-xs font-medium text-neon-cyan transition-all hover:bg-neon-cyan/10"
                            >
                              {copied ? <Check size={14} /> : <Copy size={14} />}
                              {copied ? 'Copied!' : 'Copy UPI ID'}
                            </button>
                          </div>
                          <div className="glass w-full rounded-lg p-3 text-center">
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-2xl font-bold text-neon-green">{packagePrice}</p>
                          </div>
                        </div>
                      )}

                      {/* Razorpay */}
                      {paymentMethod === 'razorpay' && (
                        <div className="flex flex-col items-center gap-4 py-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Shield size={16} className="text-neon-green" />
                            <span>Secure Payment</span>
                          </div>
                          <div className="glass w-full rounded-lg p-3 text-center">
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-2xl font-bold text-neon-green">{packagePrice}</p>
                          </div>
                          <button
                            onClick={handlePaymentComplete}
                            disabled={processing}
                            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 disabled:opacity-50"
                          >
                            {processing ? (
                              <span className="flex items-center justify-center gap-2">
                                <motion.span
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                                />
                                Processing...
                              </span>
                            ) : (
                              'Pay Now'
                            )}
                          </button>
                        </div>
                      )}

                      {/* Completed Payment Button for QR/UPI */}
                      {paymentMethod !== 'razorpay' && (
                        <button
                          onClick={handlePaymentComplete}
                          className="w-full rounded-lg bg-neon-green py-3 text-sm font-semibold text-deep-black transition-shadow hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]"
                        >
                          I&apos;ve Completed the Payment
                        </button>
                      )}

                      {/* Back button */}
                      <button
                        onClick={() => setStep('form')}
                        className="w-full rounded-lg border border-white/10 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Back to Details
                      </button>
                    </motion.div>
                  )}

                  {/* ===== SUCCESS STEP ===== */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      className="flex flex-col items-center gap-5 py-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-neon-green/10"
                      >
                        <CheckCircle2 className="h-10 w-10 text-neon-green" />
                      </motion.div>

                      <div className="text-center">
                        <h4 className="text-xl font-bold text-neon-green">Payment Successful!</h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Thank you, {formData.name}! We&apos;ll get back to you shortly.
                        </p>
                      </div>

                      <div className="glass w-full rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Package</span>
                          <span className="font-medium text-foreground">{packageName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Amount</span>
                          <span className="font-bold text-neon-green">{packagePrice}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Business</span>
                          <span className="text-foreground">{formData.businessName}</span>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition-all hover:bg-green-500"
                      >
                        <MessageCircle size={18} />
                        Chat on WhatsApp
                      </a>

                      <button
                        onClick={handleClose}
                        className="w-full rounded-lg border border-white/10 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
