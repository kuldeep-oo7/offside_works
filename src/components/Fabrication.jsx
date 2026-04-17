import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Fabrication() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".fab-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "back.out(2)"
      });

      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        opacity: 0,
        y: 150,
        scale: 0.9,
        stagger: 0.15,
        duration: 1.2,
        ease: "back.out(1.7)"
      });
      
      gsap.from(".image-block", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 1.2,
        ease: "back.out(1.5)"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-surface px-8 border-t-4 border-surface-container-highest relative z-20">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-16 fab-header">
          <h2 className="font-headline text-5xl uppercase font-black tracking-tight text-on-surface">FABRICATION</h2>
          <div className="h-1 flex-grow bg-surface-container-high"></div>
          <span className="font-label text-secondary tracking-widest uppercase text-sm">PHASE 01</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="service-card bg-surface-container-low p-8 ghost-border relative group hover:bg-surface-container transition-colors duration-300">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-primary-container opacity-50 group-hover:opacity-100 transition-opacity">architecture</span>
            </div>
            <h3 className="font-headline text-2xl uppercase font-bold text-on-surface mb-4">Laser Precision</h3>
            <p className="font-body text-secondary text-sm">Tolerance levels strictly adhered to ±0.01mm. Every cut is calculated, executed, and verified.</p>
            <div className="mt-8 border-t border-outline-variant pt-4 flex justify-between items-center text-xs text-primary font-label uppercase">
              <span>STATUS:</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary-container block"></span> ONLINE</span>
            </div>
          </div>
          
          {/* Feature Card 2 */}
          <div className="service-card bg-surface-container-low p-8 ghost-border relative group hover:bg-surface-container transition-colors duration-300 transform md:translate-y-12">
            <div className="absolute top-0 right-0 p-4">
              <span className="material-symbols-outlined text-primary-container opacity-50 group-hover:opacity-100 transition-opacity">memory</span>
            </div>
            <h3 className="font-headline text-2xl uppercase font-bold text-on-surface mb-4">CNC Milling</h3>
            <p className="font-body text-secondary text-sm">Multi-axis automated removal of raw material. High-speed spindle operations for aggressive surface finishing.</p>
            <div className="mt-8 border-t border-outline-variant pt-4 flex justify-between items-center text-xs text-primary font-label uppercase">
              <span>TOOLPATH:</span>
              <span>OPTIMIZED</span>
            </div>
          </div>
          
          {/* Image Block */}
          <div className="image-block h-full min-h-[300px] bg-surface-container-lowest ghost-border relative overflow-hidden group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG-YIQnd277u7EGB0YK4H4rINtOYRXcaKdbksUZgyRns5_SDhQeIR4ZMsN8qm-iDAqXa27mLOiQAim8hmWi2TH5asNT1jtMOH4XnqHNSrUDlzIjHMQYBkJ5Z44HaRbyQmr7hYcz_4H8buoPFqJBRLusmhNHqTNVN068Bgby4QnngXKcnVCml5XL4z15Jo-yaodn7iBMSwUTJDzIZwO-D7rK64NYRtlNRGW4j3IUCsYYp0k5dp9Qg2T6X928bFM07Pnm4CVN-gOF_EG" 
              alt="Industrial Welding sparks" 
              className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:opacity-80 transition-opacity duration-300 spark-image" 
            />
            <div className="absolute bottom-0 left-0 w-full p-4 machined-glass border-t border-outline-variant">
              <div className="font-label text-xs text-on-surface tracking-widest uppercase">SYS.OVERRIDE // WELD_SPARK_EMITTER</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
