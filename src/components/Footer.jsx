import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-6 px-8 flex justify-between items-center border-t border-neutral-800/30 bg-[#131313] dark:bg-neutral-950 bg-neutral-950/80 backdrop-blur-md relative z-20">
      <div className="font-headline font-bold text-neutral-400">OFFSIDE WORKS</div>
      <div className="font-body text-[10px] tracking-widest uppercase text-neutral-500">© 2024 OFFSIDE WORKS. ALL SYSTEMS OPERATIONAL.</div>
      <ul className="flex space-x-6 font-body text-[10px] tracking-widest uppercase">
        <li><a className="text-neutral-600 hover:text-white transition-colors" href="#">TERMINAL</a></li>
        <li><a className="text-neutral-600 hover:text-white transition-colors" href="#">SAFETY</a></li>
        <li><a className="text-neutral-600 hover:text-white transition-colors" href="#">API</a></li>
      </ul>
    </footer>
  );
}
