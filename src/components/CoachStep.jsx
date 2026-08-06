import React from 'react';
import { ChevronRight, CheckCircle2, Sparkles, Star, ArrowLeft, Trophy, Flame, Award } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function CoachStep({ stepData, onNext, onPrevStep, currentStep, totalSteps }) {
  const { coachInfo } = stepData;
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FFF9F6] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Main Card */}
        <div className="bg-white rounded-[24px] p-5 sm:p-7 shadow-xl border border-[#F0E3E9] animate-pop space-y-5 text-center quiz-card">
          
          {/* Progress Header */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-heading">
              <div className="flex items-center gap-2">
                {onPrevStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="w-8 h-8 rounded-full bg-[#FFF0F5] hover:bg-[#FFE1EC] text-[#5B163A] flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer border border-[#DFC9D3]"
                    title="Volver a la pregunta anterior"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
                <span className="inline-flex items-center gap-1.5 bg-[#FFE1EC] text-[#B71F58] font-bold text-xs px-3.5 py-1 rounded-full border border-[#FF8EBA]/40">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF3D7F]" />
                  Paso {currentStep} de {totalSteps}
                </span>
              </div>
              <span className="font-extrabold text-[#FF3D7F] text-xs">{percentage}%</span>
            </div>

            <div className="h-2 w-full bg-[#F0E3E9] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF3D7F] to-[#D92667] transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* AUTHORITATIVE HEADER */}
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B71F58] bg-[#FFE1EC] px-3.5 py-1 rounded-full border border-[#FF8EBA]/40 font-heading">
              <Trophy className="w-3.5 h-3.5 text-[#FF3D7F]" />
              Creador del Protocolo Glúteos Brasileños 🇧🇷
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#171116] tracking-tight leading-tight font-heading">
              Conoce al Coach Luca
            </h2>
          </div>

          {/* CLEAN HIGH-RESOLUTION HERO PHOTO */}
          <div className="w-full rounded-2xl overflow-hidden border border-[#F0E3E9] shadow-md bg-[#FFF9F6]">
            <img 
              src={coachInfo.mainImage} 
              alt="Coach Luca" 
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* PROFILE STATS */}
          <div className="bg-[#FFF9F6] rounded-[16px] p-4 border border-[#F0E3E9] space-y-3 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-black text-[#171116] flex items-center gap-1.5 font-heading">
                Coach Luca
                <CheckCircle2 className="w-5 h-5 text-[#FF3D7F]" />
              </h3>
              <span className="bg-[#E4F7EB] text-[#21894A] text-xs font-bold px-3 py-1 rounded-full border border-[#32B768]/30 font-heading">
                Verificado ✓
              </span>
            </div>

            <p className="text-xs text-[#5F525A] font-medium leading-relaxed">
              🔬 Especialista en Biomecánica Glútea y Activación Neuromuscular
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-white border border-[#F0E3E9] p-3 rounded-xl flex items-center gap-2.5 shadow-sm">
                <Award className="w-5 h-5 text-[#FF3D7F] shrink-0" />
                <div>
                  <span className="text-sm font-black text-[#171116] block leading-none font-heading">{coachInfo.experienceYears}</span>
                  <span className="text-[10px] text-[#8C7D86] font-bold uppercase font-heading">Experiencia</span>
                </div>
              </div>

              <div className="bg-white border border-[#F0E3E9] p-3 rounded-xl flex items-center gap-2.5 shadow-sm">
                <Flame className="w-5 h-5 text-[#32B768] shrink-0" />
                <div>
                  <span className="text-sm font-black text-[#171116] block leading-none font-heading">{coachInfo.successCases}</span>
                  <span className="text-[10px] text-[#8C7D86] font-bold uppercase font-heading">Alumnas</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-[#DFC9D3] italic text-xs text-[#5F525A] font-medium">
              "{coachInfo.bio}"
            </div>
          </div>

          {/* BEFORE & AFTER GALLERY */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B163A] flex items-center justify-center gap-1.5 font-heading">
              <Star className="w-4 h-4 text-[#D9A441] fill-[#D9A441]" />
              <span>Resultados Reales de Alumnas (Antes y Después)</span>
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {coachInfo.results.map((resImg, idx) => (
                <div key={`coach-res-${resImg}-${idx}`} className="rounded-xl overflow-hidden border border-[#F0E3E9] h-28 sm:h-36 shadow-sm">
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
            className="w-full py-4 sm:py-5 px-6 rounded-[14px] bg-gradient-to-r from-[#FF3D7F] to-[#D92667] hover:brightness-105 text-white font-extrabold text-lg sm:text-xl shadow-[0_10px_24px_rgba(217,38,103,0.28)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
          >
            <span>CONTINUAR MI DIAGNÓSTICO</span>
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

        </div>
      </div>
    </div>
  );
}
