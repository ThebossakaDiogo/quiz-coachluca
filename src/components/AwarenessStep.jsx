import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AwarenessStep({ stepData, onSelectOption, onPrevStep, currentStep, totalSteps }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FFF9F6] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* MAIN CARD CONTAINER */}
        <div className="bg-white rounded-[24px] p-5 sm:p-7 shadow-xl border border-[#F0E3E9] animate-pop space-y-5 quiz-card text-center">
          
          {/* Top Eyebrow & Progress */}
          <div className="flex items-center justify-between text-xs font-heading">
            <div className="flex items-center gap-2">
              {onPrevStep && (
                <button
                  type="button"
                  onClick={onPrevStep}
                  className="w-8 h-8 rounded-full bg-[#FFF0F5] hover:bg-[#FFE1EC] text-[#5B163A] flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer border border-[#DFC9D3]"
                  title="Volver a la pregunta anterior"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
              <span className="inline-flex items-center gap-1.5 bg-[#FF3D7F] text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-white shrink-0" />
                Información Importante
              </span>
            </div>

            <span className="font-extrabold text-[#8C7D86] text-xs uppercase tracking-wider">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          {/* MAIN HEADLINE WITH HIGH IMPACT */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#171116] leading-tight tracking-tight font-heading">
              ¿Por qué entrenas duro y tus glúteos <span className="text-[#FF3D7F] underline decoration-[#FF8EBA]">no reaccionan</span>? 🧐
            </h2>
          </div>

          {/* EDUCATIONAL INSIGHT BOX */}
          <div className="space-y-3 text-left">
            
            {/* AMNESIA GLUTAEA HIGHLIGHT BOX */}
            <div className="bg-[#FFF0F5] rounded-[16px] p-4 border border-[#FF8EBA]/40 space-y-1 shadow-sm">
              <span className="text-xs font-bold text-[#B71F58] block uppercase tracking-wider font-heading">
                ⚠️ El 95% de las mujeres sufre de la falta de activación glútea
              </span>
              <p className="text-xs sm:text-sm text-[#5B163A] font-medium leading-relaxed">
                El cuerpo desactiva la musculatura central y transfiere el esfuerzo hacia la espalda baja y los muslos.
              </p>
            </div>

            {/* KEY RESULT EXPLANATION */}
            <div className="bg-[#FFF9F6] rounded-[16px] p-4 border border-[#F0E3E9] space-y-1 shadow-sm">
              <p className="text-xs sm:text-sm text-[#171116] font-medium leading-relaxed">
                <strong className="text-[#5B163A] font-bold">Resultado:</strong> Tu entrenamiento te cansa, pero <span className="text-[#FF3D7F] font-bold">NO levanta</span>. No es falta de esfuerzo — <u className="decoration-[#FF3D7F] font-bold decoration-2">es un problema de activación neuromuscular</u>.
              </p>
            </div>

            {/* GOOD NEWS BOX WITH VIBRANT WINE GRADIENT */}
            <div className="bg-gradient-to-r from-[#5B163A] to-[#320C22] text-white rounded-[16px] p-4 space-y-1 shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#FF8EBA] font-heading">
                <CheckCircle2 className="w-4 h-4 text-[#32B768] shrink-0" />
                La Buena Noticia:
              </span>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                Esto se puede reprogramar por completo con la estimulación progresiva del <span className="underline font-bold text-[#FF8EBA]">Protocolo Glúteos Brasileños 🇧🇷</span>.
              </p>
            </div>

          </div>

          {/* INTERACTIVE CHOICE BUTTONS */}
          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-bold text-[#8C7D86] uppercase tracking-wider block font-heading">
              ¿Conocías este fenómeno de activación?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* BUTTON 1: YA LO SABIA */}
              <button
                type="button"
                onClick={() => onSelectOption('ya_lo_sabia')}
                className="w-full py-4 px-5 rounded-[14px] bg-[#5B163A] hover:bg-[#320C22] text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group font-heading"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">🧐</span>
                <span>✅ Ya lo sabía</span>
              </button>

              {/* BUTTON 2: NO LO SABIA */}
              <button
                type="button"
                onClick={() => onSelectOption('no_lo_sabia')}
                className="w-full py-4 px-5 rounded-[14px] bg-gradient-to-r from-[#FF3D7F] to-[#D92667] hover:brightness-105 text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group font-heading"
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
