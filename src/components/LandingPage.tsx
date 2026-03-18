import React, { useState } from 'react';
import Navbar from './landing/Navbar';
import Hero from './landing/Hero';
import WhatsAppDemo from './landing/WhatsAppDemo';
import Features from './landing/Features';
import FAQ from './landing/FAQ';
import Footer from './landing/Footer';

interface LandingPageProps {
  onAuth: (mode: 'login' | 'signup') => void;
}

export default function LandingPage({ onAuth }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-paper selection:bg-brand-orange selection:text-white font-sans overflow-x-hidden">
      <Navbar 
        onAuth={onAuth} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <main>
        <Hero onAuth={onAuth} />
        <WhatsAppDemo />
        <Features onAuth={onAuth} />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
