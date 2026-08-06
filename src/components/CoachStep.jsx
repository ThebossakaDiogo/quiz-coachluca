import React from 'react';
import { ChevronRight, CheckCircle2, Sparkles, Star, ArrowLeft, Trophy, Flame, Award } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function CoachStep({ stepData, onNext, onPrevStep, currentStep, totalSteps }) {
  const { coachInfo } = stepData;
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

          {/* AUTHORITATIVE HEADER */}
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F766E] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              <Trophy className="w-3.5 h-3.5 text-[#0D9488]" />
              Creador del Método Brazilian Booty 🇧🇷
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Conoce al Coach Luca
            </h2>
          </div>

          {/* CLEAN HIGH-RESOLUTION HERO PHOTO */}
          <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
            <img 
              src={coachInfo.mainImage} 
              alt="Coach Luca" 
              loading="eager"
              decoding="async"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* PROFILE STATS */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-left">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-slate-950 flex items-center gap-1.5">
                Coach Luca
                <CheckCircle2 className="w-5 h-5 text-[#E11D48]" />
              </h3>
              <span className="bg-rose-100 text-[#BE123C] text-xs font-semibold px-3 py-1 rounded-full">
                Verificado ✓
              </span>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              🔬 Especialista en Biomecánica Glútea y Activación Neuromuscular
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-sm">
                <Award className="w-5 h-5 text-[#E11D48] shrink-0" />
                <div>
                  <span className="text-base font-bold text-slate-950 block leading-none">{coachInfo.experienceYears}</span>
                  <span className="text-[10px] text-slate-500 font-medium uppercase">Experiencia</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 shadow-sm">
                <Flame className="w-5 h-5 text-[#EA580C] shrink-0" />
                <div>
                  <span className="text-base font-bold text-slate-950 block leading-none">{coachInfo.successCases}</span>
                  <span className="text-[10px] text-slate-500 font-medium uppercase">Alumnas</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-slate-200 italic text-xs text-slate-700 font-medium">
              "{coachInfo.bio}"
            </div>
          </div>

          {/* BEFORE & AFTER GALLERY */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center justify-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Resultados Reales de Alumnas (Antes y Después)</span>
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              {coachInfo.results.map((resImg, idx) => (
                <div key={`coach-res-${resImg}-${idx}`} className="rounded-xl overflow-hidden border border-slate-200 h-28 sm:h-36 shadow-sm">
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

          {/* SOLID REDDISH ORANGE URGENCY CTA BUTTON */}
          <button
            type="button"
            onClick={() => onNext("continuar")}
            className="w-full py-5 sm:py-6 px-8 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xl sm:text-2xl shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group leading-none uppercase tracking-wider text-center"
          >
            <span>CONTINUAR MI DIAGNÓSTICO</span>
            <ChevronRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

        </div>
      </div>
    </div>
  );
}
