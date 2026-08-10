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
          <img 
            src="/assets/LOGO3-WGBt60gj.webp" 
            alt="Protocolo Glúteos Brasileños" 
            className="h-8 sm:h-9 w-auto max-w-[140px] sm:max-w-[170px] object-contain" 
          />
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
