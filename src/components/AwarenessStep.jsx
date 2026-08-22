import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowLeft, Bookmark } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AwarenessStep({ stepData, onSelectOption, onPrevStep, currentStep, totalSteps }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#240828] via-[#1A041E] to-[#120215] py-5 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-white">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* QUIZ TOP BAR */}
        <div className="flex items-center justify-between px-1">
          {onPrevStep ? (
            <button
              type="button"
              onClick={onPrevStep}
              className="w-10 h-10 rounded-full bg-[#240828] backdrop-blur-md shadow-md border border-[#4C1450] text-white flex items-center justify-center transition-all hover:bg-[#340E39] hover:scale-105 active:scale-95 cursor-pointer"
              title="Volver a la pregunta anterior"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <div className="w-10 h-10" />
          )}

          <div className="text-center">
            <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#240828] backdrop-blur-md shadow-md border border-[#4C1450] text-[#FF2A85] flex items-center justify-center">
            <Bookmark className="w-4 h-4 fill-[#FF2A85]/20 stroke-[2.2]" />
          </div>
        </div>

        {/* MAIN QUESTION CARD */}
        <div className="relative rounded-[26px] p-6 text-center text-white shadow-[0_16px_36px_-8px_rgba(255,42,133,0.40)] quiz-question-banner overflow-hidden animate-pop">
          <div className="inline-flex items-center gap-1.5 bg-[#FFE600] text-[#19041C] border-2 border-[#FFE600] text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-2.5 shadow-[2px_2px_0px_#FF2A85] font-heading">
            <AlertTriangle className="w-3 h-3 text-[#FF2A85] fill-[#19041C]" />
            <span>Información Importante</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-snug tracking-tight font-heading drop-shadow-xs">
            ¿Por qué entrenas duro y tus glúteos <span className="underline decoration-[#FFE600]">no reaccionan</span>? 🧐
          </h2>
        </div>

        {/* MAIN WHITE CARD CONTAINER */}
        <div className="bg-[#240828] rounded-[26px] p-5 sm:p-6 shadow-2xl border border-[#4C1450] space-y-4 quiz-card text-center animate-pop">
          
          {/* EDUCATIONAL INSIGHT BOX */}
          <div className="space-y-3 text-left">
            
            {/* AMNESIA GLUTAEA HIGHLIGHT BOX */}
            <div className="bg-[#1A041E] rounded-[18px] p-4 border border-[#4C1450] space-y-1 shadow-2xs">
              <span className="text-xs font-black text-[#FF2A85] block uppercase tracking-wider font-heading">
                ⚠️ El 95% de las mujeres sufre de la falta de activación glútea
              </span>
              <p className="text-xs sm:text-sm text-[#D4BCD0] font-medium leading-relaxed">
                El cuerpo desactiva la musculatura central y transfiere el esfuerzo hacia la espalda baja y los muslos.
              </p>
            </div>

            {/* KEY RESULT EXPLANATION */}
            <div className="bg-[#1A041E] rounded-[18px] p-4 border border-[#4C1450] space-y-1 shadow-2xs">
              <p className="text-xs sm:text-sm text-[#D4BCD0] font-medium leading-relaxed">
                <strong className="text-white font-black">Resultado:</strong> Tu entrenamiento te cansa, pero <span className="text-[#FF2A85] font-black">NO levanta</span>. No es falta de esfuerzo — <u className="decoration-[#FF2A85] font-black decoration-2">es un problema de activación neuromuscular</u>.
              </p>
            </div>

            {/* GOOD NEWS BOX WITH VIBRANT GRADIENT */}
            <div className="bg-gradient-to-r from-[#1A041E] via-[#2E0832] to-[#140217] text-white rounded-[18px] p-4 space-y-1 shadow-md border border-[#FFE600]/30">
              <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-[#FFE600] font-heading">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                La Buena Noticia:
              </span>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                Esto se puede reprogramar por completo con la estimulación progresiva del <span className="underline font-bold text-[#FFE600]">Protocolo Glúteos Brasileños 🇧🇷</span>.
              </p>
            </div>

          </div>

          {/* INTERACTIVE CHOICE BUTTONS */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-black text-white uppercase tracking-wider block font-heading">
              ¿Conocías este fenómeno de activación?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* BUTTON 1 */}
              <button
                type="button"
                onClick={() => onSelectOption('ya_lo_sabia')}
                className="w-full py-4 px-5 rounded-[18px] bg-[#340E39] hover:bg-[#4C1450] text-white font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group font-heading border border-[#FFE600]/40"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🧐</span>
                <span>✅ Ya lo sabía</span>
              </button>

              {/* BUTTON 2 */}
              <button
                type="button"
                onClick={() => onSelectOption('no_lo_sabia')}
                className="w-full py-4 px-5 rounded-[18px] bg-gradient-to-r from-[#FF2A85] via-[#FF007F] to-[#FF3377] hover:brightness-110 text-white font-black text-sm sm:text-base shadow-[0_8px_20px_rgba(255,42,133,0.45)] flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group font-heading"
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

