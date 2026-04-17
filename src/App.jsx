import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fabrication from './components/Fabrication';
import SpecsTable from './components/SpecsTable';
import Footer from './components/Footer';
import SparkPhysicsEngine from './components/SparkPhysicsEngine';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Buttery Smooth Scrolling (Awwwards staple)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Tie GSAP to Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. High-Fidelity Custom Cursor logic
    const handleMouseMove = (e) => {
      // Primary dot is instant
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });
      // Secondary aura follows smoothly
      gsap.to(cursorFollowerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="font-body antialiased selection:bg-primary-container selection:text-on-primary-fixed bg-background text-on-surface relative cursor-none">
      
      {/* Dynamic Cursor Elements */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      ></div>
      <div 
        ref={cursorFollowerRef} 
        className="fixed top-0 left-0 w-12 h-12 border border-primary/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center transition-transform duration-300 ease-out"
        id="cursor-aura"
      >
         <div className="w-1 h-1 bg-primary/20 rounded-full animate-ping"></div>
      </div>

      <SparkPhysicsEngine />
      <Navbar />
      <main className="min-h-screen pt-20 overflow-hidden">
        <Hero />
        <Fabrication />
        <SpecsTable />
      </main>
      <Footer />
    </div>
  );
}
