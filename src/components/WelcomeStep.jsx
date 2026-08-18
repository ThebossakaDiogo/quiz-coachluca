import React from 'react';
import { ArrowRight, ShieldCheck, Star, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function WelcomeStep({ onStart }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#F6DBEE] via-[#F9EDF6] to-[#FCF5FA] py-6 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-[#1F121C]">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* HERO CARD - MOBILE APP MODERN STYLE */}
        <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-xl border border-[#F0DCEB] animate-pop space-y-5 text-center quiz-card relative overflow-hidden">
          
          {/* Top Status Header Pill */}
          <div className="inline-flex items-center gap-1.5 bg-[#FDF2F8] text-[#B81E64] border border-[#F0DCEB] px-4 py-1.5 rounded-full text-xs font-extrabold font-heading tracking-wide uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E63988]" />
            <span>ENTRENAMIENTO FEMENINO ESPECIALIZADO</span>
          </div>

          {/* Headline & Subheadline */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1F121C] uppercase leading-tight tracking-tight font-heading">
              Desarrolla glúteos más firmes, elevados y definidos con el <span className="text-[#E63988]">Protocolo Glúteos Brasileños</span>
            </h1>

            <p className="text-sm sm:text-base text-[#635360] font-medium leading-relaxed">
              Sigue un plan progresivo de entrenamiento diseñado para activar correctamente tus glúteos, mejorar tu técnica y construir resultados reales desde casa o en el gimnasio.
            </p>
          </div>

          {/* Quick Benefits Checklist */}
          <div className="grid grid-cols-2 gap-2.5 text-left bg-[#FDF4FA] p-4 rounded-2xl border border-[#F0DCEB] text-xs font-bold text-[#1F121C]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Rutinas paso a paso</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Casa o gimnasio</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Vídeos explicativos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Para principiantes</span>
            </div>
          </div>

          {/* Direct Call to Action */}
          <div className="space-y-3 pt-1">
            <p className="text-xs sm:text-sm font-extrabold text-[#4A154B] uppercase tracking-wider font-heading flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FF7051] fill-[#FF7051]" />
              <span>¡RESPONDE EL TEST RÁPIDO Y OBTÉN TU PROTOCOLO!</span>
            </p>

            {/* CTA Button in Vibrant Magenta/Coral Gradient */}
            <button
              type="button"
              onClick={onStart}
              className="w-full py-4 sm:py-5 px-6 rounded-[20px] bg-gradient-to-r from-[#FF7051] via-[#E63988] to-[#D8387D] hover:brightness-105 text-white font-black text-lg sm:text-xl shadow-[0_12px_28px_rgba(230,57,136,0.32)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
            >
              <span>QUIERO EMPEZAR EL PROTOCOLO</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

            {/* Microcopy Security Guarantee */}
            <p className="text-[11px] font-medium text-[#968493] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Acceso inmediato • Pago seguro • Garantía de 7 días</span>
            </p>
          </div>

          {/* Rating & Social Proof */}
          <div className="pt-2 border-t border-[#F0DCEB] flex items-center justify-center gap-3 text-xs text-[#635360]">
            <div className="flex items-center gap-0.5 text-[#E5A638]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={`welcome-star-${i + 1}`} className="w-4 h-4 fill-[#E5A638]" />
              ))}
            </div>
            <span className="font-bold text-[#1F121C]">4.9/5</span>
            <span className="text-[#968493]">| +14,800 alumnas satisfechas</span>
          </div>

        </div>

      </div>
    </div>
  );
}

