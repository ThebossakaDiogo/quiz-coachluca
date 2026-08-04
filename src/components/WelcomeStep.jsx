import React from 'react';
import { Flame, Sparkles, ArrowRight, ShieldCheck, Star, Clock } from 'lucide-react';
import { ASSETS } from '../data/quizData';
import HeaderLogo from './HeaderLogo';

export default function WelcomeStep({ onStart }) {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] py-8 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      {/* Dynamic Ambient Glowing Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#06B6D4]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A855F7]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Main Hero Card Container */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-[36px] p-6 sm:p-8 shadow-2xl border border-white/80 animate-pop space-y-6 quiz-card text-center">
          
          {/* Social Proof High-Conversion Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#7C3AED] text-white text-xs sm:text-sm font-black uppercase tracking-wide px-5 py-2 rounded-full shadow-lg shadow-teal-500/30 mx-auto">
            <Flame className="w-4.5 h-4.5 text-cyan-200 fill-cyan-200 animate-bounce" />
            <span>+12.400 Transformações este Ano</span>
          </div>

          {/* High-Converting Main Headline */}
          <div className="space-y-3.5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-[1.18] tracking-tight">
              Você quer empinar, arredondar e aumentar o bumbum em <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] via-[#0D9488] to-[#06B6D4]">28 Dias treinando em casa</span>? 🍑✨
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-md mx-auto font-semibold">
              Descubra o FitFlow Método 28D com o Coach Luca: estimulação neuromuscular profunda (8-10 min/dia) calibrada para o seu corpo. Sem academia, sem cargas pesadas e sem cirurgias.
            </p>
          </div>

          {/* HERO VISUAL BANNER / APP PREVIEW */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-purple-200 shadow-2xl group">
            <img 
              src={ASSETS.gifs.sales1} 
              alt="FitFlow Método 28D - Coach Luca Preview" 
              loading="eager"
              decoding="async"
              className="w-full object-cover max-h-64 sm:max-h-72 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md text-white text-xs sm:text-sm font-black p-3.5 rounded-2xl flex items-center justify-between shadow-xl border border-white/20">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-cyan-300 fill-cyan-300" />
                Treinos Personalizados no Celular
              </span>
              <span className="bg-gradient-to-r from-[#0D9488] to-[#06B6D4] text-white px-3 py-1 rounded-xl font-black text-xs shadow-md">28 Dias</span>
            </div>
          </div>

          {/* 3 Emotional Benefit Cards */}
          <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm font-black text-[#4C1D95] bg-gradient-to-br from-purple-50 via-teal-50/50 to-purple-50 p-4 sm:p-5 rounded-3xl border border-purple-100/90 shadow-inner">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl mb-1.5 leading-none">⏱️</span>
              <span className="leading-tight tracking-tight">8-10 min/dia</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl mb-1.5 leading-none">🏠</span>
              <span className="leading-tight tracking-tight">100% em Casa</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl mb-1.5 leading-none">🚀</span>
              <span className="leading-tight tracking-tight">Mudanças em 28D</span>
            </div>
          </div>

          {/* Social Proof Stars */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={`star-${i}`} className="w-4.5 h-4.5 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-black text-slate-900">4.9 / 5.0 Avaliações Reais (+2.400 Votos)</span>
          </div>

          {/* CTA Start Button */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={onStart}
              className="w-full py-5 sm:py-6 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#06B6D4] hover:from-[#097A70] hover:to-[#0891B2] text-white font-black text-lg sm:text-2xl shadow-2xl shadow-teal-500/40 flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group leading-snug tracking-normal drop-shadow-md"
            >
              <span className="drop-shadow">INICIAR MINHA AVALIAÇÃO GRATUITA!</span>
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform shrink-0" />
            </button>

            <div className="flex items-center justify-center gap-5 text-xs font-black text-slate-700 pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-600 shrink-0" /> Leva menos de 1 minuto
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" /> 100% Gratuito
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
