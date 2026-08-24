import React from 'react';
import { ChevronRight, CheckCircle2, Star, ArrowLeft, Trophy, Flame, Award, Bookmark } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function CoachStep({ stepData, onNext, onPrevStep, currentStep, totalSteps }) {
  const { coachInfo } = stepData;
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-[#FAF0F6] to-[#F5EBF2] py-5 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-[#2B0B2E]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* QUIZ TOP BAR */}
        <div className="flex items-center justify-between px-1">
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

          <div className="text-center">
            <span className="font-heading font-black text-sm sm:text-base text-[#2B0B2E] tracking-tight">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#F0DCEB] text-[#FF2A85] flex items-center justify-center">
            <Bookmark className="w-4 h-4 fill-[#FF2A85]/20 stroke-[2.2]" />
          </div>
        </div>

        {/* MAIN QUESTION CARD */}
        <div className="relative rounded-[26px] p-6 text-center text-white shadow-[0_14px_32px_-6px_rgba(255,20,147,0.35)] quiz-question-banner overflow-hidden animate-pop">
          <div className="inline-flex items-center gap-1.5 bg-[#FFE600] text-[#19041C] border-2 border-[#FFE600] text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-2.5 shadow-[2px_2px_0px_#FF2A85] font-heading">
            <Trophy className="w-3.5 h-3.5 text-[#FF2A85] fill-[#19041C]" />
            <span>Creador del Protocolo Glúteos Brasileños 🇧🇷</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight font-heading drop-shadow-xs">
            Conoce al Coach Luca
          </h2>
        </div>

        {/* MAIN WHITE CARD */}
        <div className="bg-white rounded-[26px] p-5 sm:p-6 shadow-xl border border-[#F0D2E4] space-y-4 text-center quiz-card animate-pop text-[#2B0B2E]">
          
          {/* PROGRESS BAR */}
          <div className="flex items-center gap-3">
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

          {/* CLEAN HIGH-RESOLUTION HERO PHOTO */}
          <div className="w-full rounded-2xl overflow-hidden border border-[#F0D2E4] shadow-sm bg-[#FAF2F7]">
            <img 
              src={coachInfo.mainImage} 
              alt="Coach Luca" 
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* PROFILE STATS */}
          <div className="bg-[#FAF2F7] rounded-[20px] p-4 border border-[#F0DCEB] space-y-3 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-black text-[#2B0B2E] flex items-center gap-1.5 font-heading">
                Coach Luca
                <CheckCircle2 className="w-5 h-5 text-[#FF2A85]" />
              </h3>
              <span className="bg-[#ECFDF5] text-[#059669] text-xs font-black px-3 py-1 rounded-full border border-[#10B981]/30 font-heading">
                Verificado ✓
              </span>
            </div>

            <p className="text-xs text-[#6B5469] font-medium leading-relaxed">
              🔬 Especialista en Biomecánica Glútea y Activación Neuromuscular
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-white border border-[#F0DCEB] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
                <Award className="w-5 h-5 text-[#FF2A85] shrink-0" />
                <div>
                  <span className="text-sm font-black text-[#2B0B2E] block leading-none font-heading">{coachInfo.experienceYears}</span>
                  <span className="text-[10px] text-[#91798E] font-bold uppercase font-heading">Experiencia</span>
                </div>
              </div>

              <div className="bg-white border border-[#F0DCEB] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
                <Flame className="w-5 h-5 text-[#059669] shrink-0" />
                <div>
                  <span className="text-sm font-black text-[#2B0B2E] block leading-none font-heading">{coachInfo.successCases}</span>
                  <span className="text-[10px] text-[#91798E] font-bold uppercase font-heading">Alumnas</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#F0DCEB] italic text-xs text-[#6B5469] font-medium">
              "{coachInfo.bio}"
            </div>
          </div>

          {/* BEFORE & AFTER GALLERY */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#2B0B2E] flex items-center justify-center gap-1.5 font-heading">
              <Star className="w-4 h-4 text-[#FFB800] fill-[#FFB800]" />
              <span>Resultados Reales de Alumnas (Antes y Después)</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {coachInfo.results.map((resImg, idx) => (
                <div key={`coach-res-${resImg}-${idx}`} className="rounded-xl overflow-hidden border border-[#F0DCEB] h-28 sm:h-36 shadow-xs bg-white">
                  <img 
                    src={resImg} 
                    alt={`Resultado ${idx + 1}`} 
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PRIMARY CTA BUTTON */}
          <button
            type="button"
            onClick={() => onNext("continuar")}
            className="w-full py-4 sm:py-5 px-6 rounded-[20px] bg-gradient-to-r from-[#FF2A85] via-[#FF007F] to-[#FF3377] hover:brightness-110 text-white font-black text-lg sm:text-xl shadow-[0_12px_28px_rgba(255,42,133,0.35)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
          >
            <span>CONTINUAR MI DIAGNÓSTICO</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

        </div>
      </div>
    </div>
  );
}


