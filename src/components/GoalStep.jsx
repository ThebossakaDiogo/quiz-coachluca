import React from 'react';
import { Sparkles, ShieldCheck, ArrowLeft, Check } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function GoalStep({ stepData, onSelectOption, onPrevStep, selectedValue, currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#0F172A] py-5 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      {/* Background Lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#06B6D4]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#A855F7]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        <div className="bg-white/95 backdrop-blur-2xl rounded-[36px] p-5 sm:p-7 shadow-2xl border border-purple-100/90 animate-pop space-y-5 quiz-card">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-purple-950">
              <div className="flex items-center gap-2">
                {onPrevStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="w-8 h-8 rounded-full bg-purple-100/90 hover:bg-purple-200 text-purple-950 flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer"
                    title="Voltar para a pergunta anterior"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
                <span className="bg-gradient-to-r from-purple-100 via-teal-50 to-purple-100 text-purple-950 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm font-bold text-[11px] sm:text-xs border border-purple-200">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  {stepData.eyebrow || `Passo ${currentStep} de ${totalSteps}`}
                </span>
              </div>
              <span className="font-extrabold text-purple-950 bg-purple-100 px-2.5 py-1 rounded-xl border border-purple-300 shadow-sm text-xs">{percentage}%</span>
            </div>

            <div className="h-2.5 w-full bg-purple-100 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#7C3AED] via-[#0D9488] to-[#06B6D4] rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="text-center space-y-1.5 pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug font-outfit">
              {stepData.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto font-medium">
              {stepData.subtitle}
            </p>
          </div>

          {/* GOAL CARDS GRID */}
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            {stepData.options.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelectOption(opt.value)}
                  className={`group relative flex flex-col items-center p-4.5 rounded-3xl border transition-all duration-200 bg-white shadow-sm hover:border-[#0D9488] hover:shadow-xl active:scale-[0.98] text-center cursor-pointer ${
                    isSelected 
                      ? 'border-[#0D9488] ring-2 ring-[#0D9488]/40 bg-gradient-to-b from-purple-50 via-teal-50/60 to-purple-50 shadow-lg scale-[1.01]' 
                      : 'border-slate-200/90 hover:bg-slate-50/80'
                  }`}
                >
                  {/* Checkmark indicator badge */}
                  <div className={`absolute top-2.5 right-2.5 w-6.5 h-6.5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-gradient-to-r from-[#7C3AED] to-[#0D9488] text-white font-black shadow-md scale-110' : 'bg-slate-100 text-transparent border border-slate-200'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>

                  {/* Emoji Box */}
                  <div className="text-4xl mb-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner border border-teal-200/70">
                    {opt.emoji}
                  </div>
                  <span className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? 'text-purple-950' : 'text-slate-900'}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Configuração salva para a sua rotina personalizada</span>
          </div>

        </div>
      </div>
    </div>
  );
}
