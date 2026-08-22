import React from 'react';
import { ChevronRight, CheckCircle2, Star, ArrowLeft, Trophy, Flame, Award, Bookmark } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function CoachStep({ stepData, onNext, onPrevStep, currentStep, totalSteps }) {
  const { coachInfo } = stepData;
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#240828] via-[#1A041E] to-[#120215] py-5 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-white">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* QUIZ TOP BAR */}
        <div className="flex items-center justify-between px-1">
          {onPrevStep ? (
            <button
              type="button"
              onClick={onPrevStep}
              className="w-10 h-10 rounded-full bg-[#240828] backdrop-blur-md shadow-md border border-[#4C1450] text-white flex items-center justify-center transition-all hover:bg-[#340E39] hover:scale-105 active:scale-95 cursor-pointer"
              title="Volver a la pregunta anterior"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}

          <div className="text-center">
            <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#240828] backdrop-blur-md shadow-md border border-[#4C1450] text-[#FF2A85] flex items-center justify-center">
            <Bookmark className="w-4 h-4 fill-[#FF2A85]/20 stroke-[2.2]" />
          </div>
        </div>

        {/* MAIN QUESTION CARD */}
        <div className="relative rounded-[26px] p-6 text-center text-white shadow-[0_16px_36px_-8px_rgba(255,42,133,0.40)] quiz-question-banner overflow-hidden animate-pop">
          <div className="inline-flex items-center gap-1.5 bg-[#FFE600] text-[#19041C] border-2 border-[#FFE600] text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-2.5 shadow-[2px_2px_0px_#FF2A85] font-heading">
            <Trophy className="w-3.5 h-3.5 text-[#FF2A85] fill-[#19041C]" />
            <span>Creador del Protocolo Glúteos Brasileños 🇧🇷</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight font-heading drop-shadow-xs">
            Conoce al Coach Luca
          </h2>
        </div>

        {/* MAIN WHITE CARD */}
        <div className="bg-[#240828] rounded-[26px] p-5 sm:p-6 shadow-2xl border border-[#4C1450] space-y-4 text-center quiz-card animate-pop">
          
          {/* PROGRESS BAR */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-[#D4BCD0] uppercase tracking-wider font-heading shrink-0">
              Progreso
            </span>
            <div className="flex-1 h-2.5 bg-[#1A041E] rounded-full overflow-hidden p-0.5">
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
          <div className="w-full rounded-2xl overflow-hidden border border-[#4C1450] shadow-md bg-[#1A041E]">
            <img 
              src={coachInfo.mainImage} 
              alt="Coach Luca" 
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* PROFILE STATS */}
          <div className="bg-[#1A041E] rounded-[20px] p-4 border border-[#4C1450] space-y-3 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-black text-white flex items-center gap-1.5 font-heading">
                Coach Luca
                <CheckCircle2 className="w-5 h-5 text-[#FF2A85]" />
              </h3>
              <span className="bg-[#063725] text-[#10B981] text-xs font-black px-3 py-1 rounded-full border border-[#10B981]/40 font-heading">
                Verificado ✓
              </span>
            </div>

            <p className="text-xs text-[#D4BCD0] font-medium leading-relaxed">
              🔬 Especialista en Biomecánica Glútea y Activación Neuromuscular
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-[#240828] border border-[#4C1450] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
                <Award className="w-5 h-5 text-[#FF2A85] shrink-0" />
                <div>
                  <span className="text-sm font-black text-white block leading-none font-heading">{coachInfo.experienceYears}</span>
                  <span className="text-[10px] text-[#A890A4] font-bold uppercase font-heading">Experiencia</span>
                </div>
              </div>

              <div className="bg-[#240828] border border-[#4C1450] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
                <Flame className="w-5 h-5 text-[#10B981] shrink-0" />
                <div>
                  <span className="text-sm font-black text-white block leading-none font-heading">{coachInfo.successCases}</span>
                  <span className="text-[10px] text-[#A890A4] font-bold uppercase font-heading">Alumnas</span>
                </div>
              </div>
            </div>

            <div className="bg-[#240828] rounded-xl p-3 border border-[#4C1450] italic text-xs text-[#D4BCD0] font-medium">
              "{coachInfo.bio}"
            </div>
          </div>

          {/* BEFORE & AFTER GALLERY */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-1.5 font-heading">
              <Star className="w-4 h-4 text-[#FFE600] fill-[#FFE600]" />
              <span>Resultados Reales de Alumnas (Antes y Después)</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {coachInfo.results.map((resImg, idx) => (
                <div key={`coach-res-${resImg}-${idx}`} className="rounded-xl overflow-hidden border border-[#4C1450] h-28 sm:h-36 shadow-xs">
                  <img 
                    src={resImg} 
                    alt={`Resultado ${idx + 1}`} 
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PRIMARY CTA BUTTON */}
          <button
            type="button"
            onClick={() => onNext("continuar")}
            className="w-full py-4 sm:py-5 px-6 rounded-[20px] bg-gradient-to-r from-[#FF2A85] via-[#FF007F] to-[#FF3377] hover:brightness-110 text-white font-black text-lg sm:text-xl shadow-[0_12px_28px_rgba(255,42,133,0.45)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
          >
            <span>CONTINUAR MI DIAGNÓSTICO</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

        </div>
      </div>
    </div>
  );
}

