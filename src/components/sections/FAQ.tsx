'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import ScrollReveal from '@/components/effects/ScrollReveal';

const faqs = [
  {
    question: 'How long does it take to build a website?',
    answer:
      'Typically 1-4 weeks depending on the package. Simple landing pages take 3-5 days, while premium 3D experiences may take 3-4 weeks. We provide a detailed timeline before starting.',
  },
  {
    question: 'Do you offer EMI or payment plans?',
    answer:
      "Yes! We offer flexible payment plans. You can pay in 2-3 installments for packages above ₹24,999. Contact us to discuss a plan that works for you.",
  },
  {
    question: 'What technologies do you use?',
    answer:
      'We use Next.js, React, Three.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, and more. For 3D experiences, we leverage React Three Fiber and WebGL. For backend, we use Node.js, Prisma, and modern cloud services.',
  },
  {
    question: 'Will my website work perfectly on mobile?',
    answer:
      'Absolutely! Every website we build is mobile-first and responsive. We test on all major devices and browsers to ensure a flawless experience everywhere.',
  },
  {
    question: 'Can I update the content myself?',
    answer:
      "Yes! We build with modern CMS solutions that let you update text, images, and content without touching code. We also provide training and documentation.",
  },
  {
    question: 'Do you provide hosting and maintenance?',
    answer:
      'Yes! We offer hosting and maintenance plans starting at ₹499/month. This includes SSL, backups, updates, performance monitoring, and priority support.',
  },
  {
    question: 'What if I need changes after launch?',
    answer:
      'We offer 30 days of free bug fixes after launch. For ongoing changes, our maintenance plans include regular updates. One-off changes are also available at competitive rates.',
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <div
        className={`glass overflow-hidden rounded-xl transition-all duration-300 ${
          isOpen
            ? 'border-glow-green border-neon-green/20'
            : 'hover:border-white/15'
        }`}
      >
        <button
          id={`faq-heading-${index}`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-content-${index}`}
          className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5"
        >
          <div className="flex items-center gap-3">
            <HelpCircle
              className={`h-4 w-4 shrink-0 transition-colors duration-300 ${
                isOpen ? 'text-neon-green' : 'text-muted-foreground'
              }`}
            />
            <span
              className={`text-sm font-medium transition-colors duration-300 sm:text-base ${
                isOpen ? 'text-neon-green text-glow-green' : 'text-foreground'
              }`}
            >
              {faq.question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="shrink-0"
          >
            {isOpen ? (
              <Minus className="h-4 w-4 text-neon-green" />
            ) : (
              <Plus className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            )}
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div
                id={`faq-content-${index}`}
                role="region"
                aria-labelledby={`faq-heading-${index}`}
                className="border-t border-white/5 px-5 py-4 sm:px-6 sm:py-5"
              >
                <p className="pl-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" itemScope itemType="https://schema.org/FAQPage" aria-label="Frequently Asked Questions" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="mb-12 text-center sm:mb-16">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-neon-green text-glow-green">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
        </ScrollReveal>

        {/* FAQ Items - Custom implementation for better animation */}
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>


      </div>
    </section>
  );
}
