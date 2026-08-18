import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Volume2, 
  VolumeX, 
  Tv,
  Zap,
  Sparkles,
  Gift,
  ArrowRight,
  CheckCircle2,
  Flame,
  ShieldCheck
} from 'lucide-react';
import HeaderLogo from './HeaderLogo';
import { ASSETS } from '../data/quizData';
import { trackVSLView, trackVSLPlay, trackVSLComplete, trackVSLProgress } from '../utils/pixel';

export default function VSLStep({ onContinue }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [progressPercent, setProgressPercent] = useState(15);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const tracked50 = useRef(false);
  const tracked80 = useRef(false);

  // AUTOMATIC PROGRESS & AUTOPLAY INITIALIZATION ON COMPONENT MOUNT
  useEffect(() => {
    trackVSLView();

    // Fast image preload confirmation
    const gifPreload = new Image();
    gifPreload.src = ASSETS.vslCover || '/assets/capa-vsl.gif';

    // Start video autoplay in muted mode (guaranteed to work across all browsers & mobile)
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          setHasStarted(true);
          trackVSLPlay();
        }).catch(() => {
          // Autoplay fallback
        });
      }
    }

    // AUTOMATIC PROGRESSION TIMER: Advances smoothly and automatically to 100% in ~14 seconds
    const startTime = Date.now();
    const TARGET_DURATION_MS = 14000; // 14 seconds to reach 100%

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(1, elapsed / TARGET_DURATION_MS);
      
      // Dynamic high-yield curve: starts at 15% and ramps up smoothly to 100%
      const pct = Math.min(100, Math.round(15 + Math.pow(ratio, 0.88) * 85));
      setProgressPercent(pct);

      if (pct >= 50 && !tracked50.current) {
        tracked50.current = true;
        trackVSLProgress(50);
      }
      if (pct >= 80 && !tracked80.current) {
        tracked80.current = true;
        trackVSLProgress(80);
      }
      if (pct >= 100 || ratio >= 1) {
        setIsUnlocked(true);
      }
    };

    const interval = setInterval(tick, 100);
    return () => clearInterval(interval);
  }, []);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;

    if (!hasStarted || isMuted) {
      // First click: unmute and play with sound
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      });
      return;
    }

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (nextMuted === false && videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleContinue = () => {
    trackVSLComplete();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onContinue();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgressPercent(100);
    setIsUnlocked(true);
    handleContinue();
  };

  const roundedProgress = Math.round(progressPercent);

  // Dynamic progress status message
  const getStatusMessage = () => {
    if (roundedProgress >= 100) return '🎉 ¡BECA DEL 80% DESBLOQUEADA CON ÉXITO!';
    if (roundedProgress >= 70) return '🔥 ¡Últimos segundos! Desbloqueando tu Beca...';
    if (roundedProgress >= 35) return '⚡ Calibrando tu cupón exclusivo y diagnóstico...';
    return '▶️ Calibrando estímulo biomecánico en tiempo real...';
  };

  return (
    <div className="min-h-dvh bg-[#FFF9F6] py-6 px-3 sm:px-6 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="w-full max-w-lg sm:max-w-xl mx-auto space-y-4">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Clean Main VSL Card */}
        <div className="bg-white rounded-[24px] p-4 sm:p-7 shadow-xl border border-[#F0E3E9] space-y-4 text-center quiz-card animate-pop">
          
          {/* Header Badge & Title */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-[#FFE1EC] text-[#B71F58] border border-[#FF8EBA]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs font-heading">
              <Tv className="w-3.5 h-3.5 text-[#FF3D7F]" />
              <span>Vídeo Exclusivo • Protocolo Glúteos</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#171116] leading-tight font-heading">
              Mira la Explicación Antes de Continuar 🍑
            </h2>
            
            <p className="text-xs sm:text-sm text-[#5F525A] font-medium leading-relaxed font-body max-w-md mx-auto">
              Aprende el estímulo neuromuscular de <strong className="text-[#FF3D7F]">8 a 10 min/día</strong> desde casa.
            </p>
          </div>

          {/* ULTRA HIGH-VISIBILITY EXTERNAL PROGRESS BAR SECTION */}
          <div className="bg-gradient-to-r from-[#FFF0F5] via-[#FFE1EC] to-[#FFF0F5] rounded-[18px] p-3.5 border-2 border-[#FF8EBA]/50 shadow-sm space-y-2 text-left">
            <div className="flex items-center justify-between gap-2 font-heading">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#5B163A]">
                {roundedProgress >= 100 ? (
                  <CheckCircle2 className="w-4 h-4 text-[#32B768] shrink-0" />
                ) : (
                  <Flame className="w-4 h-4 text-[#FF3D7F] fill-[#FF3D7F] shrink-0 animate-pulse" />
                )}
                <span>DESBLOQUEO DE BECA:</span>
              </span>
              <span className="font-black text-[#FF3D7F] text-sm bg-white px-2.5 py-0.5 rounded-full border border-[#FF8EBA]/40 shadow-2xs">
                {roundedProgress}%
              </span>
            </div>

            {/* Glowing Multi-Color Progress Track */}
            <div className="relative w-full h-3.5 bg-white/90 rounded-full overflow-hidden p-0.5 border border-[#DFC9D3] shadow-inner">
              <div 
                className="relative h-full rounded-full bg-gradient-to-r from-[#FF3D7F] via-[#D92667] via-[#FFAED0] to-[#32B768] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(255,61,127,0.7)]"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              >
                {/* Sliding Light Beam Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer-sweep" />
              </div>
            </div>

            {/* Dynamic Status Text */}
            <p className="text-[11px] font-bold text-[#5B163A] flex items-center gap-1 font-heading pt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF3D7F] shrink-0" />
              <span className="truncate">{getStatusMessage()}</span>
            </p>
          </div>

          {/* TALLER & VERTICAL MODERN VIDEO PLAYER */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto rounded-[22px] overflow-hidden shadow-[0_14px_45px_rgba(255,61,127,0.22)] ring-4 ring-[#FF3D7F]/20 border-2 border-[#FF3D7F]/40 aspect-[9/13.5] select-none flex items-center justify-center group bg-black transition-all hover:ring-[#FF3D7F]/40"
          >
            
            {/* HTML5 Video Element with autoPlay & playsInline */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              disablePictureInPicture
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleEnded}
              className="w-full h-full object-cover bg-black pointer-events-none"
            >
              <source src={ASSETS.vsl || '/assets/vsl-video.mp4'} type="video/mp4" />
              <track kind="captions" />
            </video>

            {/* 1. TOP EDGE-TO-EDGE PROGRESS BAR WITH GLOW */}
            <div className="absolute top-0 left-0 right-0 z-40 h-3 bg-black/70 backdrop-blur-xs overflow-hidden">
              <div 
                className="relative h-full rounded-r-full bg-gradient-to-r from-[#FF3D7F] via-[#FF6097] via-[#FF8EBA] to-[#FFAED0] shadow-[0_0_18px_rgba(255,61,127,1)] transition-all duration-150 ease-out"
                style={{ width: `${Math.max(2, progressPercent)}%` }}
              >
                {/* Sliding Light Beam Shimmer */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-sweep" />
              </div>
            </div>

            {/* 2. FLOATING HUD OVERLAY (TOP INSIDE PLAYER) */}
            <div className="absolute top-4 left-3 right-3 z-40 flex items-center justify-between pointer-events-none">
              
              {/* Left Live Badge */}
              <div className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-[#FF8EBA]/50 text-white text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-lg font-heading">
                <span className="w-2 h-2 rounded-full bg-[#FF3D7F] animate-ping" />
                <span>EN VIVO</span>
              </div>

              {/* Center Dynamic Retention Percentage Badge */}
              <div className="inline-flex items-center gap-1.5 bg-black/85 backdrop-blur-md border border-[#FF8EBA]/60 text-white text-[10px] sm:text-[11px] font-black px-3.5 py-1 rounded-full shadow-lg font-heading animate-pulse">
                {roundedProgress >= 100 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#32B768] shrink-0" />
                ) : (
                  <Zap className="w-3.5 h-3.5 text-[#FF3D7F] fill-[#FFAED0] shrink-0" />
                )}
                <span className="bg-gradient-to-r from-white via-[#FFE1EC] to-[#FFAED0] bg-clip-text text-transparent">
                  {roundedProgress >= 100 ? 'BECA LIBERADA' : `BECA: ${roundedProgress}%`}
                </span>
              </div>

              {/* Right Sound Toggle (Interactive Button) */}
              <button
                type="button"
                onClick={handleMuteToggle}
                className="pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF3D7F] transition-all cursor-pointer border border-white/25 shadow-lg active:scale-90"
                title={isMuted ? 'Activar Sonido' : 'Silenciar'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                )}
              </button>
            </div>

            {/* 3. FLOATING PERSISTENT BOTTOM RETENTION PILL */}
            <div className="absolute bottom-3.5 left-3 right-3 z-30 pointer-events-none">
              <div className="relative bg-black/85 backdrop-blur-md border border-[#FF8EBA]/40 rounded-full px-3.5 py-2 overflow-hidden shadow-xl text-center">
                
                {/* Subtle Inner Fill Layer in Pink Gradient */}
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF3D7F]/30 via-[#FF6097]/25 to-[#FFAED0]/20 transition-all duration-150 ease-out pointer-events-none"
                  style={{ width: `${progressPercent}%` }}
                />

                {/* Bottom Micro-Bar Line in Pink Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#FF3D7F] via-[#FF6097] via-[#FF8EBA] to-[#FFAED0] transition-all duration-150 ease-out shadow-[0_0_8px_#FFAED0]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-white font-heading">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFAED0] fill-[#FFAED0] shrink-0" />
                  <span className="truncate">
                    {roundedProgress >= 100 
                      ? '🎉 ¡Beca Desbloqueada! Toca abajo para reclamar' 
                      : roundedProgress >= 70
                        ? '🔥 ¡Últimos segundos! Desbloqueando Beca...' 
                        : 'Mira hasta el final para desbloquear tu Beca del 80%'}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. FULL-SURFACE INTERACTION BUTTON (HANDLES UNMUTE / PLAY / PAUSE) */}
            {isMuted && (
              <button
                type="button"
                onClick={handlePlayToggle}
                aria-label="Tocar para escuchar con audio"
                className="absolute inset-0 z-20 w-full h-full border-none p-0 bg-black/25 cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden focus:outline-none transition-opacity"
              >
                {/* Sound Activation Floating Pill */}
                <div className="relative z-10 flex flex-col items-center gap-2.5 my-auto max-w-xs p-4 rounded-2xl bg-black/75 backdrop-blur-md border border-[#FF8EBA]/50 shadow-2xl animate-pop">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF3D7F] via-[#D92667] to-[#FFAED0] text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,61,127,0.95)] border-2 border-white animate-pulse">
                    <Volume2 className="w-7 h-7 text-white fill-white" />
                  </div>
                  <div className="space-y-0.5 font-heading">
                    <span className="text-white font-black text-sm uppercase block tracking-wide">
                      🔊 TOCAR PARA ACTIVAR EL AUDIO
                    </span>
                    <span className="text-[#FFE1EC] text-[11px] font-medium block">
                      Vídeo en reproducción automática
                    </span>
                  </div>
                </div>
              </button>
            )}

          </div>

          {/* UNLOCKED CTA BUTTON (APPEARS WHEN PROGRESS REACHES 100%) */}
          {isUnlocked ? (
            <div className="pt-2 animate-pop">
              <button
                type="button"
                onClick={handleContinue}
                className="w-full py-4 sm:py-5 px-6 rounded-[16px] bg-gradient-to-r from-[#FF3D7F] via-[#D92667] to-[#32B768] hover:brightness-105 text-white font-black text-base sm:text-lg shadow-[0_10px_28px_rgba(255,61,127,0.38)] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer font-heading uppercase tracking-wide group animate-pulse"
              >
                <Gift className="w-5 h-5 text-white fill-white shrink-0" />
                <span>¡RECLAMAR MI BECA Y CUPÓN VIP!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8C7D86] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#32B768]" />
              <span>Vídeo explicativo oficial con Coach Luca</span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
