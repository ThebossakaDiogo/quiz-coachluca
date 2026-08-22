import React from 'react';
import { ArrowRight, ShieldCheck, Star, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function WelcomeStep({ onStart }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#240828] via-[#1A041E] to-[#120215] py-6 px-3.5 sm:px-5 flex flex-col justify-center items-center font-body text-white">
      
      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* HERO CARD - MOBILE APP MODERN STYLE */}
        <div className="bg-[#240828] rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#4C1450] animate-pop space-y-5 text-center quiz-card relative overflow-hidden">
          
          {/* Top Status Header Pill in Shock Yellow / Pink Glow */}
          <div className="inline-flex items-center gap-1.5 bg-[#FFE600] text-[#19041C] border-2 border-[#FFE600] px-4 py-1.5 rounded-full text-xs font-black font-heading tracking-wide uppercase shadow-[2px_2px_0px_#FF2A85]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2A85] fill-[#19041C]" />
            <span>ENTRENAMIENTO FEMENINO ESPECIALIZADO</span>
          </div>

          {/* Headline & Subheadline */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight tracking-tight font-heading">
              Desarrolla glúteos más firmes, elevados y definidos con el <span className="text-[#FF2A85]">Protocolo Glúteos Brasileños</span>
            </h1>

            <p className="text-sm sm:text-base text-[#D4BCD0] font-medium leading-relaxed">
              Sigue un plan progresivo de entrenamiento diseñado para activar correctamente tus glúteos, mejorar tu técnica y construir resultados reales desde casa o en el gimnasio.
            </p>
          </div>

          {/* Quick Benefits Checklist */}
          <div className="grid grid-cols-2 gap-2.5 text-left bg-[#1A041E] p-4 rounded-2xl border border-[#4C1450] text-xs font-bold text-white">
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
            <p className="text-xs sm:text-sm font-black text-[#FFE600] uppercase tracking-wider font-heading flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FFE600] fill-[#FFE600] drop-shadow-xs" />
              <span>¡RESPONDE EL TEST RÁPIDO Y OBTÉN TU PROTOCOLO!</span>
            </p>

            {/* CTA Button in Vibrant Hot Pink / Coral & Yellow Glow */}
            <button
              type="button"
              onClick={onStart}
              className="w-full py-4 sm:py-5 px-6 rounded-[20px] bg-gradient-to-r from-[#FF2A85] via-[#FF007F] to-[#FF3377] hover:brightness-110 text-white font-black text-lg sm:text-xl shadow-[0_12px_28px_rgba(255,42,133,0.45)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
            >
              <span>QUIERO EMPEZAR EL PROTOCOLO</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>

            {/* Microcopy Security Guarantee */}
            <p className="text-[11px] font-medium text-[#A890A4] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Acceso inmediato • Pago seguro • Garantía de 7 días</span>
            </p>
          </div>

          {/* Rating & Social Proof */}
          <div className="pt-2 border-t border-[#4C1450] flex items-center justify-center gap-3 text-xs text-[#D4BCD0]">
            <div className="flex items-center gap-0.5 text-[#FFB800]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={`welcome-star-${i + 1}`} className="w-4 h-4 fill-[#FFB800]" />
              ))}
            </div>
            <span className="font-black text-white">4.9/5</span>
            <span className="text-[#A890A4]">| +14,800 alumnas satisfechas</span>
          </div>

        </div>

      </div>
    </div>
  );
}

