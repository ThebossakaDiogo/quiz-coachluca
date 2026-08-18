import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center justify-between text-xs font-bold text-[#4A154B] mb-1.5 font-heading">
        <span>Paso {currentStep} de {totalSteps}</span>
        <span className="text-[#E63988] font-extrabold">{percentage}%</span>
      </div>
      <div className="w-full bg-[#F0DCEB] h-2.5 rounded-full overflow-hidden shadow-inner p-0.5">
        <div 
          className="bg-gradient-to-r from-[#FF7051] via-[#E63988] to-[#10B981] h-full transition-all duration-500 ease-out rounded-full shadow-xs"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
