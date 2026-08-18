import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowLeft, Bookmark } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AwarenessStep({ stepData, onSelectOption, onPrevStep, currentStep, totalSteps }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#F6DBEE] via-[#F9EDF6] to-[#FCF5FA] py-5 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-[#1F121C]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* QUIZ TOP BAR */}
        <div className="flex items-center justify-between px-1">
          {onPrevStep ? (
            <button
              type="button"
              onClick={onPrevStep}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-[#F0DCEB] text-[#4A154B] flex items-center justify-center transition-all hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
              title="Volver a la pregunta anterior"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}

          <div className="text-center">
            <span className="font-heading font-extrabold text-sm sm:text-base text-[#4A154B] tracking-tight">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-[#F0DCEB] text-[#D8387D] flex items-center justify-center">
            <Bookmark className="w-4 h-4 fill-[#D8387D]/20 stroke-[2.2]" />
          </div>
        </div>

        {/* MAIN QUESTION CARD */}
        <div className="relative rounded-[26px] p-6 text-center text-white shadow-[0_16px_36px_-8px_rgba(216,56,125,0.35)] quiz-question-banner overflow-hidden animate-pop">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-2.5 shadow-xs font-heading">
            <AlertTriangle className="w-3 h-3 text-white fill-white" />
            <span>Información Importante</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight font-heading drop-shadow-xs">
            ¿Por qué entrenas duro y tus glúteos <span className="underline decoration-white/60">no reaccionan</span>? 🧐
          </h2>
        </div>

        {/* MAIN WHITE CARD CONTAINER */}
        <div className="bg-white rounded-[26px] p-5 sm:p-6 shadow-xl border border-[#F0DCEB] space-y-4 quiz-card text-center animate-pop">
          
          {/* EDUCATIONAL INSIGHT BOX */}
          <div className="space-y-3 text-left">
            
            {/* AMNESIA GLUTAEA HIGHLIGHT BOX */}
            <div className="bg-[#FDF2F8] rounded-[18px] p-4 border border-[#F0DCEB] space-y-1 shadow-2xs">
              <span className="text-xs font-black text-[#B81E64] block uppercase tracking-wider font-heading">
                ⚠️ El 95% de las mujeres sufre de la falta de activación glútea
              </span>
              <p className="text-xs sm:text-sm text-[#4A154B] font-medium leading-relaxed">
                El cuerpo desactiva la musculatura central y transfiere el esfuerzo hacia la espalda baja y los muslos.
              </p>
            </div>

            {/* KEY RESULT EXPLANATION */}
            <div className="bg-[#FDF4FA] rounded-[18px] p-4 border border-[#F0DCEB] space-y-1 shadow-2xs">
              <p className="text-xs sm:text-sm text-[#1F121C] font-medium leading-relaxed">
                <strong className="text-[#4A154B] font-bold">Resultado:</strong> Tu entrenamiento te cansa, pero <span className="text-[#E63988] font-black">NO levanta</span>. No es falta de esfuerzo — <u className="decoration-[#E63988] font-bold decoration-2">es un problema de activación neuromuscular</u>.
              </p>
            </div>

            {/* GOOD NEWS BOX WITH VIBRANT GRADIENT */}
            <div className="bg-gradient-to-r from-[#4A154B] to-[#2B0A2C] text-white rounded-[18px] p-4 space-y-1 shadow-md">
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-[#FFA5CD] font-heading">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                La Buena Noticia:
              </span>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                Esto se puede reprogramar por completo con la estimulación progresiva del <span className="underline font-bold text-[#FFA5CD]">Protocolo Glúteos Brasileños 🇧🇷</span>.
              </p>
            </div>

          </div>

          {/* INTERACTIVE CHOICE BUTTONS */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-bold text-[#968493] uppercase tracking-wider block font-heading">
              ¿Conocías este fenómeno de activación?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* BUTTON 1 */}
              <button
                type="button"
                onClick={() => onSelectOption('ya_lo_sabia')}
                className="w-full py-4 px-5 rounded-[18px] bg-[#4A154B] hover:bg-[#2B0A2C] text-white font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group font-heading"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🧐</span>
                <span>✅ Ya lo sabía</span>
              </button>

              {/* BUTTON 2 */}
              <button
                type="button"
                onClick={() => onSelectOption('no_lo_sabia')}
                className="w-full py-4 px-5 rounded-[18px] bg-gradient-to-r from-[#FF7051] via-[#E63988] to-[#D8387D] hover:brightness-105 text-white font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group font-heading"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">😱</span>
                <span>❌ ¡No lo sabía!</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

