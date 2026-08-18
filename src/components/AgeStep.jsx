import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ArrowLeft, Check, Bookmark } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AgeStep({ stepData, onSelectOption, onPrevStep, currentStep, totalSteps }) {
  const [clickedOption, setClickedOption] = useState(null);
  const percentage = Math.round((currentStep / totalSteps) * 100);

  const handleClick = (val) => {
    setClickedOption(val);
    setTimeout(() => {
      onSelectOption(val);
    }, 120);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#F6DBEE] via-[#F9EDF6] to-[#FCF5FA] py-5 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-[#1F121C]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* QUIZ TOP BAR */}
        <div className="flex items-center justify-between px-1">
          {onPrevStep ? (
            <button
              type="button"
              onClick={onPrevStep}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-[#F0DCEB] text-[#4A154B] flex items-center justify-center transition-all hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
              title="Volver a la pregunta anterior"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}

          <div className="text-center">
            <span className="font-heading font-extrabold text-sm sm:text-base text-[#4A154B] tracking-tight">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-[#F0DCEB] text-[#D8387D] flex items-center justify-center">
            <Bookmark className="w-4 h-4 fill-[#D8387D]/20 stroke-[2.2]" />
          </div>
        </div>

        {/* MAIN QUESTION CARD - GRADIENT MAGENTA BANNER */}
        <div className="relative rounded-[26px] p-6 sm:p-7 text-center text-white shadow-[0_16px_36px_-8px_rgba(216,56,125,0.35)] quiz-question-banner overflow-hidden animate-pop">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-2.5 shadow-xs font-heading">
            <Sparkles className="w-3 h-3 text-white fill-white" />
            <span>Calibración Biomecánica</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight font-heading drop-shadow-xs">
            {stepData.title}
          </h2>

          {stepData.subtitle && (
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md mx-auto font-medium pt-1.5 font-body">
              {stepData.subtitle}
            </p>
          )}
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 px-4 border border-[#F0DCEB] shadow-xs flex items-center gap-3">
          <span className="text-[11px] font-extrabold text-[#4A154B] uppercase tracking-wider font-heading shrink-0">
            Progreso
          </span>
          <div className="flex-1 h-2.5 bg-[#F0DCEB] rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#FF7051] via-[#E63988] to-[#D8387D] transition-all duration-300 rounded-full shadow-xs"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs font-extrabold text-[#D8387D] font-mono shrink-0">
            {percentage}%
          </span>
        </div>

        {/* SYMMETRICAL AGE CARDS GRID */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {stepData.options.map((opt) => {
            const isSelected = clickedOption === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleClick(opt.value)}
                className={`group relative flex flex-col items-center p-3 rounded-[24px] border-2 transition-all duration-200 bg-white cursor-pointer overflow-hidden active:scale-[0.98] ${
                  isSelected 
                    ? 'border-[#10B981] bg-[#ECFDF5] ring-2 ring-[#10B981]/25 shadow-md text-[#065F46]' 
                    : 'border-[#F0DCEB] hover:border-[#E63988] hover:shadow-md text-[#1F121C] shadow-sm'
                }`}
              >
                {/* Selected Checkmark Badge */}
                <div className={`absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-[#10B981] text-white shadow-xs' 
                    : 'bg-white/90 backdrop-blur-xs border-2 border-[#E2CEE0] group-hover:border-[#E63988]'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* FULL-FRAME IMAGE DISPLAY */}
                <div className="w-full h-36 sm:h-44 mb-2.5 rounded-2xl overflow-hidden bg-[#FDF4FA] flex items-center justify-center relative border border-[#F0DCEB]">
                  <img 
                    src={opt.image} 
                    alt={opt.label}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <span className="text-xs sm:text-sm font-black text-center leading-tight py-1 font-heading">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-xs font-medium text-[#968493]">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>Respuesta confidencial para tu diagnóstico</span>
        </div>

      </div>
    </div>
  );
}
