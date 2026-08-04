import React from 'react';
import { Sparkles, ShieldCheck, ArrowLeft, Check, Activity } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AgeStep({ stepData, onSelectOption, onPrevStep, selectedValue, currentStep, totalSteps }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#0F172A] py-5 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      {/* Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#06B6D4]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#A855F7]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* DIAGNOSTIC MYSTERY BANNER */}
        <div className="bg-gradient-to-r from-purple-950/90 via-slate-900/90 to-teal-950/90 text-white rounded-2xl p-2.5 px-3 shadow-lg flex items-center justify-between text-xs font-semibold border border-cyan-500/40 backdrop-blur-md">
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs text-purple-100">Analisando taxa de resposta muscular e metabólica...</span>
          </span>
          <span className="bg-[#06B6D4] text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wide">Passo {currentStep}/{totalSteps}</span>
        </div>

        {/* Main Card */}
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

          {/* AGE CARDS GRID */}
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            {stepData.options.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelectOption(opt.value)}
                  className={`group relative flex flex-col items-center p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 bg-white shadow-sm hover:border-[#0D9488] hover:shadow-xl active:scale-[0.98] cursor-pointer overflow-hidden ${
                    isSelected 
                      ? 'border-[#0D9488] ring-2 ring-[#0D9488]/40 bg-gradient-to-b from-purple-50 via-teal-50/60 to-purple-50 shadow-lg scale-[1.01]' 
                      : 'border-slate-200/90 hover:bg-slate-50/80'
                  }`}
                >
                  {/* Selected Checkmark Badge */}
                  <div className={`absolute top-2 right-2 z-20 w-6.5 h-6.5 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? 'bg-gradient-to-r from-[#7C3AED] to-[#0D9488] text-white font-black shadow-md scale-110' : 'bg-white/80 text-transparent border border-slate-200 shadow-sm'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>

                  {/* FULL-FRAME IMAGE DISPLAY */}
                  <div className="w-full h-40 sm:h-48 mb-2 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 via-teal-50/60 to-purple-50 flex items-center justify-center border border-purple-200/70 shadow-inner relative">
                    <img 
                      src={opt.image} 
                      alt={opt.label}
                      className="w-full h-full object-cover object-top scale-105 group-hover:scale-112 transition-transform duration-300 drop-shadow-md"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-purple-950/30 to-transparent pointer-events-none" />
                  </div>

                  <span className={`text-xs sm:text-sm font-bold text-center leading-tight py-0.5 ${isSelected ? 'text-purple-950' : 'text-slate-900'}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Resposta confidencial para o seu diagnóstico</span>
          </div>

        </div>
      </div>
    </div>
  );
}
