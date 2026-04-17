import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Fabrication from './components/Fabrication';
import SpecsTable from './components/SpecsTable';
import Footer from './components/Footer';
import SparkPhysicsEngine from './components/SparkPhysicsEngine';

export default function App() {
  return (
    <div className="font-body antialiased selection:bg-primary-container selection:text-on-primary-fixed bg-background text-on-surface relative">
      <SparkPhysicsEngine />
      <Navbar />
      <main className="min-h-screen pt-20">
        <Hero />
        <Fabrication />
        <SpecsTable />
      </main>
      <Footer />
    </div>
  );
}
