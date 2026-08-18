import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function FingerprintStep({ onScanComplete, currentStep, totalSteps }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [statusText, setStatusText] = useState("Toca y mantén presionado el sensor biométrico para iniciar el escaneo");

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
            setStatusText("¡Escaneo Biométrico Concluido! Calibrando plan...");
            setTimeout(() => {
              onScanComplete();
            }, 800);
            return 100;
          }
          if (next > 75) setStatusText("Finalizando matriz de activación muscular...");
          else if (next > 45) setStatusText("Analizando tipo de fibra de los glúteos y respuesta metabólica...");
          return next;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [scanning, progress, onScanComplete]);

  let buttonStyle = 'bg-white border-4 border-[#F0DCEB] text-[#E63988] hover:border-[#E63988] hover:shadow-md active:scale-95';
  if (completed) {
    buttonStyle = 'bg-[#ECFDF5] border-4 border-[#10B981] text-[#10B981] shadow-lg shadow-[#10B981]/20';
  } else if (scanning) {
    buttonStyle = 'bg-[#FDF2F8] border-4 border-[#E63988] text-[#E63988] shadow-xl shadow-[#E63988]/30 scale-105';
  }

  let progressStateLabel = '';
  if (completed) {
    progressStateLabel = 'CONCLUIDO';
  } else if (scanning) {
    progressStateLabel = 'ESCANEANDO...';
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#F6DBEE] via-[#F9EDF6] to-[#FCF5FA] py-6 flex flex-col justify-center items-center font-body text-[#1F121C]">
      <div className="relative z-10 mx-auto flex w-full max-w-[460px] flex-col px-4 space-y-3.5">
        
        <HeaderLogo />

        <div className="rounded-[28px] bg-white px-6 sm:px-8 pb-7 pt-8 shadow-xl border border-[#F0DCEB] animate-pop text-center space-y-3">
          
          <div className="inline-flex items-center gap-1.5 bg-[#FDF2F8] border border-[#F0DCEB] text-[#B81E64] text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs font-heading">
            <Sparkles className="w-3.5 h-3.5 text-[#E63988]" />
            <span>Calibración Biométrica</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-[#1F121C] font-heading">
            Escanea tu <span className="text-[#E63988]">Impronta Metabólica</span>
          </h1>

          <p className="text-xs sm:text-sm leading-relaxed text-[#635360] font-medium font-body">
            Toca o mantén presionado el sensor biométrico para calibrar tu rutina personalizada de 28 días.
          </p>

          <div className="mt-4 rounded-2xl border border-[#F0DCEB] bg-[#FDF4FA] p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            
            {/* Interactive Fingerprint Scanner Container */}
            <button
              type="button"
              onMouseDown={startScan}
              onTouchStart={startScan}
              onClick={startScan}
              className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${buttonStyle}`}
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
                  className="stroke-[#10B981] fill-none transition-all duration-150"
                  strokeWidth="6"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>

              {completed ? (
                <CheckCircle2 className="w-14 h-14 text-[#10B981] animate-bounce" />
              ) : (
                <Fingerprint className={`w-14 h-14 transition-transform ${scanning ? 'animate-pulse scale-110' : ''}`} />
              )}
            </button>

            {/* Live Scan Progress Status */}
            <div className="space-y-1 w-full max-w-xs font-heading">
              <span className="text-xs font-black text-[#1F121C] block">
                {progress}% {progressStateLabel}
              </span>
              <p className="text-[12px] font-bold text-[#4A154B] min-h-[36px] flex items-center justify-center">
                {statusText}
              </p>
            </div>

            {/* Instruction Tag */}
            {!scanning && !completed && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F8] text-[#B81E64] text-[11px] font-bold border border-[#F0DCEB] font-heading shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E63988]" /> Toca el sensor para iniciar
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 pt-1 text-[11px] font-medium text-[#968493]">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Escaneo 100% Seguro y Privado</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
