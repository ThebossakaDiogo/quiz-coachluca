import React, { useState } from 'react';
import { ChevronRight, Check, Sparkles, ShieldCheck, ArrowLeft } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function QuizCard({ stepData, onSelectOption, onPrevStep, selectedValue, currentStep, totalSteps }) {
  const [clickedOption, setClickedOption] = useState(null);
  const percentage = Math.round((currentStep / totalSteps) * 100);

  const handleOptionClick = (val) => {
    setClickedOption(val);
    setTimeout(() => {
      onSelectOption(val);
      setClickedOption(null);
    }, 40);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FFF9F6] py-5 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Main White Card Container */}
        <div className="bg-white rounded-[24px] p-5 sm:p-7 shadow-xl border border-[#F0E3E9] animate-pop space-y-5 text-center quiz-card">
          
          {/* Progress Header */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-heading">
              <div className="flex items-center gap-2">
                {onPrevStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="w-8 h-8 rounded-full bg-[#FFF0F5] hover:bg-[#FFE1EC] text-[#5B163A] flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer border border-[#DFC9D3]"
                    title="Volver a la pregunta anterior"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
                <span className="inline-flex items-center gap-1.5 bg-[#FFE1EC] text-[#B71F58] font-bold text-xs px-3.5 py-1 rounded-full border border-[#FF8EBA]/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF3D7F]" />
                  Paso {currentStep} de {totalSteps}
                </span>
              </div>
              <span className="font-extrabold text-[#FF3D7F] text-xs">{percentage}%</span>
            </div>

            <div className="h-2 w-full bg-[#F0E3E9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF3D7F] to-[#D92667] transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* STEP QUESTION HEADLINE */}
          <div className="space-y-1.5 pt-1">
            <h2 className="text-xl sm:text-2xl font-black text-[#171116] leading-tight tracking-tight font-heading">
              {stepData.title}
            </h2>
            {stepData.subtitle && (
              <p className="text-xs sm:text-sm text-[#5F525A] leading-relaxed max-w-sm mx-auto font-medium">
                {stepData.subtitle}
              </p>
            )}
          </div>

          {/* ELEGANT ANSWER OPTIONS */}
          <div className="space-y-2.5 pt-1">
            {stepData.options.map((opt) => {
              const isSelected = selectedValue === opt.value || clickedOption === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleOptionClick(opt.value)}
                  className={`w-full flex items-center gap-3 p-3.5 sm:p-4 rounded-[14px] border-2 transition-all duration-200 text-left cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? 'border-[#FF3D7F] bg-[#FFF0F5] text-[#5B163A] ring-2 ring-[#FF3D7F]/20 shadow-md font-bold'
                      : 'border-[#F0E3E9] bg-white hover:border-[#FF3D7F]/50 hover:bg-[#FFF0F5]/50 text-[#171116] shadow-sm'
                  }`}
                >
                  {/* Emoji / Icon Box */}
                  {opt.emoji && (
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl transition-all ${
                      isSelected ? 'bg-[#FF3D7F] text-white shadow-sm' : 'bg-[#FFF0F5] text-[#5B163A]'
                    }`}>
                      {opt.emoji}
                    </div>
                  )}

                  {/* Answer Text */}
                  <span className="font-bold text-xs sm:text-sm leading-snug flex-1">
                    {opt.label}
                  </span>

                  {/* Indicator Checkmark Badge */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected 
                      ? 'bg-[#FF3D7F] text-white' 
                      : 'border border-[#DFC9D3] bg-[#FFF9F6] text-[#8C7D86]'
                  }`}>
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="pt-2 text-center border-t border-[#F0E3E9] flex items-center justify-center gap-1.5 text-xs font-medium text-[#8C7D86]">
            <ShieldCheck className="w-4 h-4 text-[#32B768]" />
            <span>Evaluación privada y 100% personalizada</span>
          </div>

        </div>

      </div>
    </div>
  );
}
