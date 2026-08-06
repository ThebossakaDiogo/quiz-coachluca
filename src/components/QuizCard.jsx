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
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#022C22] py-5 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Main White Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 animate-pop space-y-6 text-center">
          
          {/* Progress Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {onPrevStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer"
                    title="Volver a la pregunta anterior"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 font-semibold text-xs px-3.5 py-1 rounded-full border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
                  Paso {currentStep} de {totalSteps}
                </span>
              </div>
              <span className="font-bold text-[#16A34A] text-xs">{percentage}%</span>
            </div>

            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#16A34A] transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* STEP QUESTION HEADLINE */}
          <div className="space-y-1.5 pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight tracking-tight">
              {stepData.title}
            </h2>
            {stepData.subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto font-medium">
                {stepData.subtitle}
              </p>
            )}
          </div>

          {/* ELEGANT ANSWER OPTIONS */}
          <div className="space-y-3 pt-1">
            {stepData.options.map((opt) => {
              const isSelected = selectedValue === opt.value || clickedOption === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleOptionClick(opt.value)}
                  className={`w-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? 'border-[#16A34A] bg-emerald-50/80 text-[#15803D] ring-2 ring-[#16A34A]/20 shadow-md font-semibold'
                      : 'border-slate-200/80 bg-white hover:border-[#16A34A]/60 hover:bg-slate-50/60 text-slate-900 shadow-sm'
                  }`}
                >
                  {/* Emoji Box */}
                  {opt.emoji && (
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-2xl transition-all ${
                      isSelected ? 'bg-[#16A34A] text-white shadow-sm' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {opt.emoji}
                    </div>
                  )}

                  {/* Answer Text */}
                  <span className="font-semibold text-xs sm:text-sm sm:text-base leading-snug flex-1">
                    {opt.label}
                  </span>

                  {/* Indicator Checkmark Badge */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected 
                      ? 'bg-[#16A34A] text-white' 
                      : 'border border-slate-300 bg-slate-50 text-slate-400'
                  }`}>
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>Evaluación privada y 100% personalizada</span>
          </div>

        </div>

      </div>
    </div>
  );
}
