import React from 'react';
import { Sparkles, ShieldCheck, ArrowLeft, Check } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function GoalStep({ stepData, onSelectOption, onPrevStep, selectedValue, currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#59D6CF] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-100 animate-pop space-y-6 text-center">
          
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
                <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 font-semibold text-xs px-3.5 py-1 rounded-full border border-teal-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                  Paso {currentStep} de {totalSteps}
                </span>
              </div>
              <span className="font-bold text-[#0D9488] text-xs">{percentage}%</span>
            </div>

            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0D9488] transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Question Title & Subtitle */}
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {stepData.title}
            </h2>
            {stepData.subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-sm mx-auto">
                {stepData.subtitle}
              </p>
            )}
          </div>

          {/* SYMMETRICAL GOAL CARDS GRID */}
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            {stepData.options.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelectOption(opt.value)}
                  className={`relative flex flex-col items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 bg-white cursor-pointer ${
                    isSelected 
                      ? 'border-[#0D9488] bg-teal-50/90 ring-2 ring-[#0D9488]/20 shadow-md text-[#0F766E]' 
                      : 'border-slate-200/80 hover:border-[#0D9488]/60 hover:bg-teal-50/40 text-slate-900 shadow-sm'
                  }`}
                >
                  {/* Indicator Radio Badge */}
                  <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#0D9488] text-white' : 'border border-slate-300 bg-slate-50'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  {/* Emoji Box */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2.5 transition-all ${
                    isSelected ? 'bg-[#E11D48] text-white shadow-sm' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {opt.emoji}
                  </div>

                  <span className="text-xs sm:text-sm font-semibold leading-snug">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footnote */}
          <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
            <span>Configuración guardada para tu rutina personalizada</span>
          </div>

        </div>
      </div>
    </div>
  );
}
