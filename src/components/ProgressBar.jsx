import React from 'react';

export default function ProgressBar({ currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center justify-between text-xs font-bold text-[#5B163A] mb-1.5 font-heading">
        <span>Paso {currentStep} de {totalSteps}</span>
        <span className="text-[#FF3D7F] font-extrabold">{percentage}%</span>
      </div>
      <div className="w-full bg-[#F0E3E9] h-2.5 rounded-full overflow-hidden shadow-inner border border-[#DFC9D3]">
        <div 
          className="bg-gradient-to-r from-[#FF3D7F] via-[#D92667] to-[#32B768] h-full transition-all duration-500 ease-out rounded-full shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
