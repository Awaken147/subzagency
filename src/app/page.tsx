'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import Pricing from '@/components/sections/Pricing';
import Playground from '@/components/sections/Playground';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Hosting from '@/components/sections/Hosting';
import AIAgent from '@/components/sections/AIAgent';
import TrustSignals from '@/components/sections/TrustSignals';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hidden SEO content — screen-reader only for accessibility & crawlability */}
      <h1 className="sr-only">
        SubzAgency — Premium 3D Website Design &amp; AI Automation Agency in
        Gangtok, Sikkim, India
      </h1>

      <Navbar />
      <main className="flex-1 pt-14 sm:pt-16" role="main" aria-label="Main content">
        {/* Structured data for crawlers — hidden from visual users */}
        <div className="sr-only" aria-hidden="true">
          <p>
            SubzAgency is a premium web design agency in Gangtok, Sikkim,
            India. We specialize in cinematic 3D website design, AI automation,
            and conversion-focused digital experiences for businesses. Our
            services include custom 3D website development with Three.js and
            Next.js, AI chatbot integration, SEO optimization, ecommerce
            development, and premium hosting solutions. We serve clients in
            Gangtok, Sikkim, Northeast India, and across India.
          </p>
        </div>

        <Hero />
        <About />
        <TrustSignals />
        <Services />
        <Projects />
        <Testimonials />
        <Pricing />
        <Playground />
        <FAQ />
        <Contact />
        <Hosting />
      </main>
      <Footer />
      <AIAgent />
    </div>
  );
}
