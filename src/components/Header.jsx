import React from 'react';
import { ShieldCheck, Flame } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function Header({ currentStep, totalSteps, isFinished }) {
  return (
    <header className="sticky top-0 z-50 bg-[#FFF9F6]/92 backdrop-blur-lg border-b border-[#DFC9D3]/60 shadow-sm text-[#171116]">
      {/* Top Announcement Bar from Schema */}
      <div className="bg-[#320C22] text-white text-[11px] font-semibold text-center py-1.5 px-3 flex items-center justify-center gap-1.5">
        <Flame className="w-3.5 h-3.5 text-[#FF8EBA] animate-pulse" />
        <span>🔥 Oferta especial disponible por tiempo limitado</span>
      </div>

      <div className="max-w-md mx-auto py-2 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#5B163A] flex items-center justify-center p-1 border border-[#FF3D7F]/30 shrink-0">
            <img src="/assets/favicon.svg" alt="PGB Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-[#171116] text-sm sm:text-base tracking-tight font-heading uppercase">
              PROTOCOLO <span className="text-[#FF3D7F]">PGB</span>
            </span>
            <span className="text-[9px] font-bold text-[#5F525A]">by Coach Luca</span>
          </div>
        </div>

        <div className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFE1EC] text-[#B71F58] border border-[#FF8EBA]/40 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-[#FF3D7F]" />
          <span>Acceso 100% Seguro</span>
        </div>
      </div>

      {!isFinished && currentStep > 0 && (
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      )}
    </header>
  );
}
