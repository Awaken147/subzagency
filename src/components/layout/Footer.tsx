'use client';

import { Instagram, MessageCircle, MapPin, Mail, ArrowUp } from 'lucide-react';
import ParticleField from '@/components/effects/ParticleField';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/subz_agency',
    icon: Instagram,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/916297097642',
    icon: MessageCircle,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/5 bg-[#050510]">
      {/* Neon green glow line at top */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14] to-transparent" />
      <div className="absolute left-0 right-0 top-0 h-8 bg-[#39ff14]/5 blur-2xl" />

      {/* Subtle particles */}
      <ParticleField count={12} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 text-2xl font-bold tracking-tight">
              <span className="text-[#39ff14]">Subz</span>
              <span className="text-white">Agency</span>
            </div>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Crafting futuristic digital experiences that push boundaries and
              redefine what&apos;s possible.
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-500">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#39ff14]/60" />
              <span>Gangtok, Sikkim, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#00f0ff]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-[#39ff14]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#00f0ff]">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-[#39ff14]"
                  >
                    <link.icon size={16} className="text-[#39ff14]/60" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:subzagency99@gmail.com"
                  className="flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-[#39ff14]"
                >
                  <Mail size={16} className="text-[#39ff14]/60" />
                  subzagency99@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#00f0ff]">
              Get in Touch
            </h3>
            <p className="mb-3 text-sm text-gray-400">
              Ready to start your next project? Let&apos;s talk.
            </p>
            <a
              href="https://wa.me/916297097642"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#39ff14]/30 bg-[#39ff14]/10 px-4 py-2 text-sm font-medium text-[#39ff14] transition-all duration-200 hover:bg-[#39ff14]/20 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; 2025 SubzAgency. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition-all duration-200 hover:border-[#39ff14]/30 hover:text-[#39ff14]"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
