'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  User,
  Phone,
  Building2,
} from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';
import GlowCard from '@/components/effects/GlowCard';
import MagneticButton from '@/components/effects/MagneticButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const contactCards = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 6297097642',
    href: 'https://wa.me/916297097642',
    color: 'text-green-400',
    glowColor: 'rgba(74, 222, 128, 0.15)',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@subz_agency',
    href: 'https://instagram.com/subz_agency',
    color: 'text-pink-400',
    glowColor: 'rgba(244, 114, 182, 0.15)',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@subzagency.com',
    href: 'mailto:hello@subzagency.com',
    color: 'text-neon-cyan',
    glowColor: 'rgba(0, 240, 255, 0.15)',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Gangtok, Sikkim, India',
    href: null,
    color: 'text-neon-purple',
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
];

const businessTypes = [
  'Gym',
  'Hotel',
  'Cafe',
  'Restaurant',
  'Ecommerce',
  'Personal Brand',
  'Real Estate',
  'Startup',
  'AI Business',
  'Other',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessType: '',
        message: '',
      });
    }, 3000);
  };

  const inputClass = (field: string) =>
    `w-full rounded-lg border bg-white/5 px-4 py-3 text-sm text-foreground placeholder-transparent transition-all duration-300 focus:outline-none focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 ${
      focusedField === field ? 'border-neon-green/30' : 'border-white/10'
    }`;

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-neon-cyan text-glow-cyan">
            Get In Touch
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Amazing</span>
          </h2>
        </ScrollReveal>

        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Contact Info */}
          <ScrollReveal direction="left" className="space-y-6">
            <div>
              <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                Ready to transform your{' '}
                <span className="text-neon-cyan">digital presence</span>?
              </h3>
              <p className="text-muted-foreground">
                Get in touch with us and let&apos;s discuss how we can help your business
                stand out with a stunning website.
              </p>
            </div>

            <div className="space-y-3">
              {contactCards.map((card, index) => {
                const Icon = card.icon;
                const content = (
                  <GlowCard
                    key={card.label}
                    className="p-4 sm:p-5"
                    glowColor={
                      card.label === 'WhatsApp'
                        ? 'green'
                        : card.label === 'Instagram'
                          ? 'purple'
                          : card.label === 'Email'
                            ? 'cyan'
                            : 'purple'
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12"
                        style={{ background: card.glowColor }}
                      >
                        <Icon className={`h-5 w-5 ${card.color}`} />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {card.label}
                        </p>
                        <p className="text-sm font-semibold text-foreground sm:text-base">
                          {card.value}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                );

                if (card.href) {
                  return (
                    <motion.a
                      key={card.label}
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="block"
                    >
                      {content}
                    </motion.a>
                  );
                }

                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {content}
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right Column - Contact Form */}
          <ScrollReveal direction="right">
            <div className="glass-strong overflow-hidden rounded-2xl p-6 sm:p-8">
              <h3 className="mb-6 text-lg font-bold sm:text-xl">
                Send us a Message
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon-green/10">
                    <CheckCircle2 className="h-8 w-8 text-neon-green" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-neon-green">
                    Message Sent!
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClass('name')} pl-10`}
                    />
                    <label className="absolute left-10 top-1/2 -translate-y-1/2 text-xs text-muted-foreground transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-neon-green">
                      Your Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClass('email')} pl-10`}
                    />
                    <label className="absolute left-10 top-1/2 -translate-y-1/2 text-xs text-muted-foreground transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-neon-green">
                      Email Address
                    </label>
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClass('phone')} pl-10`}
                    />
                    <label className="absolute left-10 top-1/2 -translate-y-1/2 text-xs text-muted-foreground transition-all peer-focus:-top-2 peer-focus:left-3 peer-focus:text-neon-green">
                      Phone Number
                    </label>
                  </div>

                  {/* Business Type */}
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <div
                      className={`${focusedField === 'businessType' ? 'border-neon-green/30 ring-2 ring-neon-green/20' : 'border-white/10'} ml-0 rounded-lg border transition-all duration-300`}
                    >
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, businessType: value })
                        }
                      >
                        <SelectTrigger className="w-full border-0 bg-transparent pl-10 text-sm text-foreground focus:ring-0 focus:outline-none">
                          <SelectValue placeholder="Select Business Type" />
                        </SelectTrigger>
                        <SelectContent className="border-white/10 bg-dark-navy">
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    type="submit"
                    className="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-neon-green px-6 py-3 text-sm font-semibold text-deep-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]"
                  >
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Send Message
                  </MagneticButton>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
