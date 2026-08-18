import React from 'react';
import { ChevronRight, CheckCircle2, Sparkles, Star, ArrowLeft, Trophy, Flame, Award, Bookmark } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function CoachStep({ stepData, onNext, onPrevStep, currentStep, totalSteps }) {
  const { coachInfo } = stepData;
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#F6DBEE] via-[#F9EDF6] to-[#FCF5FA] py-5 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-[#1F121C]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* QUIZ TOP BAR */}
        <div className="flex items-center justify-between px-1">
          {onPrevStep ? (
            <button
              type="button"
              onClick={onPrevStep}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-[#F0DCEB] text-[#4A154B] flex items-center justify-center transition-all hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
              title="Volver a la pregunta anterior"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}

          <div className="text-center">
            <span className="font-heading font-extrabold text-sm sm:text-base text-[#4A154B] tracking-tight">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-[#F0DCEB] text-[#D8387D] flex items-center justify-center">
            <Bookmark className="w-4 h-4 fill-[#D8387D]/20 stroke-[2.2]" />
          </div>
        </div>

        {/* MAIN QUESTION CARD */}
        <div className="relative rounded-[26px] p-6 text-center text-white shadow-[0_16px_36px_-8px_rgba(216,56,125,0.35)] quiz-question-banner overflow-hidden animate-pop">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-2.5 shadow-xs font-heading">
            <Trophy className="w-3.5 h-3.5 text-white fill-white" />
            <span>Creador del Protocolo Glúteos Brasileños 🇧🇷</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight font-heading drop-shadow-xs">
            Conoce al Coach Luca
          </h2>
        </div>

        {/* MAIN WHITE CARD */}
        <div className="bg-white rounded-[26px] p-5 sm:p-6 shadow-xl border border-[#F0DCEB] space-y-4 text-center quiz-card animate-pop">
          
          {/* PROGRESS BAR */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-extrabold text-[#4A154B] uppercase tracking-wider font-heading shrink-0">
              Progreso
            </span>
            <div className="flex-1 h-2.5 bg-[#F0DCEB] rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-[#FF7051] via-[#E63988] to-[#D8387D] transition-all duration-300 rounded-full shadow-xs"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs font-extrabold text-[#D8387D] font-mono shrink-0">
              {percentage}%
            </span>
          </div>

          {/* CLEAN HIGH-RESOLUTION HERO PHOTO */}
          <div className="w-full rounded-2xl overflow-hidden border border-[#F0DCEB] shadow-md bg-[#FDF4FA]">
            <img 
              src={coachInfo.mainImage} 
              alt="Coach Luca" 
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* PROFILE STATS */}
          <div className="bg-[#FDF4FA] rounded-[20px] p-4 border border-[#F0DCEB] space-y-3 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-black text-[#1F121C] flex items-center gap-1.5 font-heading">
                Coach Luca
                <CheckCircle2 className="w-5 h-5 text-[#E63988]" />
              </h3>
              <span className="bg-[#ECFDF5] text-[#059669] text-xs font-bold px-3 py-1 rounded-full border border-[#10B981]/30 font-heading">
                Verificado ✓
              </span>
            </div>

            <p className="text-xs text-[#635360] font-medium leading-relaxed">
              🔬 Especialista en Biomecánica Glútea y Activación Neuromuscular
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-white border border-[#F0DCEB] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
                <Award className="w-5 h-5 text-[#E63988] shrink-0" />
                <div>
                  <span className="text-sm font-black text-[#1F121C] block leading-none font-heading">{coachInfo.experienceYears}</span>
                  <span className="text-[10px] text-[#968493] font-bold uppercase font-heading">Experiencia</span>
                </div>
              </div>

              <div className="bg-white border border-[#F0DCEB] p-3 rounded-xl flex items-center gap-2.5 shadow-2xs">
                <Flame className="w-5 h-5 text-[#10B981] shrink-0" />
                <div>
                  <span className="text-sm font-black text-[#1F121C] block leading-none font-heading">{coachInfo.successCases}</span>
                  <span className="text-[10px] text-[#968493] font-bold uppercase font-heading">Alumnas</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#F0DCEB] italic text-xs text-[#635360] font-medium">
              "{coachInfo.bio}"
            </div>
          </div>

          {/* BEFORE & AFTER GALLERY */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A154B] flex items-center justify-center gap-1.5 font-heading">
              <Star className="w-4 h-4 text-[#E5A638] fill-[#E5A638]" />
              <span>Resultados Reales de Alumnas (Antes y Después)</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {coachInfo.results.map((resImg, idx) => (
                <div key={`coach-res-${resImg}-${idx}`} className="rounded-xl overflow-hidden border border-[#F0DCEB] h-28 sm:h-36 shadow-xs">
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
            className="w-full py-4 sm:py-5 px-6 rounded-[20px] bg-gradient-to-r from-[#FF7051] via-[#E63988] to-[#D8387D] hover:brightness-105 text-white font-black text-lg sm:text-xl shadow-[0_12px_28px_rgba(230,57,136,0.32)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
          >
            <span>CONTINUAR MI DIAGNÓSTICO</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

        </div>
      </div>
    </div>
  );
}

