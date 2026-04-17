import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, ContactShadows } from '@react-three/drei';
import { gsap } from 'gsap';

function AbstractMachinedPart({ wireframeMode = false }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.5;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      groupRef.current.position.y = Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <icosahedronGeometry args={[2.5, 0]} />
        {wireframeMode ? (
          <meshBasicMaterial color="#ffffff" wireframe />
        ) : (
          <MeshTransmissionMaterial 
            backside 
            samples={4} 
            thickness={1.5} 
            chromaticAberration={0.05} 
            anisotropy={0.1} 
            distortion={0.1} 
            distortionScale={0.3} 
            temporalDistortion={0.1} 
            iridescence={1} 
            iridescenceIOR={1} 
            iridescenceThicknessRange={[0, 1400]} 
            color="#ffb59e"
          />
        )}
        {!wireframeMode && (
          <mesh scale={0.9}>
            <icosahedronGeometry args={[2.5, 0]} />
            <meshBasicMaterial color="#ff5719" wireframe />
          </mesh>
        )}
      </mesh>
    </group>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [maskPos, setMaskPos] = useState({ x: -1000, y: -1000 });
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero 3D container fade-in
      gsap.to('.hero-3d-animate', { opacity: 1, duration: 1, delay: 0.2 });

      // Laser Etched Reveal for H1
      gsap.set('.laser-text', { clipPath: 'inset(0% 100% 0% 0%)', opacity: 1 });
      gsap.set('.laser-burner', { left: '0%', opacity: 0 });
      gsap.set('.hero-sub-element', { opacity: 0, y: 20 });

      gsap.to('.laser-burner', {
        opacity: 1,
        duration: 0.1,
        delay: 0.5
      });
      gsap.to('.laser-text', {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.5
      });
      gsap.to('.laser-burner', {
        left: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.5,
        onComplete: () => {
          gsap.to('.laser-burner', { opacity: 0, duration: 0.2 });
        }
      });

      // Fade in rest of hero content
      gsap.to('.hero-sub-element', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 2,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMaskPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMaskPos({ x: -1000, y: -1000 });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[921px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-surface to-surface-container-high opacity-50 z-0"></div>
      <div className="container mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center h-full">
        
        {/* Left Column: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-6 hero-text-animate relative">
          <div className="hero-sub-element flex items-center gap-2 text-primary font-label text-sm uppercase tracking-widest bg-surface-container-low px-3 py-1 ghost-border">
            <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
            <span>Surat, Gujarat Facility</span>
          </div>

          <div className="relative inline-block laser-reveal-container pt-2">
            <h1 className="laser-text font-headline text-7xl md:text-9xl uppercase font-black tracking-machined leading-none text-on-surface">
              DIGITAL<br/>
              <span className="text-primary-container text-glow">FORGE</span>
            </h1>
            {/* The laser burning edge */}
            <div className="laser-burner absolute top-0 bottom-0 w-1 bg-primary-container shadow-[0_0_30px_5px_#ff5719] z-10 mix-blend-screen rounded-full" />
          </div>

          <p className="hero-sub-element font-body text-on-surface-variant max-w-md text-lg">
            Precision metal fabrication meets computational design. Unyielding structural integrity engineered in high-grade aluminum.
          </p>
          
          <div className="hero-sub-element flex gap-4 mt-8">
            <button className="bg-primary-container text-on-primary-fixed px-8 py-4 font-headline uppercase tracking-tight font-bold hover:bg-primary transition-colors duration-200 ease-out flex items-center gap-2 relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <span>COMMENCE BUILD</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </span>
            </button>
            <button className="bg-surface-container-highest text-primary px-8 py-4 font-headline uppercase tracking-tight font-bold hover:bg-surface-container-low transition-colors duration-200 ease-out ghost-border flex items-center gap-2">
              <span className="material-symbols-outlined">download</span>
              <span>SCHEMATICS</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Model with Blueprint X-Ray */}
        <div 
          className="w-full md:w-1/2 h-[600px] relative flex items-center justify-center mt-12 md:mt-0 opacity-0 hero-3d-animate"
        >
          <div 
            className="absolute w-full h-full bg-surface-container-lowest ghost-border flex flex-col items-center justify-center overflow-hidden cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Base Canvas */}
            <div className="w-full h-full relative z-10">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <AbstractMachinedPart />
                <Environment preset="city" />
                <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
              </Canvas>
            </div>

            {/* X-Ray Canvas */}
            <div 
              className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none transition-opacity duration-200"
              style={{
                clipPath: `circle(120px at ${maskPos.x}px ${maskPos.y}px)`,
                backgroundColor: 'rgba(0, 50, 150, 0.4)', // Blueprint background
              }}
            >
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <AbstractMachinedPart wireframeMode={true} />
              </Canvas>
              {/* Blueprint Grid Overlay */}
              <div 
                className="absolute inset-0 z-30 opacity-30 mix-blend-screen pointer-events-none w-full h-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              />
            </div>

            <div className="absolute top-4 left-4 font-label text-xs text-primary-container tracking-widest uppercase pointer-events-none z-30">
                OBJ: ABSTRACT_CORE_V1<br/>
                MAT: AL_6061-T6 (TRANSMISSIVE)
            </div>
            <div className="absolute bottom-4 right-4 font-label text-xs text-secondary tracking-widest uppercase text-right pointer-events-none z-30">
                ROT: DYNAMIC<br/>
                TOLERANCE: ±0.001mm
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-primary-container opacity-50 shadow-[0_0_15px_#ff5719] pointer-events-none z-30"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
