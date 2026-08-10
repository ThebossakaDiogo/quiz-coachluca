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
    <div className="relative min-h-dvh overflow-hidden bg-[#FFF9F6] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      {/* LIVE SOCIAL PROOF POP-UP NOTIFICATION */}
      {recentBuyer && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#320C22] text-white border border-[#FF8EBA]/40 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs animate-pop font-heading">
          <div className="w-8 h-8 rounded-full bg-[#32B768] flex items-center justify-center text-white font-black shrink-0">
            ✓
          </div>
          <div>
            <p className="font-extrabold text-white leading-tight">
              {recentBuyer.name} <span className="text-[#FF8EBA] font-normal">({recentBuyer.city})</span>
            </p>
            <p className="text-[10px] text-[#FFE1EC] font-bold">
              Obtuvo el protocolo de <span className="underline font-black">$ 19,90</span> {recentBuyer.time} 🎉
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* URGENCY ALERT BANNER */}
        <div className="bg-[#320C22] text-white rounded-2xl p-2.5 px-3.5 shadow-md flex items-center justify-between text-xs font-bold font-heading border border-[#FF8EBA]/40 animate-pulse">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#FF8EBA] shrink-0" />
            <span>⚠️ ATENCIÓN: SOLO QUEDAN 2 PLAZAS A ESTE PRECIO</span>
          </span>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-[#FF8EBA] font-black text-xs">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[24px] p-5 sm:p-7 shadow-xl border border-[#F0E3E9] animate-pop space-y-5 quiz-card">
          
          {/* Top Badge Banner */}
          <div className="bg-gradient-to-r from-[#5B163A] to-[#320C22] text-white rounded-[20px] p-5 text-center space-y-2 shadow-md relative overflow-hidden font-heading">
            <span className="inline-flex items-center gap-1.5 bg-[#FF3D7F]/30 border border-[#FF8EBA]/40 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#FFE1EC]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A441] fill-[#D9A441]" />
              Diagnóstico de Perfil Completo
            </span>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              Tu Protocolo Glúteos Brasileños
            </h2>
            <p className="text-xs sm:text-sm text-[#FFE1EC] font-medium font-body">
              Calibrado a medida para tu rango de edad <span className="font-bold underline decoration-[#FF3D7F]">{selectedAge}</span>
            </p>
          </div>

          {/* DIAGNOSTIC REPORT DASHBOARD CARD */}
          <DiagnosticReportCard userAnswers={userAnswers} />

          {/* $ 19,90 DISCOUNT UNLOCKED BANNER */}
          <div className="bg-gradient-to-r from-[#FFF4D9] to-[#FFF9F6] text-[#171116] rounded-[20px] p-5 shadow-lg text-center space-y-2.5 border-2 border-[#D9A441] animate-pop font-heading">
            <div className="inline-flex items-center gap-1.5 bg-[#5B163A] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
              <Tag className="w-4 h-4 text-[#D9A441] fill-[#D9A441]" />
              CUPÓN EXCLUSIVO APLICADO (#PGB1990)
            </div>
            
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="text-lg sm:text-xl font-bold text-[#8C7D86] line-through">
                $ 97,00
              </span>
              <div className="flex flex-col items-start">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FF3D7F] tracking-tight leading-none">
                  $ 19,90
                </span>
                <span className="text-[11px] font-bold text-[#5B163A] uppercase pt-0.5">¡Pago Único • Acceso Inmediato!</span>
              </div>
            </div>
            
            <p className="text-xs font-bold text-[#5B163A] bg-white py-1.5 px-3 rounded-xl border border-[#D9A441]/50 inline-block shadow-xs font-body">
              🎉 ¡Ahorras $ 77,10 y pagas solo $ 19,90 por acceso completo de por vida!
            </p>
          </div>

          {/* APP PREVIEW BANNER */}
          <div className="relative rounded-[20px] overflow-hidden border-2 border-[#F0E3E9] shadow-xl group">
            <img 
              src={ASSETS.gifs.sales1} 
              alt="Protocolo Glúteos Brasileños App Preview" 
              className="w-full object-cover max-h-64 sm:max-h-72 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-[#320C22]/90 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-[#FF8EBA]/40 font-heading">
              <Zap className="w-4 h-4 text-[#D9A441] fill-[#D9A441]" />
              Acceso Inmediato en tu Móvil
            </div>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#FFF0F5] p-3.5 rounded-2xl border border-[#FF8EBA]/40 text-center shadow-sm font-heading">
              <span className="block text-2xl sm:text-3xl font-black text-[#FF3D7F]">+4 a +7 cm</span>
              <span className="text-xs font-bold text-[#5B163A] uppercase tracking-wide">Volumen Estimado</span>
            </div>
            <div className="bg-[#FFF0F5] p-3.5 rounded-2xl border border-[#FF8EBA]/40 text-center shadow-sm font-heading">
              <span className="block text-2xl sm:text-3xl font-black text-[#FF3D7F]">28 Días</span>
              <span className="text-xs font-bold text-[#5B163A] uppercase tracking-wide">Resultados Visibles</span>
            </div>
          </div>

          {/* STACK COMPLETO DE VALOR PERCEBIDO */}
          <div className="bg-[#320C22] text-white rounded-[20px] p-5 border-2 border-[#5B163A] space-y-4 shadow-xl font-heading">
            <div className="flex items-center justify-between border-b border-[#5B163A] pb-3">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#D9A441]" />
                <h3 className="font-extrabold text-white text-base">Todo lo que vas a recibir en el Protocolo:</h3>
              </div>
              <span className="bg-[#FF3D7F]/20 text-[#FF8EBA] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-[#FF3D7F]/30">
                Acceso De Por Vida
              </span>
            </div>

            {/* LISTA DE CONTEÚDOS COM VALOR INDIVIDUAL E CHECKS */}
            <div className="space-y-3 font-body">
              
              {/* ITEM 1 */}
              <div className="flex items-start justify-between gap-3 bg-[#161014]/80 p-3 rounded-xl border border-[#5B163A]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#32B768] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-white block font-heading">📱 Aplicación Exclusiva PGB (Acceso Completo)</span>
                    <span className="text-[11px] text-[#FFE1EC] block">Entrenamientos guiados en vídeo paso a paso</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8C7D86] line-through shrink-0 font-heading">$ 97</span>
              </div>

              {/* ITEM 2 */}
              <div className="flex items-start justify-between gap-3 bg-[#161014]/80 p-3 rounded-xl border border-[#5B163A]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#32B768] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-white block font-heading">🏋️‍♀️ Rutinas de 8 a 10 min/día con Coach Luca</span>
                    <span className="text-[11px] text-[#FFE1EC] block">Activación neuromuscular progresiva sin gimnasio</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8C7D86] line-through shrink-0 font-heading">$ 67</span>
              </div>

              {/* ITEM 3 */}
              <div className="flex items-start justify-between gap-3 bg-[#161014]/80 p-3 rounded-xl border border-[#5B163A]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#32B768] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-white block font-heading">🥗 Guía Nutricional para Apoyar tus Entrenamientos</span>
                    <span className="text-[11px] text-[#FFE1EC] block">Plan práctico para volumen y firmeza glútea</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#8C7D86] line-through shrink-0 font-heading">$ 47</span>
              </div>

              {/* BÔNUS 1 */}
              <div className="flex items-start justify-between gap-3 bg-[#5B163A]/80 p-3 rounded-xl border border-[#FF8EBA]/40">
                <div className="flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-white block font-heading">🎁 BONO 1: Rutina Rápida de 15 Minutos</span>
                    <span className="text-[11px] text-[#FFE1EC] block">Para días con poco tiempo de entrenamiento</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#32B768] shrink-0 font-heading">GRATIS</span>
              </div>

              {/* BÔNUS 2 */}
              <div className="flex items-start justify-between gap-3 bg-[#5B163A]/80 p-3 rounded-xl border border-[#FF8EBA]/40">
                <div className="flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-white block font-heading">🎁 BONO 2: Calendario Imprimible de Progreso</span>
                    <span className="text-[11px] text-[#FFE1EC] block">Seguimiento de tu evolución en 28 días</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#32B768] shrink-0 font-heading">GRATIS</span>
              </div>

              {/* BÔNUS 3 */}
              <div className="flex items-start justify-between gap-3 bg-[#5B163A]/80 p-3 rounded-xl border border-[#FF8EBA]/40">
                <div className="flex items-start gap-2.5">
                  <Users className="w-5 h-5 text-[#FF8EBA] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-white block font-heading">🎁 BONO 3: Guía de Movilidad de Cadera y Piernas</span>
                    <span className="text-[11px] text-[#FFE1EC] block">Preparación articular para mejor ejecución</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#32B768] shrink-0 font-heading">GRATIS</span>
              </div>

            </div>

            {/* RESUMO FINAL DE ECONOMIA */}
            <div className="bg-[#161014] rounded-xl p-4 border border-[#FF3D7F]/40 space-y-2 text-center">
              <div className="flex items-center justify-between text-xs font-bold text-[#8C7D86] font-heading">
                <span>VALOR TOTAL ACUMULADO:</span>
                <span className="text-[#8C7D86] line-through text-sm">$ 211,00</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base font-black text-[#D9A441] font-heading">
                <span>TÚ PAGAS HOY SOLO:</span>
                <span className="text-2xl sm:text-3xl text-[#FF3D7F] drop-shadow">$ 19,90</span>
              </div>
              <p className="text-[11px] font-bold text-[#FFE1EC]">
                ⚡ Ahorro Real de $ 191,10 (Obtienes Descuento de Lanzamiento)
              </p>
            </div>
          </div>

          {/* SEÇÃO DE PROVAS SOCIAIS */}
          <div className="space-y-3 pt-1 border-t border-[#F0E3E9]">
            <div className="flex items-center justify-between font-heading">
              <h3 className="font-black text-[#171116] text-base sm:text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FF3D7F]" />
                <span>Resultados Reales de Alumnas</span>
              </h3>
              <span className="text-xs font-bold bg-[#FFE1EC] text-[#B71F58] px-3 py-1 rounded-full border border-[#FF8EBA]/40">
                +14.800 Casos
              </span>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-3">
              {BEFORE_AFTER_CASES.map((item) => (
                <div key={item.id} className="group rounded-2xl overflow-hidden border border-[#F0E3E9] bg-[#FFF9F6] p-2 space-y-1.5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative rounded-xl overflow-hidden h-36 sm:h-44">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 right-2 bg-[#161014]/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-white/20 font-heading">
                      {item.tag}
                    </span>
                  </div>
                  <div className="px-1 space-y-0.5 text-left font-heading">
                    <p className="text-xs font-bold text-[#171116] truncate">{item.title}</p>
                    <p className="text-[11px] text-[#FF3D7F] font-extrabold">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEPOIMENTOS DE ALUNAS */}
          <div className="space-y-3 pt-1 font-heading">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[#171116] text-base sm:text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-[#D9A441] fill-[#D9A441]" />
                <span>Opiniones Verificadas de Alumnas</span>
              </h3>
            </div>

            <div className="space-y-3 font-body">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-[#FFF9F6] rounded-2xl p-4 border border-[#F0E3E9] text-left space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-heading">
                      <div className="w-8 h-8 rounded-full bg-[#FF3D7F] text-white font-black flex items-center justify-center text-xs">
                        {t.name[0]}
                      </div>
                      <div>
                        <span className="font-bold text-[#171116] text-xs sm:text-sm block">{t.name}</span>
                        <span className="text-[10px] text-[#8C7D86] font-medium">{t.location} • {t.age}</span>
                      </div>
                    </div>
                    <span className="bg-[#E4F7EB] text-[#21894A] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#32B768]/30 font-heading">
                      Alumna Verificada ✓
                    </span>
                  </div>
                  <p className="text-xs text-[#5F525A] font-medium leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* GARANTIA E SEGURANÇA */}
          <div className="bg-[#E4F7EB] rounded-2xl p-4.5 border border-[#32B768]/40 space-y-2 text-center shadow-sm font-heading">
            <div className="flex items-center justify-center gap-2 text-[#21894A]">
              <ShieldCheck className="w-5 h-5 text-[#32B768]" />
              <span className="font-bold text-xs sm:text-sm">Garantía de Satisfacción de 7 Días (Cero Riesgo)</span>
            </div>
            <p className="text-xs text-[#5F525A] leading-relaxed font-medium font-body">
              Prueba el Protocolo Glúteos Brasileños por solo $ 19,90 sin riesgo alguno. Si en 7 días no estás plenamente satisfecha con las rutinas, simplemente solicita la devolución y reembolsaremos el 100% de tu dinero inmediatamente.
            </p>
          </div>

          {/* HIGH-CONVERTING CTA BUTTON */}
          <div className="space-y-3 pt-1">
            <a
              href={CHECKOUT_URL}
              onClick={(e) => {
                e.preventDefault();
                trackCheckoutClick();
              }}
              className="w-full py-4 sm:py-5 px-6 rounded-[14px] bg-gradient-to-r from-[#FF3D7F] to-[#D92667] hover:brightness-105 text-white font-extrabold text-lg sm:text-xl shadow-[0_10px_24px_rgba(217,38,103,0.28)] flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading border-none text-center no-underline"
            >
              <Flame className="w-6 h-6 text-[#D9A441] fill-[#D9A441] shrink-0" />
              <span>QUIERO EMPEZAR EL PROTOCOLO</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </a>

            <div className="flex items-center justify-center gap-4 text-[#8C7D86] text-xs font-medium pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#FF3D7F]" /> Pago 100% Seguro
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#32B768]" /> Acceso Inmediato
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
