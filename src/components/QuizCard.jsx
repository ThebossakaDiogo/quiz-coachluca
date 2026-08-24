import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowLeft, Bookmark, Sparkles } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function QuizCard({ stepData, onSelectOption, onPrevStep, currentStep, totalSteps }) {
  const [clickedOption, setClickedOption] = useState(null);
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleOptionClick = (val) => {
    setClickedOption(val);
    setTimeout(() => {
      onSelectOption(val);
    }, 120);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-[#FAF0F6] to-[#F5EBF2] py-5 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-[#2B0B2E]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* QUIZ TOP BAR - MOBILE APP MODERN STYLE (LIGHT THEME) */}
        <div className="flex items-center justify-between px-1">
          {/* Back Button */}
          {onPrevStep ? (
            <button
              type="button"
              onClick={onPrevStep}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#F0DCEB] text-[#2B0B2E] flex items-center justify-center transition-all hover:bg-[#FFF5F9] hover:border-[#FF2A85] hover:scale-105 active:scale-95 cursor-pointer"
              title="Volver a la pregunta anterior"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}

          {/* Central Step Title */}
          <div className="text-center">
            <span className="font-heading font-black text-sm sm:text-base text-[#2B0B2E] tracking-tight">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          {/* Bookmark / Saved Badge */}
          <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#F0DCEB] text-[#FF2A85] flex items-center justify-center">
            <Bookmark className="w-4 h-4 fill-[#FF2A85]/20 stroke-[2.2]" />
          </div>
        </div>

        {/* MAIN QUESTION CARD - GRADIENT MAGENTA BANNER */}
        <div className="relative rounded-[26px] p-6 sm:p-7 text-center text-white shadow-[0_14px_32px_-6px_rgba(255,20,147,0.35)] quiz-question-banner overflow-hidden animate-pop">
          
          {/* Subtle Background Glow Spheres */}
          <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-white/20 blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-black/10 blur-xl pointer-events-none" />

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#FFE600] text-[#19041C] border-2 border-[#FFE600] text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-2.5 shadow-[2px_2px_0px_#FF2A85] font-heading">
            <Sparkles className="w-3 h-3 text-[#FF2A85] fill-[#19041C]" />
            <span>Protocolo Glúteos Brasileños</span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight font-heading drop-shadow-xs">
            {stepData.title}
          </h2>

          {/* Subtitle if available */}
          {stepData.subtitle && (
            <p className="text-xs sm:text-sm text-[#FFF4FA] leading-relaxed max-w-md mx-auto font-medium pt-1.5 font-body">
              {stepData.subtitle}
            </p>
          )}
        </div>

        {/* PROGRESS / TIME BAR INDICATOR */}
        <div className="bg-white rounded-2xl p-3 px-4 border border-[#F0DCEB] shadow-xs flex items-center gap-3">
          <span className="text-[11px] font-black text-[#6B5469] uppercase tracking-wider font-heading shrink-0">
            Progreso
          </span>
          
          <div className="flex-1 h-2.5 bg-[#FAF0F6] rounded-full overflow-hidden p-0.5 border border-[#F0DCEB]">
            <div 
              className="h-full bg-gradient-to-r from-[#FF2A85] via-[#FFE600] to-[#10B981] transition-all duration-300 rounded-full shadow-xs"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <span className="text-xs font-black text-[#FF2A85] font-mono shrink-0">
            {percentage}%
          </span>
        </div>

        {/* ELEGANT ANSWER OPTIONS (A, B, C, D) */}
        <div className="space-y-2.5 pt-1">
          {stepData.options.map((opt, idx) => {
            const isSelected = clickedOption === opt.value;
            const letter = optionLetters[idx] || `${idx + 1}`;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleOptionClick(opt.value)}
                className={`w-full flex items-center gap-3.5 p-4 sm:p-4.5 rounded-[22px] border-2 transition-all duration-200 text-left cursor-pointer group active:scale-[0.98] ${
                  isSelected
                    ? 'border-[#10B981] bg-[#ECFDF5] text-[#065F46] ring-2 ring-[#10B981]/30 shadow-md font-bold'
                    : 'border-[#EED4E4] bg-white hover:border-[#FF2A85] hover:bg-[#FFF8FB] hover:shadow-[0_6px_20px_rgba(255,42,133,0.12)] text-[#2B0B2E] shadow-sm'
                }`}
              >
                {/* Letter Index Badge (A, B, C, D) */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-black transition-all font-heading ${
                  isSelected 
                    ? 'bg-[#10B981] text-white shadow-xs' 
                    : 'bg-[#FAF2F7] text-[#FF2A85] border border-[#F0D0E2] group-hover:scale-105 group-hover:bg-[#FFE600] group-hover:text-[#19041C]'
                }`}>
                  {letter}
                </div>

                {/* Emoji Box if available */}
                {opt.emoji && (
                  <span className="text-2xl shrink-0">
                    {opt.emoji}
                  </span>
                )}

                {/* Answer Text */}
                <span className="font-bold text-xs sm:text-sm leading-snug flex-1 text-[#2B0B2E]">
                  {opt.label}
                </span>

                {/* Circular Radio / Checkmark Indicator */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isSelected 
                    ? 'bg-[#10B981] text-white shadow-xs' 
                    : 'border-2 border-[#EED4E4] bg-[#FAF2F7] group-hover:border-[#FF2A85]'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* BOTTOM ACTION PILLS / HELPER BANNER */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          <div className="bg-white rounded-xl p-2 text-center border border-[#F0DCEB] shadow-xs">
            <span className="text-[10px] font-black text-[#D97706] block uppercase font-heading">50/50</span>
            <span className="text-[8px] font-bold text-[#91798E] uppercase">Guía</span>
          </div>
          <div className="bg-white rounded-xl p-2 text-center border border-[#F0DCEB] shadow-xs">
            <span className="text-[10px] font-black text-[#FF2A85] block uppercase font-heading">Casa</span>
            <span className="text-[8px] font-bold text-[#91798E] uppercase">Sin Pesas</span>
          </div>
          <div className="bg-white rounded-xl p-2 text-center border border-[#F0DCEB] shadow-xs">
            <span className="text-[10px] font-black text-[#10B981] block uppercase font-heading">8 Min</span>
            <span className="text-[8px] font-bold text-[#91798E] uppercase">Día</span>
          </div>
          <div className="bg-white rounded-xl p-2 text-center border border-[#F0DCEB] shadow-xs">
            <span className="text-[10px] font-black text-[#2B0B2E] block uppercase font-heading">PGB 🇧🇷</span>
            <span className="text-[8px] font-bold text-[#91798E] uppercase">Oficial</span>
          </div>
        </div>

        {/* Trust Footnote */}
        <div className="text-center flex items-center justify-center gap-1.5 text-xs font-medium text-[#91798E] pt-1">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>Evaluación confidencial y 100% personalizada</span>
        </div>

      </div>
    </div>
  );
}

