import React, { useState, useEffect, useRef } from 'react';
import { Tag, Clock, Trophy, AlertTriangle, ShieldCheck, ArrowRight, Flame, CheckCircle2 } from 'lucide-react';
import HeaderLogo from './HeaderLogo';

export default function CouponStep({ onClaimCoupon }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(599); // 09:59 countdown
  const scratchCanvasRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const isScratching = useRef(false);

  // CONFETTI PARTICLE ENGINE
  useEffect(() => {
    if (!isUnlocked) return;

    const canvas = confettiCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#F59E0B', '#10B981', '#EA580C', '#EAB308', '#059669', '#F97316', '#34D399'];

    for (let i = 0; i < 160; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 4 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isUnlocked]);

  // REAL INTERACTIVE HTML5 CANVAS SCRATCH CARD
  useEffect(() => {
    if (isUnlocked) return;

    const canvas = scratchCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Draw Gold Metallic Coating
    const goldGrad = ctx.createLinearGradient(0, 0, width, height);
    goldGrad.addColorStop(0, '#D4AF37');
    goldGrad.addColorStop(0.3, '#FFD700');
    goldGrad.addColorStop(0.5, '#FFFBEB');
    goldGrad.addColorStop(0.7, '#FFD700');
    goldGrad.addColorStop(1, '#AA771C');

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw Scratch Prompt Text
    ctx.fillStyle = '#4A2500';
    ctx.font = 'bold 13px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ RASPA AQUÍ CON EL DEDO ✨', width / 2, height / 2 - 10);
    ctx.font = 'bold 11px Montserrat, sans-serif';
    ctx.fillText('👉 Revelar Beca Especial de $ 9,90 👈', width / 2, height / 2 + 14);

    const checkScratchedPercentage = () => {
      try {
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        for (let i = 3; i < pixels.length; i += 4) {
          if (pixels[i] === 0) {
            transparentPixels++;
          }
        }

        const pct = Math.round((transparentPixels / (pixels.length / 4)) * 100);
        setScratchProgress(pct);

        if (pct >= 28 && !isUnlocked) {
          setIsUnlocked(true);
        }
      } catch {
        // Fallback
      }
    };

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      checkScratchedPercentage();
    };

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    const handleStart = (e) => {
      isScratching.current = true;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const handleMove = (e) => {
      if (!isScratching.current) return;
      const pos = getPos(e);
      scratch(pos.x, pos.y);
    };

    const handleEnd = () => {
      isScratching.current = false;
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseleave', handleEnd);

    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    canvas.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('mouseleave', handleEnd);

      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, [isUnlocked]);

  // Timer Countdown
  useEffect(() => {
    if (!isUnlocked) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isUnlocked]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#022C22] py-8 px-3 sm:px-4 flex flex-col justify-center items-center font-sans antialiased text-slate-900">
      
      {/* CANVAS CONFETTI OVERLAY */}
      <canvas 
        ref={confettiCanvasRef} 
        className="fixed inset-0 pointer-events-none z-50"
      />

      <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* URGENCY ALERT BANNER */}
        <div className="bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 text-white rounded-2xl p-2.5 px-3.5 shadow-xl flex items-center justify-between text-xs font-black border border-amber-300/40 animate-pulse">
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0" />
            <span>⚠️ ATENCIÓN: SOLO QUEDAN 2 PLAZAS A ESTE PRECIO</span>
          </span>
          <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-amber-300 font-black text-xs">
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[32px] p-5 sm:p-7 shadow-2xl border border-emerald-100 animate-pop space-y-5 quiz-card text-center">
          
          {/* PSYCHOLOGICAL LOTTERY WINNER ANNOUNCEMENT */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#15803D] via-[#D97706] to-[#EA580C] text-white text-[11px] sm:text-xs font-black uppercase tracking-wide px-4 py-1.5 rounded-full shadow-lg mx-auto">
              <Trophy className="w-4 h-4 text-yellow-200" />
              <span>🎰 PUNTUACIÓN ELITE: 98.4 / 100 SELECCIONADA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
              {isUnlocked ? (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EA580C] via-[#D97706] to-[#16A34A]">
                  🎉 ¡GANASTE LA BECA VIP DE $ 9,90!
                </span>
              ) : (
                <span>¡Raspa la Tarjeta Dorada para Liberar tu Descuento de $ 9,90! 🎁</span>
              )}
            </h2>

            {/* HIGH PERCEIVED VALUE SUMMARY */}
            <div className="bg-amber-50/90 rounded-2xl p-3.5 border border-amber-200 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-950 font-black">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lo que vas a recibir hoy por Solo $ 9,90:</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 font-bold text-[11px]">
                <li className="flex items-center justify-between">
                  <span>📱 App Exclusivo Método Glúteos Brasileños (Acceso De Por Vida)</span>
                  <span className="text-slate-400 line-through">$ 197,00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>🏋️‍♀️ Entrenamientos de 8-10 min/día con Coach Luca</span>
                  <span className="text-slate-400 line-through">$ 147,00</span>
                </li>
                <li className="flex items-center justify-between text-emerald-800 font-extrabold">
                  <span>🥗 Guía Nutricional Glúteo Anti-Flacidez</span>
                  <span className="text-slate-400 line-through">$ 97,00</span>
                </li>
                <li className="flex items-center justify-between text-amber-800 font-extrabold">
                  <span>🎁 3 Bonos Exclusivos de Aceleración</span>
                  <span className="text-slate-400 line-through">$ 211,00</span>
                </li>
              </ul>
              <div className="border-t border-amber-200/80 pt-1.5 flex items-center justify-between font-black text-xs text-slate-900">
                <span>VALOR TOTAL DEL PAQUETE:</span>
                <span className="text-red-500 line-through">$ 652,00</span>
              </div>
            </div>
          </div>

          {/* REAL INTERACTIVE GOLD SCRATCH CARD CONTAINER */}
          <div className={`relative rounded-3xl p-4 sm:p-5 transition-all duration-500 border-2 ${
            isUnlocked 
              ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-amber-200 shadow-xl ring-4 ring-amber-400/30 animate-pop' 
              : 'bg-amber-50/50 border-amber-300 border-dashed shadow-md'
          }`}>
            
            {/* Cutout edges */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-amber-200 pointer-events-none" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-amber-200 pointer-events-none" />

            {/* UNDERLYING PRIZE TICKET (REVEALED WHEN SCRATCHED) */}
            <div className="space-y-3 py-1 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-950 text-amber-300 shadow-xl mx-auto animate-bounce border-2 border-amber-300">
                <Trophy className="w-8 h-8 text-amber-300" />
              </div>

              <div className="space-y-1">
                <span className="inline-block bg-slate-950 text-amber-300 text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  🎊 ¡BECA SUBVENCIONADA LIBERADA! 🎊
                </span>
                
                {/* Price Breakdown */}
                <div className="pt-2 flex items-center justify-center gap-3">
                  <span className="text-base sm:text-lg font-bold text-amber-900/70 line-through">
                    $ 97,00
                  </span>
                  <div className="flex flex-col items-start">
                    <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">
                      $ 9,90
                    </span>
                    <span className="text-[10px] font-black text-amber-950 uppercase pt-0.5">¡Pago Único • Acceso Inmediato!</span>
                  </div>
                </div>
                <p className="text-xs font-extrabold text-amber-950 pt-1">Ahorro inmediato de $ 87,10 (Pagas solo 9,90)</p>
              </div>

              {isUnlocked && (
                <div className="bg-white/70 border border-amber-300/80 text-amber-950 rounded-xl p-2 flex items-center justify-center gap-2 text-xs font-black animate-pop shadow-xs">
                  <Clock className="w-4 h-4 text-red-600 animate-spin" />
                  <span>Tu beca de $ 9,90 expira en: <span className="font-mono text-sm text-red-600 font-black">{formatTime(timeLeft)}</span></span>
                </div>
              )}
            </div>

            {/* INTERACTIVE GOLD SCRATCH CANVAS OVERLAY (HIDDEN ONCE UNLOCKED) */}
            {!isUnlocked && (
              <div className="absolute inset-0 z-30 rounded-3xl overflow-hidden shadow-inner flex flex-col items-center justify-center">
                <canvas 
                  ref={scratchCanvasRef} 
                  width={340} 
                  height={190} 
                  className="w-full h-full cursor-pointer rounded-3xl touch-none select-none"
                />
                
                {/* Quick Auto-scratch Fallback Button */}
                <button
                  type="button"
                  onClick={() => setIsUnlocked(true)}
                  className="absolute bottom-2 text-[10px] font-extrabold bg-slate-900/80 text-yellow-300 px-3 py-1 rounded-full backdrop-blur-sm cursor-pointer shadow hover:bg-slate-900"
                >
                  ⚡ O haz clic aquí para raspar automáticamente ({scratchProgress}%)
                </button>
              </div>
            )}

          </div>

          {/* Action Button */}
          {isUnlocked ? (
            <button
              type="button"
              onClick={onClaimCoupon}
              className="w-full py-5 sm:py-6 px-8 rounded-2xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xl sm:text-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wider"
            >
              <Flame className="w-7 h-7 text-yellow-300 fill-yellow-300 shrink-0" />
              <span>GARANTIZAR PLAN POR $ 9,90</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1.5 transition-transform shrink-0" />
            </button>
          ) : (
            <p className="text-xs font-extrabold text-amber-800 animate-pulse">
              👉 Mueve el dedo sobre la tarjeta dorada para raspar y liberar los 9,90
            </p>
          )}

          <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Garantía 7 Días
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-600" /> Cupón #BRASIL990
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
