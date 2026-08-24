import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2 text-[#2B0B2E]">
      <div className="flex items-center justify-between text-xs font-black text-[#2B0B2E] mb-1.5 font-heading">
        <span>Paso {currentStep} de {totalSteps}</span>
        <span className="text-[#FF2A85] font-black">{percentage}%</span>
      </div>
      <div className="w-full bg-[#FAF0F6] border border-[#F0DCEB] h-2.5 rounded-full overflow-hidden shadow-inner p-0.5">
        <div 
          className="bg-gradient-to-r from-[#FF2A85] via-[#FFE600] to-[#10B981] h-full transition-all duration-500 ease-out rounded-full shadow-xs"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

