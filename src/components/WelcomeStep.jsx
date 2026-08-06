import React from 'react';
import { ArrowRight, ShieldCheck, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function WelcomeStep({ onStart }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#FFF9F6] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Hero Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-xl border border-[#F0E3E9] animate-pop space-y-5 quiz-card text-center relative overflow-hidden">
          
          {/* Top Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#FFE1EC] text-[#B71F58] border border-[#FF8EBA]/40 px-3.5 py-1.5 rounded-full text-xs font-bold font-heading tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3D7F]" />
            <span>ENTRENAMIENTO FEMENINO ESPECIALIZADO</span>
          </div>

          {/* Headline & Subheadline */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#171116] uppercase leading-tight tracking-tight font-heading">
              Desarrolla glúteos más firmes, elevados y definidos con el <span className="text-[#FF3D7F]">Protocolo Glúteos Brasileños</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5F525A] font-medium leading-relaxed">
              Sigue un plan progresivo de entrenamiento diseñado para activar correctamente tus glúteos, mejorar tu técnica y construir resultados reales desde casa o en el gimnasio.
            </p>
          </div>

          {/* Quick Benefits Checklist */}
          <div className="grid grid-cols-2 gap-2 text-left bg-[#FFF0F5] p-3.5 rounded-2xl border border-[#DFC9D3]/50 text-xs font-semibold text-[#171116]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#32B768] shrink-0" />
              <span>Rutinas paso a paso</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#32B768] shrink-0" />
              <span>Casa o gimnasio</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#32B768] shrink-0" />
              <span>Vídeos explicativos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#32B768] shrink-0" />
              <span>Para principiantes</span>
            </div>
          </div>

          {/* Direct Call to Action */}
          <div className="space-y-3 pt-1">
            <p className="text-xs sm:text-sm font-extrabold text-[#5B163A] uppercase tracking-wider font-heading">
              ¡RESPONDE EL TEST RÁPIDO Y OBTÉN TU PROTOCOLO!
            </p>

            {/* CTA Button in Rosa Energía Gradient */}
            <button
              type="button"
              onClick={onStart}
              className="w-full py-4 sm:py-5 px-6 rounded-[14px] bg-gradient-to-r from-[#FF3D7F] to-[#D92667] hover:brightness-105 text-white font-extrabold text-lg sm:text-xl shadow-[0_10px_24px_rgba(217,38,103,0.32)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group leading-none uppercase tracking-wide font-heading"
            >
              <span>QUIERO EMPEZAR EL PROTOCOLO</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

            {/* Microcopy Security Guarantee */}
            <p className="text-[11px] font-medium text-[#8C7D86] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#32B768]" />
              <span>Acceso inmediato • Pago seguro • Garantía de 7 días</span>
            </p>
          </div>

          {/* Rating & Social Proof */}
          <div className="pt-2 border-t border-[#F0E3E9] flex items-center justify-center gap-3 text-xs text-[#5F525A]">
            <div className="flex items-center gap-0.5 text-[#D9A441]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={`welcome-star-${i + 1}`} className="w-4 h-4 fill-[#D9A441]" />
              ))}
            </div>
            <span className="font-bold text-[#171116]">4.9/5</span>
            <span className="text-[#8C7D86]">| +14,800 alumnas satisfechas</span>
          </div>

        </div>

      </div>
    </div>
  );
}
