import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center justify-between text-xs font-semibold text-amber-200 mb-1.5">
        <span>Paso {currentStep} de {totalSteps}</span>
        <span className="text-yellow-300 font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-amber-950/60 h-2.5 rounded-full overflow-hidden shadow-inner border border-amber-800/40">
        <div 
          className="bg-gradient-to-r from-[#FACC15] via-[#F97316] to-[#10B981] h-full transition-all duration-500 ease-out rounded-full shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
