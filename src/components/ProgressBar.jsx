import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center justify-between text-xs font-semibold text-purple-200 mb-1.5">
        <span>Passo {currentStep} de {totalSteps}</span>
        <span className="text-cyan-300 font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-purple-950/60 h-2.5 rounded-full overflow-hidden shadow-inner border border-purple-800/40">
        <div 
          className="bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-400 h-full transition-all duration-500 ease-out rounded-full shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
