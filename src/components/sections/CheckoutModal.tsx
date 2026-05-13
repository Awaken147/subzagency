'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
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
  Smartphone,
  Sparkles,
  Camera,
  ArrowRight,
  Home,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: string;
  packagePriceAmount: number;
}

type PaymentStep = 'form' | 'payment' | 'confirmation';

interface FormData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  requirements: string;
}

const WHATSAPP_NUMBER = '916297097642';
const UPI_ID = 'subhamchettri147-1@okhdfcbank';

/* ------------------------------------------------------------------ */
/*  Mini particle burst for confirmation screen                        */
/* ------------------------------------------------------------------ */
function ConfirmationParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    interface Dot {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const colors = ['#39ff14', '#00f0ff', '#a855f7', '#39ff14', '#00f0ff'];
    const dots: Dot[] = [];

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      dots.push({
        x: w / 2,
        y: h / 2 - 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: 1.5 + Math.random() * 3,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 40 + Math.random() * 40,
      });
    }

    let frame = 0;
    const maxFrames = 80;

    const animate = () => {
      if (frame > maxFrames) return;
      ctx.clearRect(0, 0, w, h);

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.03;
        d.life++;
        d.alpha = Math.max(0, 1 - d.life / d.maxLife);

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = d.alpha * 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Animated checkmark ring                                            */
/* ------------------------------------------------------------------ */
function AnimatedCheckRing() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
      {/* Outer pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: '2px solid rgba(57,255,20,0.2)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.2, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Middle glow ring */}
      <motion.div
        className="absolute inset-1 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(57,255,20,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Main circle */}
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24"
        style={{
          background: 'linear-gradient(135deg, rgba(57,255,20,0.12), rgba(0,240,255,0.08))',
          border: '2px solid rgba(57,255,20,0.3)',
          boxShadow: '0 0 30px rgba(57,255,20,0.15), 0 0 60px rgba(57,255,20,0.05)',
        }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.4 }}
        >
          <CheckCircle2 className="h-10 w-10 text-neon-green sm:h-12 sm:w-12" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main CheckoutModal Component                                       */
/* ------------------------------------------------------------------ */

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
      setStep('confirmation');
      return;
    }
    setStep('payment');
  };

  const generateScreenshotWhatsAppMessage = () => {
    return `Hello SubzAgency,

I have completed the payment for my selected package.

Details:
- Name: ${formData.name}
- Business Name: ${formData.businessName}
- Selected Package: ${packageName}
- Amount Paid: ${packagePrice}
- Email: ${formData.email}
- Phone Number: ${formData.phone}

I am attaching the payment screenshot for verification.

Please confirm and begin the project process.

Thank you.`;
  };

  const generateGeneralWhatsAppMessage = () => {
    return `Hello SubzAgency!

I just completed a payment for the ${packageName} package (${packagePrice}).

Name: ${formData.name}
Business: ${formData.businessName}
Email: ${formData.email}
Phone: ${formData.phone}

Looking forward to working with you!`;
  };

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
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
    setStep('confirmation');
  };

  const handleSendScreenshot = () => {
    const message = generateScreenshotWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleContinueToWhatsApp = () => {
    const message = generateGeneralWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
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
              className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl"
              style={{
                maxWidth: step === 'confirmation' ? '480px' : '440px',
                background: 'linear-gradient(135deg, rgba(15,15,35,0.96), rgba(10,10,26,0.98))',
                backdropFilter: 'blur(40px)',
                border: '1px solid rgba(57,255,20,0.15)',
                boxShadow:
                  '0 0 40px rgba(57,255,20,0.08), 0 0 80px rgba(0,240,255,0.04), 0 25px 50px rgba(0,0,0,0.5)',
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
                  background: step === 'confirmation'
                    ? 'linear-gradient(135deg, rgba(57,255,20,0.12), transparent, rgba(0,240,255,0.12))'
                    : 'linear-gradient(135deg, rgba(57,255,20,0.08), transparent, rgba(0,240,255,0.08))',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 4s ease infinite',
                }}
              />

              {/* Header — hidden on confirmation step for cleaner look */}
              {step !== 'confirmation' && (
                <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6 sm:py-5">
                  <div>
                    <h3 className="text-lg font-bold text-foreground sm:text-xl">
                      {step === 'form' && 'Complete Your Order'}
                      {step === 'payment' && 'Secure Payment'}
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
              )}

              {/* Close button for confirmation step (top-right) */}
              {step === 'confirmation' && (
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground/50 transition-all duration-200 hover:bg-white/10 hover:text-foreground"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              )}

              {/* Content */}
              <div className={`relative ${step === 'confirmation' ? 'max-h-[85vh]' : 'max-h-[75vh]'} overflow-y-auto px-5 py-5 sm:px-6 sm:py-6`}>
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

                        {/* I Have Paid — now shows confirmation screen instead of redirecting */}
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
                            const msg = generateGeneralWhatsAppMessage();
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
                        <span>Secured by UPI &bull; 256-bit encryption</span>
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

                  {/* ===== CONFIRMATION STEP ===== */}
                  {step === 'confirmation' && (
                    <motion.div
                      key="confirmation"
                      className="relative flex flex-col items-center gap-5 py-2"
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    >
                      {/* Particle burst */}
                      <ConfirmationParticles />

                      {/* Animated check ring */}
                      <AnimatedCheckRing />

                      {/* Heading */}
                      <motion.div
                        className="relative z-10 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h4
                          className="text-xl font-extrabold sm:text-2xl"
                          style={{
                            background: 'linear-gradient(135deg, #39ff14, #00f0ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          Payment Submitted Successfully
                        </h4>
                      </motion.div>

                      {/* Verification badges */}
                      <motion.div
                        className="relative z-10 flex flex-wrap items-center justify-center gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
                          style={{
                            background: 'rgba(57,255,20,0.08)',
                            border: '1px solid rgba(57,255,20,0.2)',
                          }}
                        >
                          <Clock size={12} className="text-neon-green" />
                          <span className="text-xs font-medium text-neon-green">
                            Final verification required
                          </span>
                        </div>
                        <div
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
                          style={{
                            background: 'rgba(0,240,255,0.08)',
                            border: '1px solid rgba(0,240,255,0.2)',
                          }}
                        >
                          <Camera size={12} className="text-neon-cyan" />
                          <span className="text-xs font-medium text-neon-cyan">
                            Screenshot needed
                          </span>
                        </div>
                      </motion.div>

                      {/* Professional message card */}
                      <motion.div
                        className="relative z-10 w-full"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <div
                          className="rounded-xl p-5"
                          style={{
                            background: 'linear-gradient(135deg, rgba(57,255,20,0.03), rgba(0,240,255,0.03))',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            Thank you for choosing{' '}
                            <span className="font-semibold text-neon-green">SubzAgency</span>.
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            To verify your payment and begin your project instantly, please send a{' '}
                            <span className="font-semibold text-foreground">screenshot of the successful payment</span>{' '}
                            on WhatsApp.
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            Our team will review your payment and contact you shortly to start your project.
                          </p>
                        </div>
                      </motion.div>

                      {/* Order summary card */}
                      <motion.div
                        className="relative z-10 w-full"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <div
                          className="rounded-xl p-4 space-y-2.5"
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
                            <span className="text-muted-foreground">Amount Paid</span>
                            <span className="font-bold text-neon-green">{packagePrice}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Name</span>
                            <span className="text-foreground">{formData.name}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Business</span>
                            <span className="text-foreground">{formData.businessName}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Email</span>
                            <span className="text-foreground text-xs sm:text-sm">{formData.email}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Security trust badge */}
                      <motion.div
                        className="relative z-10 flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        <ShieldCheck size={14} className="text-neon-green/60" />
                        <span className="text-xs text-muted-foreground/60">
                          Your payment is being verified securely
                        </span>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        className="relative z-10 w-full space-y-3"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                      >
                        {/* Send Payment Screenshot — Primary CTA */}
                        <motion.button
                          onClick={handleSendScreenshot}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="group flex w-full items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold transition-all duration-300"
                          style={{
                            background: 'linear-gradient(135deg, #39ff14, #00f0ff)',
                            color: '#050510',
                            boxShadow: '0 0 20px rgba(57,255,20,0.2), 0 0 40px rgba(0,240,255,0.1)',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow =
                              '0 0 30px rgba(57,255,20,0.4), 0 0 60px rgba(0,240,255,0.2)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow =
                              '0 0 20px rgba(57,255,20,0.2), 0 0 40px rgba(0,240,255,0.1)';
                          }}
                        >
                          <Camera size={18} />
                          <span>Send Payment Screenshot</span>
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </motion.button>

                        {/* Continue To WhatsApp */}
                        <motion.button
                          onClick={handleContinueToWhatsApp}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 py-3.5 text-sm font-semibold text-green-400 transition-all duration-300 hover:bg-green-500/15 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                        >
                          <MessageCircle size={18} />
                          Continue To WhatsApp
                        </motion.button>

                        {/* Back To Website */}
                        <motion.button
                          onClick={handleClose}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/3 py-3.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:border-white/20 hover:bg-white/5"
                        >
                          <Home size={16} />
                          Back To Website
                        </motion.button>
                      </motion.div>
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
