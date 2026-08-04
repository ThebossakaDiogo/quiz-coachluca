import React from 'react';
import { Flame, ShieldAlert } from 'lucide-react';
import ProgressBar from './ProgressBar';

export default function Header({ currentStep, totalSteps, isFinished }) {
  return (
    <header className="sticky top-0 z-50 bg-[#12131C]/95 backdrop-blur-md border-b border-purple-900/40 shadow-md text-white">
      {/* Top Urgent Notice Banner */}
      <div className="bg-teal-950/80 border-b border-teal-500/30 text-[11px] font-semibold text-teal-300 text-center py-1.5 px-3 flex items-center justify-center gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
        <span>Nota: Apenas 1 acesso gratuito por pessoa — Hoje</span>
      </div>

      <div className="max-w-md mx-auto py-2.5 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-teal-400">
            <Flame className="w-5 h-5 fill-teal-400" />
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight">
            FitFlow<span className="text-teal-400">28D</span>
          </span>
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-purple-900/60 text-cyan-300 border border-purple-500/40">
          Plano 28 Dias
        </div>
      </div>

      {!isFinished && currentStep > 0 && (
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      )}
    </header>
  );
}
