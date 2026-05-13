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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
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
