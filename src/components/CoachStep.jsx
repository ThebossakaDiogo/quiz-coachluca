import React from 'react';
import { ChevronRight, CheckCircle2, Sparkles, Star, ArrowLeft, Trophy, Flame, Award } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function CoachStep({ stepData, onNext, onPrevStep, currentStep, totalSteps }) {
  const { coachInfo } = stepData;
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#121829] to-[#0A0E1A] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-nunito text-white">
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* MAIN LUXURY DARK CARD */}
        <div className="bg-[#131525]/95 backdrop-blur-2xl rounded-[32px] p-5 sm:p-7 shadow-2xl border border-teal-500/30 animate-pop space-y-5 quiz-card overflow-hidden">
          
          {/* Progress Bar Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-purple-200">
              <div className="flex items-center gap-2">
                {onPrevStep && (
                  <button
                    type="button"
                    onClick={onPrevStep}
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-teal-400 flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer border border-teal-500/30"
                    title="Voltar para a pergunta anterior"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}
                <span className="bg-teal-950/80 text-teal-300 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm font-bold text-[11px] sm:text-xs border border-teal-500/40">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {stepData.eyebrow || `Passo ${currentStep} de ${totalSteps}`}
                </span>
              </div>
              <span className="font-extrabold text-cyan-300 bg-slate-800 px-2.5 py-1 rounded-xl border border-cyan-500/30 shadow-sm text-xs">{percentage}%</span>
            </div>

            <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 shadow-inner border border-teal-900/40">
              <div 
                className="h-full bg-gradient-to-r from-[#7C3AED] via-[#0D9488] to-[#06B6D4] rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* AUTHORITATIVE HEADER */}
          <div className="text-center space-y-1.5 pt-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-cyan-300 bg-teal-950/80 px-3.5 py-1 rounded-full border border-teal-500/40 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-cyan-400" />
              Criador do FitFlow Método 28D
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              Conheça o Coach Luca
            </h2>
          </div>

          {/* CLEAN HIGH-RESOLUTION HERO PHOTO */}
          <div className="w-full rounded-[24px] overflow-hidden border-2 border-cyan-400/60 shadow-2xl bg-slate-950 p-1">
            <img 
              src={coachInfo.mainImage} 
              alt="Coach Luca" 
              loading="eager"
              decoding="async"
              className="w-full h-auto rounded-[20px] object-contain"
            />
          </div>

          {/* PERFECTLY ALIGNED & ELEGANT PROFILE CARD (NO TEXT OVERFLOW) */}
          <div className="bg-gradient-to-br from-[#1A1C30] to-[#0F1222] rounded-[24px] p-4 sm:p-5 border border-purple-500/30 shadow-xl space-y-3.5">
            
            {/* Name and Verified Status */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white font-nunito tracking-tight flex items-center gap-1.5">
                  Coach Luca
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 fill-cyan-400/20 shrink-0" />
                </h3>
              </div>
              <span className="bg-teal-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md shrink-0">
                Verificado ✓
              </span>
            </div>

            {/* Specialty Tag */}
            <div>
              <span className="inline-block bg-purple-950/90 text-cyan-300 border border-cyan-400/30 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-inner">
                🔬 Especialista em Biomecânica Glútea
              </span>
            </div>

            {/* 2 Metric Cards */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-gradient-to-br from-[#0F2D2A] via-[#121829] to-[#0A1A18] border border-teal-500/40 p-3.5 rounded-2xl flex items-center gap-3 shadow-md border-t-teal-400/50">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center shrink-0 shadow-inner">
                  <Award className="w-5 h-5 text-cyan-300" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-base sm:text-lg font-black text-white leading-tight tracking-tight">
                    {coachInfo.experienceYears}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-teal-300 font-bold uppercase tracking-wider">
                    Experiência
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#2D0F38] via-[#121829] to-[#1A0A26] border border-purple-500/40 p-3.5 rounded-2xl flex items-center gap-3 shadow-md border-t-purple-400/50">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0 shadow-inner">
                  <Flame className="w-5 h-5 text-purple-300 fill-purple-300" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-base sm:text-lg font-black text-white leading-tight tracking-tight">
                    {coachInfo.successCases}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-purple-300 font-bold uppercase tracking-wider">
                    Alunas
                  </span>
                </div>
              </div>
            </div>

            {/* Quote Statement */}
            <div className="bg-slate-950/90 rounded-2xl p-3.5 border border-teal-500/30 text-left shadow-inner">
              <p className="text-xs sm:text-sm text-teal-100 leading-relaxed italic font-medium">
                "{coachInfo.bio}"
              </p>
            </div>

          </div>

          {/* BEFORE & AFTER GALLERY */}
          <div className="space-y-2.5 pt-1">
            <h4 className="text-center text-xs font-black uppercase tracking-wider text-teal-300 flex items-center justify-center gap-1.5">
              <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Resultados Reais de Alunas (Antes e Depois)</span>
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              {coachInfo.results.map((resImg, idx) => (
                <div key={`coach-res-${resImg}-${idx}`} className="rounded-2xl overflow-hidden border border-teal-500/30 h-32 sm:h-40 shadow-md group hover:scale-105 transition-transform duration-300">
                  <img 
                    src={resImg} 
                    alt={`Resultado ${idx + 1}`} 
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CTA BUTTON */}
          <button
            type="button"
            onClick={() => onNext("continuar")}
            className="w-full py-4.5 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#06B6D4] hover:from-[#097A70] hover:to-[#0891B2] text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-2xl shadow-teal-500/40 ring-4 ring-teal-400/30 flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer group leading-snug drop-shadow-md"
          >
            <Flame className="w-5 h-5 text-white fill-white shrink-0" />
            <span className="drop-shadow">CONTINUAR MEU DIAGNÓSTICO</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>

        </div>
      </div>
    </div>
  );
}
