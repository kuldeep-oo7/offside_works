import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const clinkSoundRef = useRef(null);

  useEffect(() => {
    clinkSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    clinkSoundRef.current.preload = 'auto';

    const interactables = document.querySelectorAll('.nav-interactable');
    
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (clinkSoundRef.current) {
          clinkSoundRef.current.currentTime = 0;
          clinkSoundRef.current.volume = 0.2;
          clinkSoundRef.current.play().catch(() => {});
        }
      });
    });

    return () => {
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', () => {});
      });
    };
  }, []);

  return (
    <>
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <filter id="orange-glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </svg>
      <nav className="flex justify-between items-center w-full px-8 h-20 fixed top-0 z-50 bg-[#131313] dark:bg-neutral-950 bg-neutral-900/50 backdrop-blur-xl border-b border-surface-container-high">
        <div className="text-2xl font-black text-[#FF4E00] tracking-tighter" style={{ filter: 'url(#orange-glow)' }}>OFFSIDE WORKS</div>
        <ul className="flex space-x-8 font-headline uppercase tracking-tighter font-bold">
          <li><a className="nav-interactable text-[#FF4E00] border-b-2 border-[#FF4E00] pb-1" href="#">FORGE</a></li>
          <li><a className="nav-interactable text-neutral-500 hover:text-[#FF4E00] hover:bg-surface-container-high transition-all duration-200 ease-out p-2" href="#">BLUEPRINTS</a></li>
          <li><a className="nav-interactable text-neutral-500 hover:text-[#FF4E00] hover:bg-surface-container-high transition-all duration-200 ease-out p-2" href="#">INVENTORY</a></li>
          <li><a className="nav-interactable text-neutral-500 hover:text-[#FF4E00] hover:bg-surface-container-high transition-all duration-200 ease-out p-2" href="#">SPECS</a></li>
        </ul>
        <button className="nav-interactable bg-primary-container text-on-primary-fixed px-6 py-2 font-headline uppercase tracking-tighter font-bold hover:bg-primary transition-colors duration-200 ease-out" style={{ filter: 'url(#orange-glow)' }}>INITIALIZE</button>
      </nav>
    </>
  );
}
