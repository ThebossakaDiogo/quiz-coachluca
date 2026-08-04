import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle2, Lock, Sparkles } from 'lucide-react';

export default function FingerprintStep({ onScanComplete, currentStep, totalSteps }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [statusText, setStatusText] = useState("Toque e segure o sensor biométrico para iniciar o escaneamento");

  const startScan = () => {
    if (completed || scanning) return;
    setScanning(true);
    setStatusText("Escaneando perfil metabólico biométrico...");
  };

  useEffect(() => {
    let timer;
    if (scanning && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 4;
          if (next >= 100) {
            clearInterval(timer);
            setScanning(false);
            setCompleted(true);
            setStatusText("Escaneamento Biométrico Concluído! Calibrando plano...");
            setTimeout(() => {
              onScanComplete();
            }, 800);
            return 100;
          }
          if (next > 75) setStatusText("Finalizando matriz de ativação muscular...");
          else if (next > 45) setStatusText("Analisando tipo de fibra dos glúteos e resposta metabólica...");
          return next;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [scanning, progress, onScanComplete]);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#F22D8D] py-6 flex flex-col justify-center items-center font-sans antialiased">
      <div className="relative z-10 mx-auto flex w-full max-w-[460px] flex-col px-4">
        <div className="rounded-[28px] bg-white px-7 pb-7 pt-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)] animate-fade-in text-center">
          
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[#F22D8D]">
            Calibração Biométrica
          </p>

          <h1 className="mt-2 text-center text-[24px] sm:text-[26px] font-extrabold leading-[1.15] tracking-tight text-[#0F172A]">
            Escaneie sua <span className="text-[#F22D8D]">Impronta Metabólica</span>
          </h1>

          <p className="mt-2 text-center text-[13px] leading-[1.45] text-[#475569]">
            Toque ou clique no sensor biométrico abaixo para calibrar a sua rotina personalizada de 28 dias.
          </p>

          <div className="mt-6 rounded-2xl border border-[#F1D6E1] bg-[#FFFBFC] p-6 flex flex-col items-center justify-center space-y-4">
            
            {/* Interactive Fingerprint Scanner Container */}
            <button
              type="button"
              onMouseDown={startScan}
              onTouchStart={startScan}
              onClick={startScan}
              className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 ${
                completed
                  ? 'bg-emerald-50 border-4 border-[#22AA52] text-[#22AA52] shadow-lg shadow-emerald-500/20'
                  : scanning
                  ? 'bg-pink-50 border-4 border-[#F22D8D] text-[#F22D8D] shadow-xl shadow-pink-500/30 scale-105'
                  : 'bg-white border-4 border-[#F1D6E1] text-[#F22D8D] hover:border-[#F22D8D] hover:shadow-md active:scale-95'
              }`}
            >
              {/* Progress Ring Overlay */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-transparent fill-none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-[#22AA52] fill-none transition-all duration-150"
                  strokeWidth="6"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>

              {completed ? (
                <CheckCircle2 className="w-14 h-14 text-[#22AA52] animate-bounce" />
              ) : (
                <Fingerprint className={`w-14 h-14 transition-transform ${scanning ? 'animate-pulse scale-110' : ''}`} />
              )}
            </button>

            {/* Live Scan Progress Status */}
            <div className="space-y-1 w-full max-w-xs">
              <span className="text-xs font-extrabold text-[#0F172A] block">
                {progress}% {completed ? 'CONCLUÍDO' : scanning ? 'ESCANEANDO...' : ''}
              </span>
              <p className="text-[12px] font-medium text-[#64748B] min-h-[36px] flex items-center justify-center">
                {statusText}
              </p>
            </div>

            {/* Instruction Tag */}
            {!scanning && !completed && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/60 text-[#F22D8D] text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Toque no sensor para iniciar
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-6 pt-1 text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" />
              <span>Escaneamento 100% Seguro e Privado</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
