import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, ShieldCheck, Zap, Activity } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AnalyzingStep({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);

  const checks = [
    { label: "Analisando mapa neuromuscular e perfil de idade...", detail: "Fibras musculares rápidas de alta resposta identificadas" },
    { label: "Avaliando consistência e nível de comprometimento (100%)...", detail: "Nível de disciplina qualificado com grau ELITE" },
    { label: "Calculando índice de resposta glútea profunda (96%)...", detail: "Potencial de crescimento estimado: +5.2 cm em 28 Dias" },
    { label: "ANÁLISE CONCLUÍDA! Gerando seu Diagnóstico Exclusivo ✨...", detail: "Perfil 96% compatível liberado para seu plano em casa" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        return prev + 4;
      });
    }, 120);

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
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#090412] via-[#0D1F2D] to-[#041C1A] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-white">
      
      {/* Ambient Glowing Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Card Container */}
        <div className="relative bg-[#121320]/90 backdrop-blur-2xl rounded-[36px] p-6 sm:p-8 shadow-2xl border border-teal-500/30 animate-pop text-center space-y-6 quiz-card overflow-hidden">
          
          {/* Holographic Scanline Effect */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline pointer-events-none z-10" />

          {/* FUTURISTIC CIRCULAR SVG ARC GAUGE METER WITH AI BOT AVATAR CORE */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            {/* SVG Circle Progress Arc */}
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Track Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-purple-950/80"
                strokeWidth="9"
                fill="transparent"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-cyan-400 transition-all duration-300 ease-out"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Glowing Inner Core with Counter & Coach Icon */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-b from-[#1C1D30] to-[#0E1524] flex flex-col items-center justify-center border border-cyan-500/40 shadow-2xl">
              <Zap className="w-6 h-6 text-cyan-400 fill-cyan-400 animate-pulse" />
              <span className="text-3xl font-black text-white font-mono tracking-tight leading-none mt-0.5">
                {progress}%
              </span>
              <span className="text-[9px] font-black uppercase text-teal-300 tracking-wider">Algoritmo IA</span>
            </div>

            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-cyan-300 fill-cyan-300 animate-bounce" />
          </div>

          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 bg-teal-950/60 border border-teal-500/40 text-teal-200 text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Diagnóstico Biomecânico IA em Progresso
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Sincronizando Perfil Muscular...
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xs mx-auto font-medium leading-relaxed">
              O algoritmo inteligente do Coach Luca está calibrando o seu plano personalizado em casa.
            </p>
          </div>

          {/* TELEMETRY CHECKLIST WITH LIVE DETAIL BADGES */}
          <div className="bg-[#181928]/90 rounded-3xl p-4 sm:p-5 border border-teal-500/30 text-left max-w-sm mx-auto space-y-3.5 shadow-xl">
            {checks.map((item, idx) => {
              const isDone = idx <= activeCheckIndex;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
                    ) : (
                      <Loader2 className="w-4.5 h-4.5 text-purple-400 animate-spin shrink-0" />
                    )}
                    <span className={`text-xs font-black ${isDone ? 'text-white' : 'text-purple-300/60'}`}>
                      {item.label}
                    </span>
                  </div>
                  {isDone && (
                    <p className="text-[11px] text-cyan-300 font-extrabold pl-7 leading-tight">
                      ↳ {item.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-1 text-center flex items-center justify-center gap-1.5 text-xs font-semibold text-teal-200">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Processamento seguro de dados biomecânicos</span>
          </div>

        </div>
      </div>
    </div>
  );
}
