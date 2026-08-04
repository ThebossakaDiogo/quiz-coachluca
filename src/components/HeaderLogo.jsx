import React from 'react';
import { Flame } from 'lucide-react';

export default function HeaderLogo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 text-center py-2 select-none font-nunito">
      {/* Modern Rounded Nunito Logo */}
      <div className="inline-flex items-center gap-2">
        <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-purple-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/30">
          <Flame className="w-5 h-5 text-slate-950 fill-slate-950" />
        </div>
        <h1 className="font-nunito text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md leading-none">
          FitFlow <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-teal-300 to-purple-300 font-extrabold">Método 28D</span>
        </h1>
      </div>
      
      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-cyan-200/90 pt-0.5">
        COACH LUCA
      </p>
      
      {/* Subtle Underline Glow Accent */}
      <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full mt-1 opacity-80" />
    </div>
  );
}
