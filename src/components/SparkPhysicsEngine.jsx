import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 1000;

function Sparks() {
  const meshRef = useRef();
  
  // Instance matrices and velocities
  const [dummy] = useMemo(() => [new THREE.Object3D()], []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
        const t = Math.random() * 100;
        const speed = 0.01 + Math.random() * 0.03;
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
    const scrollY = window.scrollY;
    const velocityY = scrollY - lastScrollY;
    lastScrollY = scrollY;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z, vx, vy, vz } = particle;

      // React to scroll velocity
      if (Math.abs(velocityY) > 0) {
        vy -= velocityY * 0.005;
        vx += (Math.random() - 0.5) * velocityY * 0.01;
      } else {
        vy *= 0.95; // dampening back to normal
        if(vy > -speed) vy = -speed;
      }
      
      // Update position
      y += vy;
      x += vx;
      z += vz;

      // Bounce algorithm (Virtual floor)
      if (y < -20) {
        y = -20;
        vy = -vy * 0.6; // bounce and lose energy
        if(Math.abs(vy) < 0.1) {
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
      
      // Create heat glow trail effect scaling
      const scale = Math.max(0.1, 0.5 + Math.abs(vy) * 2);
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, COUNT]}>
      <sphereGeometry args={[0.05, 8, 8]} />
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
