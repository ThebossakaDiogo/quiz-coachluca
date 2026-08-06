import React from 'react';

export default function HeaderLogo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 text-center py-2 select-none font-nunito">
      {/* Modern Rounded Nunito Logo */}
      <div className="inline-flex items-center gap-2">
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-emerald-500 flex items-center justify-center shadow-md shadow-amber-500/30 p-1 border border-amber-300/40">
          <img src="/assets/peach-logo.svg" alt="Método Glúteos Brasileños Logo" className="w-full h-full object-contain drop-shadow" />
        </div>
        <h1 className="font-nunito text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md leading-none">
          Método <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 font-extrabold">Glúteos Brasileños</span>
        </h1>
      </div>
      
      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-amber-200/90 pt-0.5">
        COACH LUCA
      </p>
      
      {/* Subtle Underline Glow Accent */}
      <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full mt-1 opacity-80" />
    </div>
  );
}
