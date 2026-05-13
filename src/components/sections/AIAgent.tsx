'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageCircle, ExternalLink } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  showQuickReplies?: boolean;
  showActions?: boolean;
  businessType?: string;
}

const quickReplyOptions = ['Gym', 'Hotel', 'Cafe', 'Ecommerce', 'Other'];

function getPackageRecommendation(businessType: string): string {
  switch (businessType) {
    case 'Gym':
    case 'Cafe':
    case 'Restaurant':
      return 'Simple Landing Page (₹9,999) or Starter 3D (₹24,999)';
    case 'Hotel':
    case 'Real Estate':
      return 'Growth 3D Experience (₹49,999)';
    case 'Ecommerce':
    case 'AI Business':
      return 'Premium 3D Brand (₹89,999)';
    case 'Other':
    default:
      return 'Custom Enterprise Solution';
  }
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-neon-green/60"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const initializeChat = () => {
    if (initialized) return;
    setInitialized(true);

    // First message appears immediately
    const msg1: ChatMessage = {
      id: '1',
      sender: 'ai',
      text: "Hi! 👋 I'm SubzAgent AI. Tell me about your project and I'll recommend the perfect package!",
    };
    setMessages([msg1]);

    // Second message appears after typing delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msg2: ChatMessage = {
        id: '2',
        sender: 'ai',
        text: 'What type of business do you have? (Gym, Hotel, Cafe, Restaurant, Ecommerce, Personal Brand, Real Estate, AI Business, Other)',
        showQuickReplies: true,
      };
      setMessages((prev) => [...prev, msg2]);
    }, 1200);
  };

  const handleOpen = () => {
    setIsOpen(true);
    initializeChat();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleQuickReply = (businessType: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: businessType,
    };
    setMessages((prev) => prev.map((m) => ({ ...m, showQuickReplies: false })));
    setMessages((prev) => [...prev, userMsg]);

    // Show typing indicator
    setIsTyping(true);

    const recommendation = getPackageRecommendation(businessType);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `Great choice! Based on your needs, I'd recommend our ${recommendation}. Want me to connect you with our team on WhatsApp for a detailed discussion?`,
        showActions: true,
        businessType,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const whatsappLink = (businessType: string) =>
    `https://wa.me/916297097642?text=${encodeURIComponent(`Hi! I'm interested in a website for my ${businessType}`)}`;

  return (
    <>
      {/* Floating Button - Collapsed State */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={handleOpen}
            className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-neon-green shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-shadow hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
            aria-label="Open AI Assistant"
          >
            {/* Pulsing ring */}
            <span className="absolute inset-0 animate-ping rounded-full bg-neon-green/20" />

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Bot className="h-6 w-6 text-deep-black sm:h-7 sm:w-7" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel - Expanded State */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-4 right-4 z-50 flex flex-col overflow-hidden rounded-2xl sm:bottom-6 sm:right-6"
            style={{
              width: 'min(320px, calc(100vw - 32px))',
              maxHeight: '500px',
            }}
          >
            {/* Header */}
            <div className="glass-strong flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neon-green/10">
                  <Bot className="h-4 w-4 text-neon-green" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    SubzAgent AI
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-green" />
                    <span className="text-[10px] text-neon-green">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="glass-strong flex-1 overflow-y-auto px-4 py-3">
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    {msg.sender === 'ai' ? (
                      <div className="flex gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon-green/10">
                          <Bot className="h-3 w-3 text-neon-green" />
                        </div>
                        <div className="max-w-[85%]">
                          <div className="rounded-xl rounded-tl-sm bg-white/5 px-3 py-2">
                            <p className="text-xs leading-relaxed text-foreground sm:text-sm">
                              {msg.text}
                            </p>
                          </div>

                          {/* Quick Reply Buttons */}
                          {msg.showQuickReplies && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {quickReplyOptions.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleQuickReply(option)}
                                  className="rounded-full border border-neon-green/20 bg-neon-green/5 px-3 py-1 text-xs font-medium text-neon-green transition-all hover:bg-neon-green/10 hover:shadow-[0_0_10px_rgba(57,255,20,0.2)]"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Action Buttons */}
                          {msg.showActions && msg.businessType && (
                            <div className="mt-2 flex flex-col gap-1.5">
                              <a
                                href={whatsappLink(msg.businessType)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-green-500/10 px-3 py-2 text-xs font-medium text-green-400 transition-all hover:bg-green-500/20"
                              >
                                <MessageCircle className="h-3 w-3" />
                                Chat on WhatsApp
                              </a>
                              <button
                                onClick={() => {
                                  setIsOpen(false);
                                  const pricingSection =
                                    document.getElementById('pricing');
                                  if (pricingSection) {
                                    pricingSection.scrollIntoView({
                                      behavior: 'smooth',
                                    });
                                  }
                                }}
                                className="flex items-center justify-center gap-1.5 rounded-lg bg-neon-cyan/10 px-3 py-2 text-xs font-medium text-neon-cyan transition-all hover:bg-neon-cyan/20"
                              >
                                <ExternalLink className="h-3 w-3" />
                                View Packages
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="max-w-[85%] rounded-xl rounded-tr-sm bg-neon-green/10 px-3 py-2">
                          <p className="text-xs leading-relaxed text-foreground sm:text-sm">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon-green/10">
                      <Bot className="h-3 w-3 text-neon-green" />
                    </div>
                    <div className="rounded-xl rounded-tl-sm bg-white/5 px-3 py-2">
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
