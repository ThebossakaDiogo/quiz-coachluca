import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Flame, 
  Star, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Zap, 
  Gift, 
  Users, 
  Lock,
  Tag,
  BadgeCheck,
  AlertTriangle
} from 'lucide-react';
import { TESTIMONIALS, BEFORE_AFTER_CASES, ASSETS, CHECKOUT_URL } from '../data/quizData';
import { trackCheckoutClick } from '../utils/pixel';
import HeaderLogo from './HeaderLogo';
import DiagnosticReportCard from './DiagnosticReportCard';

export default function ResultStep({ userAnswers }) {
  const selectedAge = userAnswers[2] || "30-39";
  const [timeLeft, setTimeLeft] = useState(599); // 09:59 countdown
  const [recentBuyer, setRecentBuyer] = useState(null);

  // REAL-TIME RECENT BUYERS POP-UP NOTIFICATIONS
  const buyersList = [
    { name: 'Juliana M.', city: 'Madrid - España', time: 'hace 1 min' },
    { name: 'Carolina R.', city: 'Buenos Aires - Argentina', time: 'hace 2 min' },
    { name: 'Fernanda S.', city: 'Ciudad de México - México', time: 'hace 3 min' },
    { name: 'Patrícia A.', city: 'Bogotá - Colombia', time: 'hace 4 min' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let index = 0;
    // Show next buyer notification every 8 seconds
    const popupInterval = setInterval(() => {
      setRecentBuyer(buyersList[index % buyersList.length]);
      index++;
      setTimeout(() => setRecentBuyer(null), 4000);
    }, 8000);

    return () => clearInterval(popupInterval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#022C22] py-8 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      {/* LIVE SOCIAL PROOF POP-UP NOTIFICATION */}
      {recentBuyer && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-950/95 text-white border border-amber-400 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs animate-pop">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black shrink-0">
            ✓
          </div>
          <div>
            <p className="font-extrabold text-white leading-tight">
              {recentBuyer.name} <span className="text-amber-300 font-normal">({recentBuyer.city})</span>
            </p>
            <p className="text-[10px] text-amber-200 font-bold">
              Obtuvo el plan de <span className="underline font-black">$ 9,90</span> {recentBuyer.time} 🎉
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* GATILHO DE URGÊNCIA E ESCASSEZ NO TOPO */}
        <div className="bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 text-white rounded-2xl p-2.5 px-3.5 shadow-xl flex items-center justify-between text-xs font-black border border-amber-300/40 animate-pulse">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0" />
            <span>⚠️ ATENCIÓN: SOLO QUEDAN 2 PLAZAS A ESTE PRECIO</span>
          </span>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-amber-300 font-black text-xs">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-[32px] p-5 sm:p-7 shadow-2xl border border-emerald-100 animate-pop space-y-6 quiz-card">
          
          {/* Top Badge Banner */}
          <div className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#15803D] text-white rounded-3xl p-5 text-center space-y-2 shadow-xl relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <span className="inline-flex items-center gap-1.5 bg-amber-400/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              Diagnóstico de Perfil Completo
            </span>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              Tu Plan Personalizado de Alta Respuesta
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              Calibrado a medida para tu rango de edad <span className="font-bold underline decoration-amber-300">{selectedAge}</span>
            </p>
          </div>

          {/* DIAGNOSTIC REPORT DASHBOARD CARD */}
          <DiagnosticReportCard userAnswers={userAnswers} />

          {/* $ 9,90 LUXURY GOLD DISCOUNT UNLOCKED BANNER */}
          <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-3xl p-5 shadow-xl shadow-amber-500/20 text-center space-y-2.5 border-2 border-amber-200 animate-pop">
            <div className="inline-flex items-center gap-1.5 bg-slate-950 text-amber-300 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
              <Tag className="w-4 h-4 text-amber-300 fill-amber-300" />
              CUPÓN EXCLUSIVO APLICADO (#BRASIL990)
            </div>
            
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="text-lg sm:text-xl font-bold text-amber-900/70 line-through">
                $ 97,00
              </span>
              <div className="flex flex-col items-start">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-none">
                  $ 9,90
                </span>
                <span className="text-[11px] font-black text-slate-900 uppercase pt-0.5">¡Pago Único • Acceso Inmediato!</span>
              </div>
            </div>
            
            <p className="text-xs font-extrabold text-amber-950 bg-white/60 py-1.5 px-3 rounded-xl border border-amber-300/60 inline-block shadow-xs">
              🎉 ¡Ahorras $ 87,10 y pagas solo $ 9,90 por acceso completo de por vida!
            </p>
          </div>

          {/* APP PREVIEW BANNER */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-200 shadow-xl group">
            <img 
              src={ASSETS.gifs.sales1} 
              alt="Método Glúteos Brasileños App Preview" 
              className="w-full object-cover max-h-64 sm:max-h-72 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-amber-300/40">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              Acceso Inmediato en tu Móvil
            </div>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-amber-800">+4 a +7 cm</span>
              <span className="text-xs font-black text-amber-900 uppercase tracking-wide">Volumen Estimado</span>
            </div>
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-800">28 Días</span>
              <span className="text-xs font-black text-emerald-900 uppercase tracking-wide">Resultados Visibles</span>
            </div>
          </div>

          {/* STACK COMPLETO DE VALOR PERCEBIDO */}
          <div className="bg-gradient-to-br from-[#064E3B] via-slate-900 to-[#022C22] text-white rounded-3xl p-5 border-2 border-emerald-400/50 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-white text-base">Todo lo que vas a recibir en la App:</h3>
              </div>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-amber-400/30">
                Acceso De Por Vida
              </span>
            </div>

            {/* LISTA DE CONTEÚDOS COM VALOR INDIVIDUAL E CHECKS */}
            <div className="space-y-3">
              
              {/* ITEM 1 */}
              <div className="flex items-start justify-between gap-3 bg-slate-800/80 p-3 rounded-2xl border border-emerald-500/30">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-white block">📱 Aplicación Exclusiva Método Glúteos Brasileños</span>
                    <span className="text-[11px] text-emerald-200 block">Entrenamientos guiados en video directo en el celular</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">$ 197</span>
              </div>

              {/* ITEM 2 */}
              <div className="flex items-start justify-between gap-3 bg-slate-800/80 p-3 rounded-2xl border border-emerald-500/30">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-white block">🏋️‍♀️ Entrenamientos de 8 a 10 min/día con Coach Luca</span>
                    <span className="text-[11px] text-emerald-200 block">Activación neuromuscular profunda sin gimnasio</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">$ 147</span>
              </div>

              {/* ITEM 3 */}
              <div className="flex items-start justify-between gap-3 bg-slate-800/80 p-3 rounded-2xl border border-emerald-500/30">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-white block">🥗 Plan de Nutrición Activadora Anti-Flacidez</span>
                    <span className="text-[11px] text-emerald-200 block">Menú práctico para endurecer y dar volumen</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">$ 97</span>
              </div>

              {/* BÔNUS 1 */}
              <div className="flex items-start justify-between gap-3 bg-amber-950/80 p-3 rounded-2xl border border-amber-500/40">
                <div className="flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-amber-200 block">🎁 BONO 1: Protocolo Anti-Celulitis Exprés</span>
                    <span className="text-[11px] text-amber-300 block">Drenaje casero para suavidad de la piel en 7D</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">$ 67</span>
              </div>

              {/* BÔNUS 2 */}
              <div className="flex items-start justify-between gap-3 bg-amber-950/80 p-3 rounded-2xl border border-amber-500/40">
                <div className="flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-amber-200 block">🎁 BONO 2: Guía de Batidos Proteicos Caseros</span>
                    <span className="text-[11px] text-amber-300 block">Recetas deliciosas para consumir posentrenamiento</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">$ 47</span>
              </div>

              {/* BÔNUS 3 */}
              <div className="flex items-start justify-between gap-3 bg-amber-950/80 p-3 rounded-2xl border border-amber-500/40">
                <div className="flex items-start gap-2.5">
                  <Users className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-emerald-200 block">🎁 BONO 3: Grupo VIP de Alumnas & Soporte Directo</span>
                    <span className="text-[11px] text-emerald-300 block">Acompañamiento y motivación diaria</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">$ 97</span>
              </div>

            </div>

            {/* RESUMO FINAL DE ECONOMIA */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-emerald-500/50 space-y-2 text-center">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>VALOR TOTAL ACUMULADO:</span>
                <span className="text-red-400 line-through text-sm">$ 652,00</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base font-black text-amber-300">
                <span>TÚ PAGAS HOY SOLO:</span>
                <span className="text-2xl sm:text-3xl text-emerald-400 drop-shadow">$ 9,90</span>
              </div>
              <p className="text-[11px] font-extrabold text-emerald-200">
                ⚡ Ahorro Real de $ 642,10 (Obtienes 98% OFF)
              </p>
            </div>
          </div>

          {/* SEÇÃO DE PROVAS SOCIAIS */}
          <div className="space-y-3.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Resultados Reales de Alumnas</span>
              </h3>
              <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
                +12.000 Casos
              </span>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-3">
              {BEFORE_AFTER_CASES.map((item) => (
                <div key={item.id} className="group rounded-2xl overflow-hidden border border-emerald-200 bg-emerald-50/40 p-2 space-y-1.5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative rounded-xl overflow-hidden h-36 sm:h-44">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 right-2 bg-slate-950/85 text-white text-[10px] font-black px-2.5 py-0.5 rounded-lg backdrop-blur-md border border-white/20">
                      {item.tag}
                    </span>
                  </div>
                  <div className="px-1 space-y-0.5">
                    <p className="text-xs font-black text-slate-900 truncate">{item.title}</p>
                    <p className="text-[11px] text-emerald-700 font-extrabold">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEPOIMENTOS DE ALUNAS */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm sm:text-base">
                Historias de Éxito & Valoraciones
              </h4>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>4.9 / 5.0 (2.400+ Votos)</span>
              </div>
            </div>

            <div className="space-y-3">
              {TESTIMONIALS.map((item) => (
                <div key={item.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">{item.name}</h4>
                          <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                        </div>
                        <span className="text-[11px] text-slate-600 font-bold">
                          {item.age} • {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={`star-${item.id}-${i}`} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-medium">
                    "{item.text}"
                  </p>

                  <div className="pt-0.5">
                    <span className="inline-block bg-emerald-100 text-emerald-900 text-[11px] font-black px-3 py-0.5 rounded-lg border border-emerald-200">
                      ✓ {item.resultBadge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GARANTIA E SEGURANÇA */}
          <div className="bg-emerald-50 rounded-2xl p-4.5 border border-emerald-200 space-y-2 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-emerald-950">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span className="font-black text-xs sm:text-sm">Garantía Incondicional de 7 Días (Cero Riesgo)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Prueba el Método Glúteos Brasileños por solo $ 9,90 sin riesgo alguno. Si en 7 días no estás fascinada con los resultados, simplemente solicita la devolución y reembolsaremos el 100% de tus 9,90 inmediatamente.
            </p>
          </div>

          {/* HIGH-CONVERTING CTA BUTTON */}
          <div className="space-y-3 pt-2">
            <a
              href={CHECKOUT_URL}
              target="_self"
              rel="noopener noreferrer"
              onClick={trackCheckoutClick}
              className="w-full py-5 sm:py-6 px-8 rounded-2xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xl sm:text-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wider text-center no-underline"
            >
              <Flame className="w-7 h-7 text-yellow-300 fill-yellow-300 shrink-0" />
              <span>¡OBTENER MI PLAN POR $ 9,90!</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </a>

            <div className="flex items-center justify-center gap-4 text-slate-500 text-xs font-bold pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Pago 100% Seguro
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> Acceso Inmediato
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
