import React from 'react';
import { Sparkles, ShieldCheck, ArrowLeft, Check } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AgeStep({ stepData, onSelectOption, onPrevStep, selectedValue, currentStep, totalSteps }) {
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

          {/* SYMMETRICAL AGE CARDS GRID */}
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            {stepData.options.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelectOption(opt.value)}
                  className={`group relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200 bg-white cursor-pointer overflow-hidden ${
                    isSelected 
                      ? 'border-[#0D9488] bg-teal-50/90 ring-2 ring-[#0D9488]/20 shadow-md text-[#0F766E]' 
                      : 'border-slate-200/80 hover:border-[#0D9488]/60 hover:bg-teal-50/40 text-slate-900 shadow-sm'
                  }`}
                >
                  {/* Selected Checkmark Badge */}
                  <div className={`absolute top-2 right-2 z-20 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#0D9488] text-white' : 'bg-slate-50 border border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  {/* FULL-FRAME IMAGE DISPLAY */}
                  <div className="w-full h-36 sm:h-44 mb-2 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center relative border border-slate-200/60">
                    <img 
                      src={opt.image} 
                      alt={opt.label}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <span className="text-xs sm:text-sm font-semibold text-center leading-tight py-0.5">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#E11D48]" />
            <span>Respuesta confidencial para tu diagnóstico</span>
          </div>

        </div>
      </div>
    </div>
  );
}
