import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, ShieldCheck, Zap, Activity } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AnalyzingStep({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);

  const checks = [
    { label: "Analizando mapa neuromuscular y perfil de edad...", detail: "Fibras musculares de alta respuesta identificadas" },
    { label: "Evaluando nivel de compromiso y respuesta (100%)...", detail: "Nivel de disciplina cualificado para el Protocolo PGB" },
    { label: "Calculando índice de respuesta glútea profunda (96%)...", detail: "Potencial de transformación de alta firmeza estimado" },
    { label: "¡ANÁLISIS CONCLUIDO! Generando tu Diagnóstico Exclusivo ✨...", detail: "Perfil 96% compatible liberado para el protocolo" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        return prev + 1;
      });
    }, 22);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 25 && activeCheckIndex < 1) setActiveCheckIndex(1);
    if (progress > 50 && activeCheckIndex < 2) setActiveCheckIndex(2);
    if (progress > 80 && activeCheckIndex < 3) setActiveCheckIndex(3);
  }, [progress, activeCheckIndex]);

  // SVG Circular Gauge Calculations
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#F6DBEE] via-[#F9EDF6] to-[#FCF5FA] py-8 px-4 flex flex-col justify-center items-center font-body text-[#1F121C]">
      
      <div className="relative z-10 w-full max-w-md mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Card Container */}
        <div className="bg-white rounded-[26px] p-6 sm:p-8 shadow-xl border border-[#F0DCEB] text-center space-y-6 quiz-card overflow-hidden">
          
          {/* CIRCULAR GAUGE METER */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            {/* SVG Circle Progress Arc */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Track Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-[#F0DCEB]"
                strokeWidth="9"
                fill="transparent"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-[#E63988] transition-all duration-300 ease-out"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Glowing Inner Core with Counter & Icon */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-b from-[#FDF2F8] to-[#F9EDF6] flex flex-col items-center justify-center border-2 border-[#F0DCEB] shadow-inner">
              <Zap className="w-6 h-6 text-[#E63988] fill-[#E63988] animate-pulse" />
              <span className="text-3xl font-black text-[#1F121C] font-heading tracking-tight leading-none mt-0.5">
                {progress}%
              </span>
              <span className="text-[9px] font-bold uppercase text-[#4A154B] tracking-wider font-heading">Protocolo IA</span>
            </div>

            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-[#E5A638] fill-[#E5A638] animate-bounce" />
          </div>

          <div className="space-y-2 font-heading">
            <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] border border-[#10B981]/40 text-[#059669] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-xs">
              <Activity className="w-3.5 h-3.5 text-[#10B981] animate-pulse" />
              Diagnóstico Biomecánico en Progreso
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#1F121C] leading-tight">
              Sincronizando Perfil Muscular...
            </h2>
            <p className="text-xs sm:text-sm text-[#635360] max-w-xs mx-auto font-medium leading-relaxed font-body">
              El algoritmo del Protocolo Glúteos Brasileños está calibrando tu diagnóstico personalizado.
            </p>
          </div>

          {/* TELEMETRY CHECKLIST */}
          <div className="bg-[#FDF4FA] rounded-2xl p-4 sm:p-5 border border-[#F0DCEB] text-left max-w-sm mx-auto space-y-3.5 shadow-xs">
            {checks.map((item, idx) => {
              const isDone = idx <= activeCheckIndex;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#10B981] shrink-0" />
                    ) : (
                      <Loader2 className="w-4.5 h-4.5 text-[#E63988] animate-spin shrink-0" />
                    )}
                    <span className={`text-xs font-bold ${isDone ? 'text-[#1F121C]' : 'text-[#968493]'}`}>
                      {item.label}
                    </span>
                  </div>
                  {isDone && (
                    <p className="text-[11px] text-[#059669] font-black pl-7 leading-tight">
                      ↳ {item.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-1 text-center flex items-center justify-center gap-1.5 text-xs font-medium text-[#968493]">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Procesamiento seguro de datos biomecánicos</span>
          </div>

        </div>
      </div>
    </div>
  );
}

