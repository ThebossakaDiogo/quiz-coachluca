import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, Loader2, Bookmark } from 'lucide-react';
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
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#F6DBEE] via-[#F9EDF6] to-[#FCF5FA] py-5 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-[#1F121C]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* URGENCY & SCARCITY TOP BANNER */}
        <div className="bg-[#4A154B] text-white rounded-2xl p-2.5 px-4 shadow-md flex items-center justify-between text-xs font-bold border border-[#F0DCEB] animate-pulse font-heading">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#FFA5CD] shrink-0" />
            <span className="text-[11px]">⚠️ EVALUACIÓN DISPONIBLE POR TIEMPO LIMITADO</span>
          </span>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-[#FFA5CD] font-black text-xs">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="bg-white rounded-[26px] p-5 sm:p-7 shadow-xl border border-[#F0DCEB] animate-pop space-y-5 text-center quiz-card">
          
          {/* LIVE DIAGNOSTIC LOADER HEADER */}
          <div className="bg-[#FDF2F8] rounded-[22px] p-4 border border-[#F0DCEB] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between gap-2 font-heading">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B81E64] bg-white px-3 py-1 rounded-full border border-[#F0DCEB]">
                {progress < 100 ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-[#E63988] animate-spin" />
                    Procesando Diagnóstico PGB...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    Diagnóstico Concluido
                  </>
                )}
              </span>
              <span className="font-black text-[#E63988] text-sm">
                {progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-[#F0DCEB] rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#FF7051] via-[#E63988] to-[#D8387D] rounded-full transition-all duration-300 shadow-xs"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Diagnostic Message */}
            <p className="text-xs sm:text-sm font-bold text-[#4A154B] min-h-[1.5rem] flex items-center justify-center transition-all duration-300 font-heading">
              {stagesMessages[stage] || stagesMessages[4]}
            </p>
          </div>

          {/* REVEALABLE CONTENT SECTIONS */}

          {/* CARD 1: PERFIL BIOMECÁNICO DETECTADO */}
          {progress >= 25 && (
            <div className="bg-[#FDF4FA] rounded-[20px] p-4 sm:p-5 border border-[#F0DCEB] text-left flex items-start gap-3.5 shadow-xs relative overflow-hidden animate-pop">
              <div className="w-10 h-10 rounded-xl bg-[#FDF2F8] border border-[#F0DCEB] flex items-center justify-center text-[#E63988] shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-[#E63988]" />
              </div>
              <div className="space-y-0.5 font-heading">
                <span className="block text-[10px] font-black uppercase tracking-wider text-[#E63988]">
                  PERFIL BIOMECÁNICO DETECTADO
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#1F121C] flex items-center gap-1.5 flex-wrap">
                  <span>{ageText}</span>
                  <span className="text-[#E63988]">→</span>
                  <span className="text-[#10B981]">Resultado ELITE 🏆</span>
                </h3>
                <p className="text-xs text-[#635360] font-medium">
                  Predisposición alta para una respuesta rápida al método. ✅
                </p>
              </div>
            </div>
          )}

          {/* SECTION TITLE & TIMELINE CHECKLIST */}
          {progress >= 50 && (
            <div className="space-y-2.5 animate-pop">
              <div className="pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#4A154B] font-heading">
                  TU EVOLUCIÓN CON EL PROTOCOLO PGB (28 DÍAS)
                </span>
              </div>

              {/* TIMELINE ITEM 1 */}
              <div className="bg-[#FDF4FA] rounded-2xl p-3.5 border border-[#F0DCEB] flex items-center justify-between gap-3 text-left shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FDF2F8] border border-[#F0DCEB] flex items-center justify-center text-lg shrink-0">
                    🔥
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#E63988] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      7 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#1F121C]">
                      Activación inicial e incremento de <u className="decoration-[#E63988] font-black">firmeza</u>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#E63988] font-heading">20%</span>
              </div>

              {/* TIMELINE ITEM 2 */}
              <div className="bg-[#FDF4FA] rounded-2xl p-3.5 border border-[#F0DCEB] flex items-center justify-between gap-3 text-left shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF9EB] border border-[#E5A638]/40 flex items-center justify-center text-lg shrink-0">
                    💎
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#4A154B] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      14 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#1F121C]">
                      <u className="decoration-[#E5A638] font-black">Mejora de contorno</u> y elevación glútea
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#E5A638] font-heading">50%</span>
              </div>

              {/* TIMELINE ITEM 3 */}
              <div className="bg-[#FDF4FA] rounded-2xl p-3.5 border border-[#F0DCEB] flex items-center justify-between gap-3 text-left shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] border border-[#10B981]/40 flex items-center justify-center text-lg shrink-0">
                    🍑
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#10B981] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      28 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#1F121C]">
                      Glúteos <u className="decoration-[#10B981] font-black">más firmes, elevados y definidos</u>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#10B981] font-heading">96%</span>
              </div>
            </div>
          )}

          {/* DIAGNOSTIC REPORT CARD DASHBOARD */}
          {progress >= 75 && (
            <div className="animate-pop text-[#1F121C]">
              <DiagnosticReportCard userAnswers={userAnswers} />
            </div>
          )}

          {/* FINAL REVEAL & CTA BUTTON */}
          {progress >= 100 && (
            <div className="space-y-3 pt-1 animate-pop">
              <button
                type="button"
                onClick={onContinue}
                className="w-full py-4 sm:py-5 px-6 rounded-[20px] bg-gradient-to-r from-[#FF7051] via-[#E63988] to-[#D8387D] hover:brightness-105 text-white font-black text-lg sm:text-xl shadow-[0_12px_28px_rgba(230,57,136,0.32)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
              >
                <Flame className="w-6 h-6 text-[#E5A638] fill-[#E5A638] shrink-0" />
                <span>VER MI DIAGNÓSTICO & PLAN</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#968493]">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>Diagnóstico procesado bajo total confidencialidad</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

