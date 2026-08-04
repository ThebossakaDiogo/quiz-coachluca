import React, { useState } from 'react';
import { ChevronRight, Check, Sparkles, ShieldCheck, ArrowLeft, Zap, Flame, Trophy, Activity } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function QuizCard({ stepData, onSelectOption, onPrevStep, selectedValue, currentStep, totalSteps }) {
  const [clickedOption, setClickedOption] = useState(null);
  const percentage = Math.round((currentStep / totalSteps) * 100);

  const getMotivationalBadge = () => {
    if (currentStep <= 3) {
      return { icon: <Sparkles className="w-4 h-4 text-purple-600" />, text: `Passo ${currentStep} de ${totalSteps} • Avaliação Rápida (45s)` };
    } else if (currentStep <= 7) {
      return { icon: <Flame className="w-4 h-4 text-teal-500 fill-teal-500" />, text: `Excelente progresso! • Passo ${currentStep} de ${totalSteps}` };
    } else if (currentStep <= 10) {
      return { icon: <Zap className="w-4 h-4 text-cyan-500 fill-cyan-500" />, text: `⚡ Quase lá • Passo ${currentStep} de ${totalSteps}` };
    } else {
      return { icon: <Trophy className="w-4 h-4 text-[#7C3AED] fill-[#7C3AED]" />, text: `🏆 ÚLTIMA PERGUNTA • Diagnóstico Quase Pronto` };
    }
  };

  const handleOptionClick = (val) => {
    setClickedOption(val);
    setTimeout(() => {
      onSelectOption(val);
      setClickedOption(null);
    }, 140);
  };

  const badgeInfo = getMotivationalBadge();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#0F172A] py-5 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      {/* Dynamic Background Lights (Cyan & Purple Blurs) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#06B6D4]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A855F7]/25 rounded-full blur-3xl pointer-events-none" />

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

        {/* Main White Card Container */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] p-5 sm:p-7 shadow-2xl border border-purple-100/90 animate-pop space-y-5 quiz-card">
          
          {/* Eyebrow & Progress Header with Back Arrow */}
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
                  {badgeInfo.icon}
                  <span>{badgeInfo.text}</span>
                </span>
              </div>
              <span className="font-extrabold text-purple-950 bg-purple-100 px-2.5 py-1 rounded-xl border border-purple-300 shadow-sm text-xs">{percentage}%</span>
            </div>

            {/* Dynamic Animated Progress Bar */}
            <div className="h-2.5 w-full bg-purple-100 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#7C3AED] via-[#0D9488] to-[#06B6D4] rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* STEP QUESTION HEADLINE */}
          <div className="text-center space-y-1.5 pt-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-snug tracking-tight font-outfit">
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
                  className={`w-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 text-left active:scale-[0.98] cursor-pointer ${
                    isSelected
                      ? 'border-[#0D9488] bg-gradient-to-r from-purple-50 via-teal-50/80 to-cyan-50 text-purple-950 shadow-md ring-2 ring-[#0D9488]/40 scale-[1.01]'
                      : 'border-slate-200/90 bg-white hover:border-[#0D9488] text-slate-900 shadow-sm hover:shadow-md hover:bg-teal-50/40'
                  }`}
                >
                  {/* Emoji Badge Box */}
                  {opt.emoji && (
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl sm:text-3xl shadow-inner border transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-tr from-purple-200 to-cyan-200 border-teal-300 scale-105' 
                        : 'bg-purple-50/90 border-purple-200/70'
                    }`}>
                      {opt.emoji}
                    </div>
                  )}

                  {/* Answer Text */}
                  <span className="font-bold text-xs sm:text-sm sm:text-base leading-snug flex-1 text-slate-900">
                    {opt.label}
                  </span>

                  {/* Indicator Radio / Checkmark Badge */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#0D9488] text-white font-black shadow-md scale-110' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Trust Badge / Confidential Footnote */}
          <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Avaliação privada e 100% personalizada</span>
          </div>

        </div>

        {/* Footer Guarantee Subtext */}
        <p className="text-center text-xs font-semibold text-purple-100 drop-shadow">
          🔒 Sem custo de consulta • Plano personalizado em casa
        </p>

      </div>
    </div>
  );
}
