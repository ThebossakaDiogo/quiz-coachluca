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

export default function ResultStep({ userAnswers }) {
  const selectedAge = userAnswers[2] || "30-39";
  const [timeLeft, setTimeLeft] = useState(599); // 09:59 countdown
  const [recentBuyer, setRecentBuyer] = useState(null);

  // REAL-TIME RECENT BUYERS POP-UP NOTIFICATIONS
  const buyersList = [
    { name: 'Juliana M.', city: 'São Paulo - SP', time: 'há 1 min' },
    { name: 'Carolina R.', city: 'Rio de Janeiro - RJ', time: 'há 2 min' },
    { name: 'Fernanda S.', city: 'Belo Horizonte - MG', time: 'há 3 min' },
    { name: 'Patrícia A.', city: 'Curitiba - PR', time: 'há 4 min' },
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
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-[#6D28D9] via-[#0D9488] to-[#0F172A] py-8 px-3 sm:px-4 flex flex-col justify-center items-center font-nunito text-slate-800">
      
      {/* LIVE SOCIAL PROOF POP-UP NOTIFICATION */}
      {recentBuyer && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white border border-teal-400 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs animate-pop">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-cyan-400 flex items-center justify-center text-slate-950 font-black shrink-0">
            ✓
          </div>
          <div>
            <p className="font-extrabold text-white leading-tight">
              {recentBuyer.name} <span className="text-cyan-300 font-normal">({recentBuyer.city})</span>
            </p>
            <p className="text-[10px] text-teal-300 font-bold">
              Gantiu o plano de <span className="underline font-black">R$ 47,00</span> {recentBuyer.time} 🎉
            </p>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Modern Nunito Header Logo */}
        <HeaderLogo />

        {/* GATILHO DE URGÊNCIA E ESCASSEZ NO TOPO */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white rounded-2xl p-2.5 px-3.5 shadow-xl flex items-center justify-between text-xs font-black border border-amber-300/40 animate-pulse">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0" />
            <span>⚠️ ATENÇÃO: APENAS 2 VAGAS RESTANTES NESTE VALOR</span>
          </span>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-amber-300 font-black text-xs">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-[32px] p-5 sm:p-7 shadow-2xl border border-purple-100 animate-pop space-y-6 quiz-card">
          
          {/* Top Badge Banner */}
          <div className="bg-gradient-to-r from-purple-700 via-teal-600 to-cyan-600 text-white rounded-3xl p-5 text-center space-y-2 shadow-xl relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider text-cyan-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />
              Diagnóstico de Perfil Completo
            </span>
            <h2 className="text-xl sm:text-2xl font-black leading-tight">
              Seu Plano Personalizado de Alta Resposta
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 font-medium">
              Calibrado sob medida para a sua faixa etária <span className="font-bold underline decoration-cyan-300">{selectedAge}</span>
            </p>
          </div>

          {/* R$ 47 DISCOUNT UNLOCKED BANNER */}
          <div className="bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#06B6D4] text-white rounded-3xl p-5 shadow-lg text-center space-y-2 border-2 border-cyan-300 animate-pop">
            <div className="inline-flex items-center gap-1.5 bg-white/25 px-3.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider text-cyan-100">
              <Tag className="w-3.5 h-3.5" />
              CUPOM EXCLUSIVO APLICADO (#FITFLOW47)
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <span className="text-base sm:text-lg font-extrabold text-cyan-200 line-through opacity-80">
                R$ 197,00
              </span>
              <div className="flex flex-col items-start">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
                  R$ 47,00
                </span>
                <span className="text-[10px] font-black text-cyan-100 uppercase">ou 4x de R$ 12,50</span>
              </div>
            </div>
            
            <p className="text-xs font-black text-cyan-100">
              🎉 Você economiza R$ 605,00 e paga apenas 47 Reais por acesso completo vitalício!
            </p>
          </div>

          {/* APP PREVIEW BANNER */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-purple-200 shadow-xl group">
            <img 
              src={ASSETS.gifs.sales1} 
              alt="FitFlow Método 28D App Preview" 
              className="w-full object-cover max-h-64 sm:max-h-72 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              Acesso Imediato no seu Celular
            </div>
          </div>

          {/* Core Metrics */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-gradient-to-br from-purple-50 to-teal-50 p-4 rounded-2xl border border-purple-100 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-purple-700">+4 a +7 cm</span>
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide">Volume Estimado</span>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-2xl border border-teal-100 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-teal-600">28 Dias</span>
              <span className="text-xs font-black text-slate-700 uppercase tracking-wide">Resultados Visíveis</span>
            </div>
          </div>

          {/* STACK COMPLETO DE VALOR PERCEBIDO (R$ 652,00 DE CONTEÚDO) */}
          <div className="bg-gradient-to-br from-purple-900 via-slate-900 to-teal-950 text-white rounded-3xl p-5 border-2 border-cyan-400/50 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-teal-800 pb-3">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-cyan-400" />
                <h3 className="font-black text-white text-base">Tudo o que você vai receber no App:</h3>
              </div>
              <span className="bg-cyan-400/20 text-cyan-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-cyan-400/30">
                Acesso Vitalício
              </span>
            </div>

            {/* LISTA DE CONTEÚDOS COM VALOR INDIVIDUAL E CHECKS */}
            <div className="space-y-3">
              
              {/* ITEM 1 */}
              <div className="flex items-start justify-between gap-3 bg-slate-800/80 p-3 rounded-2xl border border-teal-500/30">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-white block">📱 Aplicativo Exclusivo FitFlow 28D</span>
                    <span className="text-[11px] text-teal-200 block">Treinos guiados em vídeo direto no celular</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">R$ 197</span>
              </div>

              {/* ITEM 2 */}
              <div className="flex items-start justify-between gap-3 bg-slate-800/80 p-3 rounded-2xl border border-teal-500/30">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-white block">🏋️‍♀️ Treinos de 8 a 10 min/dia com Coach Luca</span>
                    <span className="text-[11px] text-teal-200 block">Ativação neuromuscular profunda sem academia</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">R$ 147</span>
              </div>

              {/* ITEM 3 */}
              <div className="flex items-start justify-between gap-3 bg-slate-800/80 p-3 rounded-2xl border border-teal-500/30">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-white block">🥗 Plano de Nutrição Ativadora Anti-Flacidez</span>
                    <span className="text-[11px] text-teal-200 block">Cardápio prático para enrijecer e dar volume</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">R$ 97</span>
              </div>

              {/* BÔNUS 1 */}
              <div className="flex items-start justify-between gap-3 bg-purple-950/80 p-3 rounded-2xl border border-purple-500/40">
                <div className="flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-purple-200 block">🎁 BÔNUS 1: Protocolo Anti-Celulite Express</span>
                    <span className="text-[11px] text-purple-300 block">Drenagem caseira para lisura da pele em 7D</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">R$ 67</span>
              </div>

              {/* BÔNUS 2 */}
              <div className="flex items-start justify-between gap-3 bg-purple-950/80 p-3 rounded-2xl border border-purple-500/40">
                <div className="flex items-start gap-2.5">
                  <Gift className="w-5 h-5 text-purple-300 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-purple-200 block">🎁 BÔNUS 2: Guia de Smoothies Proteicos Caseiros</span>
                    <span className="text-[11px] text-purple-300 block">Receitas deliciosas para consumo pós-treino</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">R$ 47</span>
              </div>

              {/* BÔNUS 3 */}
              <div className="flex items-start justify-between gap-3 bg-purple-950/80 p-3 rounded-2xl border border-purple-500/40">
                <div className="flex items-start gap-2.5">
                  <Users className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <span className="font-black text-cyan-200 block">🎁 BÔNUS 3: Grupo VIP de Alunas & Suporte Direct</span>
                    <span className="text-[11px] text-cyan-300 block">Acompanhamento e motivação diária</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 line-through shrink-0">R$ 97</span>
              </div>

            </div>

            {/* RESUMO FINAL DE ECONOMIA */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-teal-500/50 space-y-2 text-center">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>VALOR TOTAL ACUMULADO:</span>
                <span className="text-red-400 line-through text-sm">R$ 652,00</span>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base font-black text-cyan-300">
                <span>VOCÊ PAGA HOJE APENAS:</span>
                <span className="text-2xl sm:text-3xl text-teal-400 drop-shadow">R$ 47,00</span>
              </div>
              <p className="text-[11px] font-extrabold text-teal-200">
                ⚡ Economia Real de R$ 605,00 (Você ganha 93% OFF)
              </p>
            </div>
          </div>

          {/* SEÇÃO DE PROVAS SOCIAIS */}
          <div className="space-y-3.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Resultados Reais de Alunas</span>
              </h3>
              <span className="text-xs font-black bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                +12.000 Casos
              </span>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-3">
              {BEFORE_AFTER_CASES.map((item) => (
                <div key={item.id} className="group rounded-2xl overflow-hidden border border-purple-200 bg-purple-50/40 p-2 space-y-1.5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative rounded-xl overflow-hidden h-36 sm:h-44">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                    <span className="absolute bottom-2 right-2 bg-slate-900/85 text-white text-[10px] font-black px-2.5 py-0.5 rounded-lg backdrop-blur-md">
                      {item.tag}
                    </span>
                  </div>
                  <div className="px-1 space-y-0.5">
                    <p className="text-xs font-black text-slate-900 truncate">{item.title}</p>
                    <p className="text-[11px] text-teal-600 font-extrabold">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEPOIMENTOS DE ALUNAS */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-sm sm:text-base">
                Histórias de Sucesso & Avaliações
              </h4>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-black">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>4.9 / 5.0 (2.400+ Votos)</span>
              </div>
            </div>

            <div className="space-y-3">
              {TESTIMONIALS.map((item) => (
                <div key={item.id} className="bg-gradient-to-r from-purple-50/70 to-teal-50/50 p-4 rounded-2xl border border-purple-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="w-11 h-11 rounded-full object-cover border-2 border-purple-300 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900">{item.name}</h4>
                          <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500/20" />
                        </div>
                        <span className="text-[11px] text-slate-500 font-bold">
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
                    <span className="inline-block bg-teal-100 text-teal-800 text-[11px] font-black px-3 py-0.5 rounded-lg">
                      ✓ {item.resultBadge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GARANTIA E SEGURANÇA */}
          <div className="bg-teal-50/90 rounded-2xl p-4.5 border border-teal-200 space-y-2 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-teal-900">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <span className="font-black text-xs sm:text-sm">Garantia Incondicional de 7 Dias (Riscos Zero)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Experimente o FitFlow Método 28D por apenas R$ 47,00 sem risco algum. Se em 7 dias você não estiver fascinada com os resultados, basta solicitar a devolução e reembolsamos 100% dos seus 47 Reais imediatamente.
            </p>
          </div>

          {/* HIGH-CONVERTING CTA BUTTON */}
          <div className="space-y-3 pt-2">
            <a
              href={CHECKOUT_URL}
              target="_self"
              rel="noopener noreferrer"
              onClick={trackCheckoutClick}
              className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#06B6D4] hover:from-[#097A70] hover:to-[#0891B2] text-white font-black text-base sm:text-xl shadow-xl shadow-teal-500/30 flex flex-col items-center justify-center gap-1 active:scale-[0.98] transition-all animate-pulse cursor-pointer group text-center no-underline"
            >
              <div className="flex items-center justify-center gap-2">
                <Flame className="w-5 h-5 text-cyan-200 fill-cyan-200 shrink-0" />
                <span>OBTER MEU PLANO POR APENAS R$ 47!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-xs font-medium text-cyan-100">
                ⚡ Desconto de R$ 605,00 Aplicado • Garantia de 7 dias
              </span>
            </a>

            <div className="flex items-center justify-center gap-4 text-slate-400 text-xs font-bold pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-teal-500" /> Pagamento 100% Seguro
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-500" /> Acesso Imediato
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
