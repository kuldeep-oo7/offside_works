import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 150;

function Sparks() {
  const meshRef = useRef();
  
  // Instance matrices and velocities
  const [dummy] = useMemo(() => [new THREE.Object3D()], []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
        const t = Math.random() * 100;
        const speed = 0.05 + Math.random() * 0.1; // Faster baseline sparks
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 50;
        const vx = (Math.random() - 0.5) * 0.02;
        const vy = -speed;
        const vz = (Math.random() - 0.5) * 0.02;
        temp.push({ t, factor: Math.random(), speed, x, y, z, vx, vy, vz });
    }
    return temp;
  }, []);

  let lastScrollY = window.scrollY;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const scrollY = window.scrollY;
    // Boost effect
    const velocityY = (scrollY - lastScrollY) * 1.5; 
    lastScrollY = scrollY;
    
    particles.forEach((particle, i) => {
      let { speed, x, y, z, vx, vy, vz } = particle;

      // React dynamically to scroll velocity - massive WOW boost
      if (Math.abs(velocityY) > 0) {
        vy -= velocityY * 0.008;
        vx += (Math.random() - 0.5) * velocityY * 0.02;
      } else {
        vy *= 0.95; // dampening back to normal
        if(vy > -speed) vy = -speed;
      }
      
      y += vy;
      x += vx;
      z += vz;

      // Aggressive Bounce algorithm
      if (y < -20) {
        y = -20;
        vy = -vy * 0.8; // higher energy retention
        if(Math.abs(vy) < 0.2) {
            // Respawn
            y = 25 + Math.random() * 10;
            vy = -speed;
            x = (Math.random() - 0.5) * 50;
            z = (Math.random() - 0.5) * 50;
        }
      }

      particle.y = y;
      particle.x = x;
      particle.vy = vy;
      particle.vx = vx;
      
      dummy.position.set(x, y, z);
      
      // Much more noticeable scaling when moving fast
      const scale = Math.max(0.2, 1 + Math.abs(vy) * 4);
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
      {/* Lower poly, bigger base size */}
      <sphereGeometry args={[0.15, 6, 6]} />
      <meshBasicMaterial color="#ff5719" />
    </instancedMesh>
  );
}

export default function SparkPhysicsEngine() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none" style={{ mixBlendMode: 'screen', opacity: 0.8 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Sparks />
      </Canvas>
    </div>
  );
}
