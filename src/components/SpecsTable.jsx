import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpecsTable() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".spec-row", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        x: -50,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-surface-container-lowest px-8 relative z-20">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-headline text-4xl uppercase font-black tracking-tight text-on-surface">SPECIFICATIONS</h2>
          <span className="material-symbols-outlined text-primary-container">straighten</span>
        </div>
        
        <div className="w-full border border-outline-variant">
          <div className="grid grid-cols-2 border-b border-outline-variant bg-surface-container-high font-headline uppercase text-sm font-bold text-secondary">
            <div className="p-4 border-r border-outline-variant">PARAMETER</div>
            <div className="p-4">VALUE</div>
          </div>
          
          {[
            { label: 'MATERIAL', value: 'Aluminum Alloy 6061-T6' },
            { label: 'YIELD STRENGTH', value: '276 MPa' },
            { label: 'FINISH', value: 'Hard Anodized / Type III' },
            { label: 'MASS', value: '14.2 KG', highlighted: true }
          ].map((spec, i) => (
            <div key={i} className={`spec-row grid grid-cols-2 font-body text-sm text-on-surface bg-surface hover:bg-surface-container transition-colors ${i !== 3 ? 'border-b border-outline-variant' : ''}`}>
              <div className="p-4 border-r border-outline-variant text-secondary">{spec.label}</div>
              <div className={`p-4 ${spec.highlighted ? 'text-primary-container font-bold' : ''}`}>{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
