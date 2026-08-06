import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function WelcomeStep({ onStart }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#022C22] py-8 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Clean Hero Card */}
        <div className="bg-white rounded-[32px] p-6 sm:p-9 shadow-2xl border border-emerald-100 animate-pop space-y-6 quiz-card text-center">
          
          {/* Headline inspired directly by image reference */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-950 uppercase leading-snug tracking-tight">
              TRANSFORMA TUS GLÚTEOS EN APENAS <span className="text-[#EA580C]">28 DÍAS</span> Y CON APENAS <span className="text-[#EA580C]">8 MINUTOS POR DÍA</span> 🍑
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-bold">
              ¡Sin necesidad de gimnasio ni cirugías!
            </p>
          </div>

          {/* Direct CTA Instructional Copy */}
          <div className="space-y-2 pt-2">
            <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
              ¡Responde el test rápido y recibe ya tu entrenamiento personalizado!
            </p>
            <p className="text-xs sm:text-sm font-black text-[#EA580C] uppercase tracking-wider">
              ¡TOCA EL BOTÓN DE ABAJO!
            </p>
            <div className="text-2xl animate-bounce pt-1">
              👇🏼👇🏼👇🏼
            </div>
          </div>

          {/* CTA Start Button */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={onStart}
              className="w-full py-5 sm:py-6 px-8 rounded-2xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xl sm:text-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group leading-none uppercase tracking-wider"
            >
              <span>¡EMPEZAR AHORA!</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

            {/* Attention Pill Footer */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 rounded-full text-xs font-medium shadow-sm">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-600 shrink-0" />
              <span>Atención: Solo un test gratuito por persona</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
