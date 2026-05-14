'use client';

import { Instagram, MessageCircle, MapPin, Mail, ArrowUp, Phone } from 'lucide-react';
import ParticleField from '@/components/effects/ParticleField';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  { label: '3D Website Design', href: '#services' },
  { label: 'AI Chatbot Integration', href: '#services' },
  { label: 'Ecommerce Development', href: '#services' },
  { label: 'SEO Optimization', href: '#services' },
  { label: 'Landing Page Design', href: '#services' },
  { label: 'Premium Hosting', href: '#hosting' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/subz_agency',
    icon: Instagram,
    handle: '@subz_agency',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/916297097642',
    icon: MessageCircle,
    handle: '+91 6297097642',
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
    <footer
      className="relative mt-auto overflow-hidden border-t border-white/5 bg-[#050510]"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Neon green glow line at top */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#39ff14] to-transparent" />
      <div className="absolute left-0 right-0 top-0 h-8 bg-[#39ff14]/5 blur-2xl" />

      {/* Subtle particles */}
      <ParticleField count={12} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand — NAP info for local SEO */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4 text-2xl font-bold tracking-tight">
              <span className="text-[#39ff14]" itemProp="name">Subz</span>
              <span className="text-white">Agency</span>
            </div>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-gray-400" itemProp="description">
              Premium 3D web design agency in Gangtok, Sikkim. We craft cinematic
              digital experiences that captivate, convert, and leave lasting impressions.
            </p>

            {/* NAP — Name, Address, Phone for local SEO */}
            <div className="space-y-2 text-sm text-gray-400" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#39ff14]/60" />
                <span>
                  <span itemProp="streetAddress">Gangtok</span>,{' '}
                  <span itemProp="addressRegion">Sikkim</span>{' '}
                  <span itemProp="postalCode">737101</span>,{' '}
                  <span itemProp="addressCountry">India</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-[#39ff14]/60" />
                <a
                  href="tel:+916297097642"
                  className="transition-colors hover:text-[#39ff14]"
                  itemProp="telephone"
                >
                  +91 62970 97642
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-[#39ff14]/60" />
                <a
                  href="mailto:subzagency99@gmail.com"
                  className="transition-colors hover:text-[#39ff14]"
                  itemProp="email"
                >
                  subzagency99@gmail.com
                </a>
              </div>
            </div>

            {/* Social links with sameAs for schema */}
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`Follow SubzAgency on ${link.label} (opens in new tab)`}
                    itemProp="sameAs"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-[#39ff14]/30 hover:bg-[#39ff14]/10 hover:text-[#39ff14]"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#00f0ff]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
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
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#00f0ff]">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
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
          </nav>

          {/* Contact CTA */}
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
              aria-label="Chat with us on WhatsApp (opens in new tab)"
              className="inline-flex items-center gap-2 rounded-lg border border-[#39ff14]/30 bg-[#39ff14]/10 px-4 py-2 text-sm font-medium text-[#39ff14] transition-all duration-200 hover:bg-[#39ff14]/20 hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </a>

            {/* Trust indicators */}
            <div className="mt-4 space-y-1.5 text-xs text-gray-500">
              <p>✓ Verified Business in Sikkim</p>
              <p>✓ 4.9★ Average Rating</p>
              <p>✓ 50+ Happy Clients</p>
              <p>✓ Response within 2 hours</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SubzAgency. All rights reserved. | Gangtok, Sikkim, India
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
