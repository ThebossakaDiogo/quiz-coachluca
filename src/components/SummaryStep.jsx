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
    "⚡ Mapeando áreas de activación y potencial de elevación...",
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
    <div className="relative min-h-dvh overflow-hidden bg-[#FFF9F6] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* URGENCY & SCARCITY TOP BANNER */}
        <div className="bg-[#320C22] text-white rounded-2xl p-2.5 px-3.5 shadow-xl flex items-center justify-between text-xs font-extrabold border border-[#FF8EBA]/40 animate-pulse font-heading">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#FF8EBA] shrink-0" />
            <span>⚠️ ATENCIÓN: EVALUACIÓN DISPONIBLE POR TIEMPO LIMITADO</span>
          </span>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-[#FF8EBA] font-black text-xs">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="bg-white rounded-[24px] p-5 sm:p-7 shadow-xl border border-[#F0E3E9] animate-pop space-y-5 text-center quiz-card">
          
          {/* LIVE DIAGNOSTIC LOADER HEADER */}
          <div className="bg-[#FFF0F5] rounded-[18px] p-4 border border-[#FF8EBA]/40 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between gap-2 font-heading">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B71F58] bg-white px-3 py-1 rounded-full border border-[#FF8EBA]/40">
                {progress < 100 ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-[#FF3D7F] animate-spin" />
                    Procesando Diagnóstico PGB...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#32B768]" />
                    Diagnóstico Concluido
                  </>
                )}
              </span>
              <span className="font-extrabold text-[#FF3D7F] text-sm">
                {progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-[#F0E3E9] rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#FF3D7F] to-[#D92667] rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Diagnostic Message */}
            <p className="text-xs sm:text-sm font-bold text-[#5B163A] min-h-[1.5rem] flex items-center justify-center transition-all duration-300 font-heading">
              {stagesMessages[stage] || stagesMessages[4]}
            </p>
          </div>

          {/* REVEALABLE CONTENT SECTIONS */}

          {/* CARD 1: PERFIL GENÉTICO DETECTADO */}
          {progress >= 25 && (
            <div className="bg-[#FFF9F6] rounded-[18px] p-4 sm:p-5 border border-[#F0E3E9] text-left flex items-start gap-3.5 shadow-sm relative overflow-hidden animate-pop">
              <div className="w-10 h-10 rounded-xl bg-[#FFE1EC] border border-[#FF8EBA]/40 flex items-center justify-center text-[#FF3D7F] shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-[#FF3D7F]" />
              </div>
              <div className="space-y-0.5 font-heading">
                <span className="block text-[10px] font-extrabold uppercase tracking-wider text-[#FF3D7F]">
                  PERFIL BIOMECÁNICO DETECTADO
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#171116] flex items-center gap-1.5 flex-wrap">
                  <span>{ageText}</span>
                  <span className="text-[#FF3D7F]">→</span>
                  <span className="text-[#32B768]">Resultado ELITE 🏆</span>
                </h3>
                <p className="text-xs text-[#5F525A] font-medium">
                  Predisposición alta para una respuesta rápida al método. ✅
                </p>
              </div>
            </div>
          )}

          {/* SECTION TITLE & TIMELINE CHECKLIST */}
          {progress >= 50 && (
            <div className="space-y-2.5 animate-pop">
              <div className="pt-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B163A] font-heading">
                  TU EVOLUCIÓN CON EL PROTOCOLO PGB (28 DÍAS)
                </span>
              </div>

              {/* TIMELINE ITEM 1 */}
              <div className="bg-[#FFF9F6] rounded-xl p-3.5 border border-[#F0E3E9] flex items-center justify-between gap-3 text-left shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFE1EC] border border-[#FF8EBA]/40 flex items-center justify-center text-lg shrink-0">
                    🔥
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#FF3D7F] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      7 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#171116]">
                      Activación inicial e incremento de <u className="decoration-[#FF3D7F] font-black">firmeza</u>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#FF3D7F] font-heading">20%</span>
              </div>

              {/* TIMELINE ITEM 2 */}
              <div className="bg-[#FFF9F6] rounded-xl p-3.5 border border-[#F0E3E9] flex items-center justify-between gap-3 text-left shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF4D9] border border-[#D9A441]/40 flex items-center justify-center text-lg shrink-0">
                    💎
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#5B163A] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      14 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#171116]">
                      <u className="decoration-[#D9A441] font-black">Mejora de contorno</u> y elevación glútea
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#D9A441] font-heading">50%</span>
              </div>

              {/* TIMELINE ITEM 3 */}
              <div className="bg-[#FFF9F6] rounded-xl p-3.5 border border-[#F0E3E9] flex items-center justify-between gap-3 text-left shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E4F7EB] border border-[#32B768]/40 flex items-center justify-center text-lg shrink-0">
                    🍑
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#32B768] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      28 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#171116]">
                      Glúteos <u className="decoration-[#32B768] font-black">más firmes, elevados y definidos</u>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#32B768] font-heading">96%</span>
              </div>
            </div>
          )}

          {/* DIAGNOSTIC REPORT CARD DASHBOARD */}
          {progress >= 75 && (
            <div className="animate-pop text-[#171116]">
              <DiagnosticReportCard userAnswers={userAnswers} />
            </div>
          )}

          {/* FINAL REVEAL & CTA BUTTON */}
          {progress >= 100 && (
            <div className="space-y-3 pt-1 animate-pop">
              <button
                type="button"
                onClick={onContinue}
                className="w-full py-4 sm:py-5 px-6 rounded-[14px] bg-gradient-to-r from-[#FF3D7F] to-[#D92667] hover:brightness-105 text-white font-extrabold text-lg sm:text-xl shadow-[0_10px_24px_rgba(217,38,103,0.28)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
              >
                <Flame className="w-6 h-6 text-[#D9A441] fill-[#D9A441] shrink-0" />
                <span>VER MI DIAGNÓSTICO & PLAN</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8C7D86]">
                <ShieldCheck className="w-4 h-4 text-[#32B768]" />
                <span>Diagnóstico procesado bajo total confidencialidad</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
