import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, Sparkles, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import HeaderLogo from './HeaderLogo';
import DiagnosticReportCard from './DiagnosticReportCard';

export default function SummaryStep({ userAnswers, onContinue }) {
  const rawAge = userAnswers[2] || "30-39";
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

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#FFF5F8] via-[#FAF0F6] to-[#F5EBF2] py-6 px-3.5 sm:px-6 flex flex-col justify-center items-center font-body text-[#2B0B2E]">
      
      <div className="w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Central Eyebrow Indicator */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 bg-[#FFE600] text-[#19041C] border-2 border-[#FFE600] text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#FF2A85] font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2A85]" />
            <span>Diagnóstico IA • Perfil Físico</span>
          </span>
        </div>

        {/* MAIN CARD CONTAINER */}
        <div className="bg-white rounded-[26px] p-5 sm:p-7 shadow-xl border border-[#F0D2E4] animate-pop space-y-5 text-center quiz-card text-[#2B0B2E]">
          
          {/* LIVE DIAGNOSTIC LOADER HEADER */}
          <div className="bg-[#FAF2F7] rounded-[22px] p-4 border border-[#F0DCEB] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between gap-2 font-heading">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#2B0B2E] bg-white px-3 py-1 rounded-full border border-[#F0DCEB]">
                {progress < 100 ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-[#FF2A85] animate-spin" />
                    Procesando Diagnóstico PGB...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    Diagnóstico Concluido
                  </>
                )}
              </span>
              <span className="font-black text-[#FF2A85] text-sm">
                {progress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-[#FAF0F6] rounded-full overflow-hidden p-0.5 border border-[#F0DCEB] shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#FF2A85] via-[#FFE600] to-[#10B981] rounded-full transition-all duration-300 shadow-xs"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Diagnostic Message */}
            <p className="text-xs sm:text-sm font-black text-[#2B0B2E] min-h-[1.5rem] flex items-center justify-center transition-all duration-300 font-heading">
              {stagesMessages[stage] || stagesMessages[4]}
            </p>
          </div>

          {/* REVEALABLE CONTENT SECTIONS */}

          {/* CARD 1: PERFIL BIOMECÁNICO DETECTADO */}
          {progress >= 25 && (
            <div className="bg-[#FAF2F7] rounded-[20px] p-4 sm:p-5 border border-[#F0DCEB] text-left flex items-start gap-3.5 shadow-xs relative overflow-hidden animate-pop">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#FFB800] flex items-center justify-center text-[#FF2A85] shrink-0 mt-0.5 shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#FF2A85]" />
              </div>
              <div className="space-y-0.5 font-heading">
                <span className="block text-[10px] font-black uppercase tracking-wider text-[#FF2A85]">
                  PERFIL BIOMECÁNICO DETECTADO
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#2B0B2E] flex items-center gap-1.5 flex-wrap">
                  <span>{ageText}</span>
                  <span className="text-[#FF2A85]">→</span>
                  <span className="text-[#059669]">Resultado ELITE 🏆</span>
                </h3>
                <p className="text-xs text-[#6B5469] font-medium">
                  Predisposición alta para una respuesta rápida al método. ✅
                </p>
              </div>
            </div>
          )}

          {/* SECTION TITLE & TIMELINE CHECKLIST */}
          {progress >= 50 && (
            <div className="space-y-2.5 animate-pop">
              <div className="pt-1">
                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-[#2B0B2E] font-heading">
                  TU EVOLUCIÓN CON EL PROTOCOLO PGB (28 DÍAS)
                </span>
              </div>

              {/* TIMELINE ITEM 1 */}
              <div className="bg-[#FAF2F7] rounded-2xl p-3.5 border border-[#F0DCEB] flex items-center justify-between gap-3 text-left shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#F0DCEB] flex items-center justify-center text-lg shrink-0 shadow-2xs">
                    🔥
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#FF2A85] text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      7 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#2B0B2E]">
                      Activación inicial e incremento de <u className="decoration-[#FF2A85] font-black">firmeza</u>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#FF2A85] font-heading">20%</span>
              </div>

              {/* TIMELINE ITEM 2 */}
              <div className="bg-[#FAF2F7] rounded-2xl p-3.5 border border-[#F0DCEB] flex items-center justify-between gap-3 text-left shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#F0DCEB] flex items-center justify-center text-lg shrink-0 shadow-2xs">
                    💎
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#FFB800] text-[#19041C] font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      14 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#2B0B2E]">
                      <u className="decoration-[#D97706] font-black">Mejora de contorno</u> y elevación glútea
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#D97706] font-heading">50%</span>
              </div>

              {/* TIMELINE ITEM 3 */}
              <div className="bg-[#FAF2F7] rounded-2xl p-3.5 border border-[#F0DCEB] flex items-center justify-between gap-3 text-left shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] border border-[#10B981]/30 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                    🍑
                  </div>
                  <div className="space-y-0.5">
                    <span className="inline-block bg-[#10B981] text-white font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-heading">
                      28 DÍAS
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#2B0B2E]">
                      Glúteos <u className="decoration-[#10B981] font-black">más firmes, elevados y definidos</u>
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#059669] font-heading">96%</span>
              </div>
            </div>
          )}

          {/* DIAGNOSTIC REPORT CARD DASHBOARD */}
          {progress >= 75 && (
            <div className="animate-pop text-[#2B0B2E]">
              <DiagnosticReportCard userAnswers={userAnswers} />
            </div>
          )}

          {/* FINAL REVEAL & CTA BUTTON */}
          {progress >= 100 && (
            <div className="space-y-3 pt-1 animate-pop">
              <button
                type="button"
                onClick={onContinue}
                className="w-full py-4 sm:py-5 px-6 rounded-[20px] bg-gradient-to-r from-[#FF2A85] via-[#FF007F] to-[#FF3377] hover:brightness-110 text-white font-black text-lg sm:text-xl shadow-[0_12px_28px_rgba(255,42,133,0.35)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
              >
                <Flame className="w-6 h-6 text-[#FFE600] fill-[#FFE600] shrink-0 drop-shadow-xs" />
                <span>VER MI DIAGNÓSTICO & PLAN</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#91798E]">
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


