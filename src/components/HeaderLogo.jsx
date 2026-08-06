import React from 'react';

export default function HeaderLogo() {
  return (
    <div className="flex items-center justify-center gap-3 py-1.5 select-none font-heading text-center">
      {/* PGB Emblem Icon */}
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#5B163A] flex items-center justify-center shadow-md p-1.5 border border-[#FF3D7F]/30 shrink-0">
        <img src="/assets/favicon.svg" alt="Protocolo Glúteos Brasileños" className="w-full h-full object-contain" />
      </div>

      {/* 3-line Official Logo Structure */}
      <div className="flex flex-col items-start leading-none text-left">
        <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.25em] text-[#5B163A] uppercase">
          PROTOCOLO
        </span>
        <span className="text-base sm:text-lg font-black tracking-tight text-[#FF3D7F] uppercase font-heading">
          GLÚTEOS BRASILEÑOS
        </span>
        <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#5F525A] italic">
          by Coach Luca
        </span>
      </div>
    </div>
  );
}
