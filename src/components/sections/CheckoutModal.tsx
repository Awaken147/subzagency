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
  Copy,
  Check,
  Shield,
  ExternalLink,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: string;
  packagePriceAmount: number;
}

type PaymentStep = 'form' | 'payment' | 'success';

interface FormData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  requirements: string;
}

const WHATSAPP_NUMBER = '916297097642';
const UPI_ID = 'subhamchettri147-1@okhdfcbank';

export default function CheckoutModal({
  isOpen,
  onClose,
  packageName,
  packagePrice,
  packagePriceAmount,
}: CheckoutModalProps) {
  const [step, setStep] = useState<PaymentStep>('form');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    requirements: '',
  });
  const [copied, setCopied] = useState(false);

  const isCustomQuote = packagePriceAmount === 0;

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isCustomQuote) {
      const message = generateWhatsAppMessage();
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
      setStep('success');
      return;
    }
    setStep('payment');
  };

  const generateWhatsAppMessage = () => {
    return `Hi SubzAgency! Payment Completed ✅

📋 Name: ${formData.name}
🏢 Business: ${formData.businessName}
📦 Package: ${packageName}
💰 Amount: ${packagePrice}
📱 Phone: ${formData.phone}
📧 Email: ${formData.email}
📝 Requirements: ${formData.requirements || 'N/A'}

✅ Payment Completed

Please confirm my order!`;
  };

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = UPI_ID;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpenUpiApp = () => {
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=SubzAgency&am=${packagePriceAmount}&cu=INR&tn=${encodeURIComponent(`SubzAgency - ${packageName}`)}`;
    window.open(upiLink, '_blank');
  };

  const handleIHavePaid = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    setStep('success');
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
    onClose();
  };

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground placeholder:text-gray-500 transition-all duration-300 focus:outline-none focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md overflow-hidden rounded-2xl sm:rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(15,15,35,0.95), rgba(10,10,26,0.98))',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(57,255,20,0.15)',
                boxShadow: '0 0 40px rgba(57,255,20,0.08), 0 0 80px rgba(0,240,255,0.04), 0 25px 50px rgba(0,0,0,0.5)',
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated neon border glow */}
              <div
                className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(57,255,20,0.1), transparent, rgba(0,240,255,0.1))',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 4s ease infinite',
                }}
              />

              {/* Header */}
              <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                <div>
                  <h3 className="text-lg font-bold text-foreground sm:text-xl">
                    {step === 'form' && 'Complete Your Order'}
                    {step === 'payment' && 'Secure Payment'}
                    {step === 'success' && 'Order Confirmed!'}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-neon-green">{packageName}</span>
                    {' — '}
                    <span className="font-semibold text-neon-cyan">{packagePrice}</span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-white/10 hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="relative max-h-[75vh] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
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
                        <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          required
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`${inputClass} pl-11`}
                        />
                      </div>

                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          required
                          placeholder="Business Name *"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className={`${inputClass} pl-11`}
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`${inputClass} pl-11`}
                        />
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                          type="email"
                          required
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`${inputClass} pl-11`}
                        />
                      </div>

                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                        <textarea
                          rows={3}
                          placeholder="Project Requirements (optional)"
                          value={formData.requirements}
                          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                          className={`${inputClass} resize-none pl-11`}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-xl bg-neon-green py-3.5 text-sm font-bold text-deep-black transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
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
                      {/* QR Code Section */}
                      <div className="flex flex-col items-center gap-4">
                        {/* Scan to Pay label */}
                        <div className="flex items-center gap-2">
                          <QrCode size={18} className="text-neon-green" />
                          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                            Scan To Pay
                          </span>
                        </div>

                        {/* Real QR Code Image */}
                        <div
                          className="relative rounded-2xl overflow-hidden"
                          style={{
                            background: 'white',
                            padding: '12px',
                            boxShadow: '0 0 30px rgba(57,255,20,0.1), 0 0 60px rgba(0,240,255,0.05)',
                          }}
                        >
                          <Image
                            src="/payment-qr.jpg"
                            alt="Scan QR code to pay via UPI"
                            width={200}
                            height={200}
                            className="rounded-lg"
                            style={{
                              maxWidth: '200px',
                              maxHeight: '200px',
                              width: '100%',
                              height: 'auto',
                            }}
                            priority
                          />
                        </div>

                        {/* Amount Display */}
                        <div
                          className="w-full rounded-xl p-4 text-center"
                          style={{
                            background: 'linear-gradient(135deg, rgba(57,255,20,0.05), rgba(0,240,255,0.05))',
                            border: '1px solid rgba(57,255,20,0.15)',
                          }}
                        >
                          <p className="text-xs text-muted-foreground mb-1">Amount to Pay</p>
                          <p
                            className="text-3xl font-extrabold"
                            style={{
                              color: '#39ff14',
                              textShadow: '0 0 20px rgba(57,255,20,0.3)',
                            }}
                          >
                            {packagePrice}
                          </p>
                        </div>
                      </div>

                      {/* UPI ID Section */}
                      <div
                        className="rounded-xl p-4 text-center"
                        style={{
                          background: 'rgba(0,240,255,0.03)',
                          border: '1px solid rgba(0,240,255,0.12)',
                        }}
                      >
                        <p className="text-xs text-muted-foreground mb-2">UPI ID</p>
                        <p className="text-lg font-mono font-bold text-neon-cyan mb-3 break-all">
                          {UPI_ID}
                        </p>
                        <motion.button
                          onClick={handleCopyUpi}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 px-5 py-2.5 text-xs font-semibold text-neon-cyan transition-all duration-300 hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? 'Copied!' : 'Copy UPI ID'}
                        </motion.button>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        {/* Open UPI App */}
                        <motion.button
                          onClick={handleOpenUpiApp}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 py-3.5 text-sm font-semibold text-neon-cyan transition-all duration-300 hover:bg-neon-cyan/15 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                        >
                          <Smartphone size={18} />
                          Open UPI App
                        </motion.button>

                        {/* I Have Paid */}
                        <motion.button
                          onClick={handleIHavePaid}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-green py-3.5 text-sm font-bold text-deep-black transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
                        >
                          <CheckCircle2 size={18} />
                          I Have Paid
                        </motion.button>

                        {/* Contact on WhatsApp */}
                        <motion.button
                          onClick={() => {
                            const msg = generateWhatsAppMessage();
                            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 py-3.5 text-sm font-semibold text-green-400 transition-all duration-300 hover:bg-green-500/15 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                        >
                          <MessageCircle size={18} />
                          Contact on WhatsApp
                        </motion.button>
                      </div>

                      {/* Razorpay Coming Soon Badge */}
                      <div className="flex justify-center">
                        <div
                          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2"
                          style={{
                            background: 'rgba(168,85,247,0.06)',
                            border: '1px solid rgba(168,85,247,0.15)',
                            boxShadow: '0 0 15px rgba(168,85,247,0.05)',
                          }}
                        >
                          <Sparkles size={12} className="text-neon-purple" />
                          <span className="text-xs font-medium text-neon-purple/80">
                            Razorpay Integration Coming Soon
                          </span>
                          <Shield size={10} className="text-neon-purple/50" />
                        </div>
                      </div>

                      {/* Security notice */}
                      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60">
                        <Shield size={12} />
                        <span>Secured by UPI • 256-bit encryption</span>
                      </div>

                      {/* Back button */}
                      <button
                        onClick={() => setStep('form')}
                        className="w-full rounded-xl border border-white/10 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground hover:border-white/20"
                      >
                        Back to Details
                      </button>
                    </motion.div>
                  )}

                  {/* ===== SUCCESS STEP ===== */}
                  {step === 'success' && (
                    <motion.div
                      key="success"
                      className="flex flex-col items-center gap-5 py-4"
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
                        <h4 className="text-xl font-bold text-neon-green">Order Submitted!</h4>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          Thank you, {formData.name}! We&apos;ve received your order and will get back to you shortly.
                        </p>
                      </div>

                      <div
                        className="w-full rounded-xl p-4 space-y-3"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
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
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Email</span>
                          <span className="text-foreground">{formData.email}</span>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(generateWhatsAppMessage())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                      >
                        <MessageCircle size={18} />
                        Chat on WhatsApp
                      </a>

                      <button
                        onClick={handleClose}
                        className="w-full rounded-xl border border-white/10 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground hover:border-white/20"
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
