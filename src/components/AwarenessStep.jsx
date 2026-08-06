import React from 'react';
import { AlertTriangle, CheckCircle2, ArrowLeft } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function AwarenessStep({ stepData, onSelectOption, onPrevStep, currentStep, totalSteps }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#59D6CF] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* MAIN CARD CONTAINER */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-teal-100 animate-pop space-y-6 quiz-card text-center">
          
          {/* Top Eyebrow & Progress */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {onPrevStep && (
                <button
                  type="button"
                  onClick={onPrevStep}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer"
                  title="Volver a la pregunta anterior"
                >
                  <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
              <span className="inline-flex items-center gap-1.5 bg-[#E11D48] text-white font-semibold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-white shrink-0" />
                Información Importante
              </span>
            </div>

            <span className="font-bold text-slate-400 text-xs uppercase tracking-wider">
              Paso {currentStep}/{totalSteps}
            </span>
          </div>

          {/* MAIN HEADLINE WITH HIGH IMPACT */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-slate-950 leading-tight tracking-tight">
              ¿Por qué entrenas duro y tus glúteos <span className="text-[#E11D48] underline decoration-[#E11D48]/40">no reaccionan</span>? 🧐
            </h2>
          </div>

          {/* EDUCATIONAL INSIGHT BOX */}
          <div className="space-y-3.5 text-left">
            
            {/* AMNESIA GLUTAEA HIGHLIGHT BOX */}
            <div className="bg-rose-50/90 rounded-2xl p-4 border border-rose-200 space-y-1.5 shadow-sm">
              <span className="text-xs font-semibold text-rose-900 block uppercase tracking-wider">
                ⚠️ El 95% de las mujeres +30 sufren de "glúteo tímido"
              </span>
              <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                El cuerpo desactiva el glúteo central y transfiere el esfuerzo hacia la espalda baja y los muslos.
              </p>
            </div>

            {/* KEY RESULT EXPLANATION */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1 shadow-sm">
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                <strong className="text-slate-950 font-semibold">Resultado:</strong> Tu entrenamiento te cansa, pero <span className="text-[#E11D48] font-semibold">NO levanta</span>. No es falta de esfuerzo — <u className="decoration-[#E11D48] font-semibold decoration-2">es un problema de activación neuromuscular</u>.
              </p>
            </div>

            {/* GOOD NEWS BOX WITH VIBRANT MAGENTA STYLE */}
            <div className="bg-[#E11D48] text-white rounded-2xl p-4 space-y-1 shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 text-rose-100">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                La Buena Noticia:
              </span>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                Esto se puede reprogramar por completo sin gimnasio ni pesas pesadas — con la estimulación del <span className="underline font-semibold text-amber-200">Método Brazilian Booty 🇧🇷</span>.
              </p>
            </div>

          </div>

          {/* INTERACTIVE CHOICE BUTTONS WITH SOLID COLOR AND HIGH CONTRAST */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              ¿Conocías este fenómeno de activación?
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* BUTTON 1: YA LO SABIA */}
              <button
                type="button"
                onClick={() => onSelectOption('ya_lo_sabia')}
                className="w-full py-5 px-6 rounded-2xl bg-[#BE123C] hover:bg-[#9F1239] text-white font-bold text-base sm:text-lg shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🧐</span>
                <span>✅ Ya lo sabía</span>
              </button>

              {/* BUTTON 2: NO LO SABIA */}
              <button
                type="button"
                onClick={() => onSelectOption('no_lo_sabia')}
                className="w-full py-5 px-6 rounded-2xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-base sm:text-lg shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">😱</span>
                <span>❌ ¡No lo sabía!</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
