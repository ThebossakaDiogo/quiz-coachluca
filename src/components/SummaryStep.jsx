import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import HeaderLogo from './HeaderLogo';
import DiagnosticReportCard from './DiagnosticReportCard';

export default function SummaryStep({ userAnswers, onContinue }) {
  const rawAge = userAnswers[2] || "30-39";
  const [timeLeft, setTimeLeft] = useState(299); // 4:59 countdown
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const formatAgeLabel = (val) => {
    if (!val) return "30 a 39 años";
    if (val === "18-29") return "18 a 29 años";
    if (val === "30-39") return "30 a 39 años";
    if (val === "40-49") return "40 a 49 años";
    if (val === "50plus") return "50+ años";
    return val;
  };

  const ageText = formatAgeLabel(rawAge);

  const stagesMessages = [
    "🔬 Analizando rango de edad e índice de respuesta muscular...",
    "⚡ Mapeando áreas de celulitis y potencial de elevación...",
    "🎯 Calibrando estímulo neuromuscular de 8-10 min/día...",
    "🏆 Finalizando diagnóstico de compatibilidad...",
    "✨ ¡Diagnóstico 100% Concluido con Éxito!"
  ];

  // Progressive loader & stage reveal timer
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 2;
        if (next >= 85) setStage(3);
        else if (next >= 60) setStage(2);
        else if (next >= 30) setStage(1);
        return next;
      });
    }, 45); // Takes ~2.2s total

    return () => clearInterval(interval);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#59D6CF] via-[#2DD4BF] to-[#0D9488] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* GATILHO DE URGÊNCIA E ESCASSEZ NO TOPO */}
        <div className="bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 text-white rounded-2xl p-2.5 px-3.5 shadow-xl flex items-center justify-between text-xs font-black border border-amber-300/40 animate-pulse">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0" />
            <span>⚠️ ATENCIÓN: EVALUACIÓN DISPONIBLE POR TIEMPO LIMITADO</span>
          </span>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-amber-300 font-black text-xs">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="bg-white rounded-[32px] p-5 sm:p-7 shadow-2xl border border-teal-100 animate-pop space-y-5 text-center">
          
          {/* LIVE DIAGNOSTIC LOADER HEADER */}
          <div className="bg-teal-50/90 rounded-3xl p-4 border border-teal-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#0F766E] bg-white px-3 py-1 rounded-full border border-teal-200 shadow-xs">
                {progress < 100 ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-[#0D9488] animate-spin" />
                    Procesando IA Glútea...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] fill-[#0D9488]/20" />
                    Diagnóstico Concluido
                  </>
                )}
              </span>
              <span className="font-mono font-black text-[#0D9488] text-sm">
                {progress}%
              </span>
            </div>

            {/* Progress Bar (Sólida, sem gradiente) */}
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className="h-full bg-[#0D9488] rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Diagnostic Message */}
            <p className="text-xs sm:text-sm font-extrabold text-[#0F766E] min-h-[1.5rem] flex items-center justify-center transition-all duration-300">
              {stagesMessages[stage] || stagesMessages[4]}
            </p>
          </div>

          {/* REVEALABLE CONTENT SECTIONS */}

          {/* CARD 1: PERFIL GENÉTICO DETECTADO */}
          {progress >= 25 && (
            <div className="bg-slate-50 rounded-3xl p-4 sm:p-5 border border-slate-200 text-left flex items-start gap-3.5 shadow-sm relative overflow-hidden animate-pop">
              <div className="w-11 h-11 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-[#0D9488] shrink-0 shadow-inner mt-0.5">
                <Sparkles className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] font-black uppercase tracking-wider text-[#0D9488]">
                  PERFIL GENÉTICO DETECTADO
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-950 flex items-center gap-1.5 flex-wrap">
                  <span>{ageText}</span>
                  <span className="text-[#0D9488]">→</span>
                  <span className="text-[#0F766E]">Resultado ELITE 🏆</span>
                </h3>
                <p className="text-xs text-slate-600 font-bold">
                  Predisposición genética para transformarte rápido. ✅
                </p>
              </div>
            </div>
          )}

          {/* SECTION TITLE & TIMELINE CHECKLIST */}
          {progress >= 50 && (
            <div className="space-y-3 animate-pop">
              <div className="pt-1">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#0D9488]">
                  TU PLAN • 28 DÍAS
                </span>
              </div>

              {/* TIMELINE ITEM 1 */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between gap-3 text-left shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-xl shrink-0">
                    🔥
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#0D9488] text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      7 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      Tus glúteos quedan <u className="decoration-[#0D9488] font-black decoration-2">firmes y duros</u>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-[#0D9488]">20%</span>
              </div>

              {/* TIMELINE ITEM 2 */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between gap-3 text-left shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-xl shrink-0">
                    💎
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-cyan-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      14 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      <u className="decoration-cyan-600 font-black decoration-2">Reducción visible</u> de celulitis
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-cyan-700">50%</span>
              </div>

              {/* TIMELINE ITEM 3 */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between gap-3 text-left shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-xl shrink-0">
                    🍑
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#E11D48] text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      28 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      Glúteos <u className="decoration-[#E11D48] font-black decoration-2">levantados</u> y voluminosos
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-black text-[#E11D48]">96%</span>
              </div>
            </div>
          )}

          {/* DIAGNOSTIC REPORT CARD DASHBOARD */}
          {progress >= 75 && (
            <div className="animate-pop text-slate-900">
              <DiagnosticReportCard userAnswers={userAnswers} />
            </div>
          )}

          {/* FINAL REVEAL & CTA BUTTON (BOTÃO DE COR ÚNICA SÓLIDA) */}
          {progress >= 100 && (
            <div className="space-y-4 pt-1 animate-pop">
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={onContinue}
                  className="w-full py-5 sm:py-6 px-8 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-xl sm:text-2xl shadow-lg shadow-rose-950/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wider text-center"
                >
                  <Flame className="w-7 h-7 text-yellow-300 fill-yellow-300 shrink-0" />
                  <span>VER MI DIAGNÓSTICO & PLAN</span>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                  <span>Diagnóstico procesado bajo total confidencialidad</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
