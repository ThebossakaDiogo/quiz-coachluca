import React from 'react';
import { ShieldAlert } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function Header({ currentStep, totalSteps, isFinished }) {
  return (
    <header className="sticky top-0 z-50 bg-[#064E3B]/95 backdrop-blur-md border-b border-amber-500/30 shadow-md text-white">
      {/* Top Urgent Notice Banner */}
      <div className="bg-amber-950/80 border-b border-amber-500/30 text-[11px] font-semibold text-amber-300 text-center py-1.5 px-3 flex items-center justify-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-400" />
        <span>Nota: Solo 1 acceso gratuito por persona — Hoy</span>
      </div>

      <div className="max-w-md mx-auto py-2.5 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center p-1 border border-amber-400/40">
            <img src="/assets/peach-logo.svg" alt="Peach Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-white text-base sm:text-lg tracking-tight">
            Glúteos<span className="text-amber-400">Brasileños</span>
          </span>
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40">
          Plan 28 Días
        </div>
      </div>

      {!isFinished && currentStep > 0 && (
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      )}
    </header>
  );
}
