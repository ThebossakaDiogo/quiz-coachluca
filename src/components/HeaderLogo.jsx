import React from 'react';

export default function HeaderLogo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-1 text-center py-2 select-none font-nunito">
      {/* Modern Clean Header Logo */}
      <div className="inline-flex items-center gap-2">
        <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center shadow-md p-1 border border-teal-200">
          <img src="/assets/peach-logo.svg" alt="Brazilian Booty Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="font-nunito text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-sm leading-none">
          Brazilian Booty 🍑
        </h1>
      </div>
      
      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-teal-950 pt-0.5">
        COACH LUCA
      </p>
    </div>
  );
}
