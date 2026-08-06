import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, ShieldCheck, Zap, Activity } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AnalyzingStep({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);

  const checks = [
    { label: "Analizando mapa neuromuscular y perfil de edad...", detail: "Fibras musculares rápidas de alta respuesta identificadas" },
    { label: "Evaluando consistencia y nivel de compromiso (100%)...", detail: "Nivel de disciplina cualificado con grado ELITE" },
    { label: "Calculando índice de respuesta glútea profunda (96%)...", detail: "Potencial de crecimiento estimado: +5.2 cm en 28 Días" },
    { label: "¡ANÁLISIS CONCLUIDO! Generando tu Diagnóstico Exclusivo ✨...", detail: "Perfil 96% compatible liberado para tu plan en casa" },
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
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#022C22] py-8 px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      <div className="relative z-10 w-full max-w-md mx-auto space-y-5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Card Container */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-emerald-100 text-center space-y-6 quiz-card overflow-hidden">
          
          {/* CIRCULAR GAUGE METER */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            {/* SVG Circle Progress Arc */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Track Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-amber-100"
                strokeWidth="9"
                fill="transparent"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-[#EA580C] transition-all duration-300 ease-out"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Glowing Inner Core with Counter & Icon */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-b from-amber-50 to-emerald-50 flex flex-col items-center justify-center border-2 border-amber-300 shadow-inner">
              <Zap className="w-6 h-6 text-[#EA580C] fill-[#EA580C] animate-pulse" />
              <span className="text-3xl font-black text-slate-950 font-mono tracking-tight leading-none mt-0.5">
                {progress}%
              </span>
              <span className="text-[9px] font-black uppercase text-emerald-800 tracking-wider">Algoritmo IA</span>
            </div>

            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-amber-500 fill-amber-500 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm">
              <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              Diagnóstico Biomecánico IA en Progreso
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
              Sincronizando Perfil Muscular...
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto font-semibold leading-relaxed">
              El algoritmo inteligente del Coach Luca está calibrando tu plan personalizado en casa.
            </p>
          </div>

          {/* TELEMETRY CHECKLIST */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left max-w-sm mx-auto space-y-3.5 shadow-sm">
            {checks.map((item, idx) => {
              const isDone = idx <= activeCheckIndex;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    ) : (
                      <Loader2 className="w-4.5 h-4.5 text-amber-500 animate-spin shrink-0" />
                    )}
                    <span className={`text-xs font-black ${isDone ? 'text-slate-950' : 'text-slate-400'}`}>
                      {item.label}
                    </span>
                  </div>
                  {isDone && (
                    <p className="text-[11px] text-emerald-700 font-extrabold pl-7 leading-tight">
                      ↳ {item.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-1 text-center flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Procesamiento seguro de datos biomecánicos</span>
          </div>

        </div>
      </div>
    </div>
  );
}
