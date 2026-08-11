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
  CheckCircle2
} from 'lucide-react';
import HeaderLogo from './HeaderLogo';
import { ASSETS } from '../data/quizData';
import { trackVSLView, trackVSLPlay, trackVSLComplete, trackVSLProgress } from '../utils/pixel';

export default function VSLStep({ onContinue }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const tracked50 = useRef(false);
  const tracked80 = useRef(false);

  useEffect(() => {
    trackVSLView();

    // Fast image/gif preload confirmation
    const gifPreload = new Image();
    gifPreload.src = ASSETS.vslCover || '/assets/capa-vsl.gif';
  }, []);

  /**
   * Psychological retention curve calculation (Fast start -> Progressive Deceleration)
   * Formula: visualProgress = (currentTime / duration)^0.42 * 100
   */
  const calculateRetentionProgress = (currentTime, duration) => {
    if (!duration || duration <= 0) return 0;
    const ratio = Math.min(1, Math.max(0, currentTime / duration));

    if (ratio >= 0.985) {
      return 100;
    }

    // Power curve with exponent 0.42 (Starts fast and slows down towards the end)
    const curved = Math.pow(ratio, 0.42) * 100;
    return Math.min(99.2, Math.max(0, curved));
  };

  // Smooth 60fps Animation Loop when video is playing
  useEffect(() => {
    const updateLoop = () => {
      if (videoRef.current && isPlaying) {
        const current = videoRef.current.currentTime || 0;
        const duration = videoRef.current.duration || 60;
        const pct = calculateRetentionProgress(current, duration);
        setProgressPercent(pct);

        if (pct >= 50 && !tracked50.current) {
          tracked50.current = true;
          trackVSLProgress(50);
        }
        if (pct >= 80 && !tracked80.current) {
          tracked80.current = true;
          trackVSLProgress(80);
        }

        if (pct >= 98 || (duration > 0 && current >= duration - 1.5)) {
          setIsUnlocked(true);
        }
      }
      if (isPlaying) {
        rafRef.current = requestAnimationFrame(updateLoop);
      }
    };

    if (isPlaying) {
      rafRef.current = requestAnimationFrame(updateLoop);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying]);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        if (!hasStarted) {
          setHasStarted(true);
          trackVSLPlay();
        }
      }).catch((err) => {
        console.warn('Autoplay fallback:', err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => {
            setIsPlaying(true);
            setHasStarted(true);
            trackVSLPlay();
          });
        }
      });
    }
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
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

          {/* TALLER & VERTICAL MODERN VIDEO PLAYER WITH INTEGRATED PINK GRADIENT PROGRESS BAR */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto rounded-[22px] overflow-hidden shadow-[0_14px_45px_rgba(255,61,127,0.22)] ring-4 ring-[#FF3D7F]/20 border-2 border-[#FF3D7F]/40 aspect-[9/13.5] select-none flex items-center justify-center group bg-black transition-all hover:ring-[#FF3D7F]/40"
          >
            
            {/* HTML5 Video Element (No fullscreen, no native controls) */}
            <video
              ref={videoRef}
              preload="auto"
              playsInline
              disablePictureInPicture
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
              onEnded={handleEnded}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              className="w-full h-full object-cover bg-black pointer-events-none"
            >
              <source src={ASSETS.vsl || '/assets/vsl-video.mp4'} type="video/mp4" />
              <track kind="captions" />
            </video>

            {/* 1. TOP EDGE-TO-EDGE PROGRESS BAR IN PINK GRADIENT (ROSA -> ROSA CLARO) */}
            <div className="absolute top-0 left-0 right-0 z-40 h-2.5 sm:h-3 bg-black/60 backdrop-blur-xs overflow-hidden">
              <div 
                className="relative h-full rounded-r-full bg-gradient-to-r from-[#FF3D7F] via-[#FF6097] via-[#FF8EBA] to-[#FFAED0] shadow-[0_0_16px_rgba(255,61,127,0.95)] transition-all duration-150 ease-out"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Sliding Light Beam Shimmer */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-sweep" />
                
                {/* Leading Edge Sparkle Dot in Light Pink / White */}
                {progressPercent > 2 && progressPercent < 99 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FFF0F5] shadow-[0_0_10px_#FFAED0] animate-ping" />
                )}
              </div>
            </div>

            {/* 2. FLOATING HUD OVERLAY (TOP INSIDE PLAYER) */}
            <div className="absolute top-3.5 left-3 right-3 z-40 flex items-center justify-between pointer-events-none">
              
              {/* Left Live Badge */}
              <div className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md border border-[#FF8EBA]/50 text-white text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-lg font-heading">
                <span className="w-2 h-2 rounded-full bg-[#FF3D7F] animate-ping" />
                <span>EN VIVO</span>
              </div>

              {/* Center Dynamic Retention Percentage Badge with Pink Gradient Accent */}
              <div className="inline-flex items-center gap-1.5 bg-black/80 backdrop-blur-md border border-[#FF8EBA]/60 text-white text-[10px] sm:text-[11px] font-black px-3.5 py-1 rounded-full shadow-lg font-heading animate-pulse">
                {roundedProgress >= 100 ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFAED0] shrink-0" />
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

            {/* 3. FLOATING PERSISTENT BOTTOM RETENTION PILL WITH FILLING PINK GRADIENT */}
            <div className="absolute bottom-3 left-3 right-3 z-30 pointer-events-none">
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
                <div className="relative z-10 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFAED0] fill-[#FFAED0] shrink-0" />
                  <span className="truncate">
                    {roundedProgress >= 85 
                      ? '🔥 ¡Últimos segundos! Desbloqueando Beca...' 
                      : 'Mira hasta el final para desbloquear tu Beca del 80%'}
                  </span>
                </div>
              </div>
            </div>

            {/* 4. FULL-SURFACE INTERACTION BUTTON (HANDLES PLAY / PAUSE / RESUME) */}
            <button
              type="button"
              onClick={handlePlayToggle}
              aria-label={isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo con audio'}
              className="absolute inset-0 z-20 w-full h-full border-none p-0 bg-transparent cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden focus:outline-none"
            >
              {/* ULTRA-PREMIUM COVER OVERLAY (VISIBLE BEFORE PLAY & ON PAUSE) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 flex flex-col items-center justify-center p-5 sm:p-6 overflow-hidden w-full h-full ${
                  isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto bg-gradient-to-b from-[#16040F]/90 via-[#320C22]/80 to-[#16040F]/95'
                }`}
              >
                {/* High-Resolution Coach & Fitness Background */}
                <img
                  src={ASSETS.coach?.main || '/assets/coachapresentation1-BQaYGSJw.webp'}
                  alt="Coach Luca - Protocolo Glúteos"
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-35 filter saturate-120"
                />

                {/* Subtle Vignette & Atmospheric Radial Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#16040F] via-transparent to-[#16040F]/80 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF3D7F]/20 via-transparent to-transparent pointer-events-none" />

                {/* Main Authority Headline & Dynamic Center Play Trigger */}
                <div className="relative z-10 flex flex-col items-center gap-3.5 my-auto max-w-xs sm:max-w-sm pt-6 pb-6">
                  
                  {/* Concentric Pulsing Play Button */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FF3D7F] animate-pulse-ripple pointer-events-none" />
                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FF8EBA] opacity-60 animate-ping pointer-events-none" />
                    
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FF3D7F] via-[#D92667] to-[#FFAED0] text-white flex items-center justify-center shadow-[0_0_40px_rgba(255,61,127,0.95)] border-[3.5px] border-white transform transition-transform group-hover:scale-110 active:scale-95">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1 drop-shadow-md" />
                    </div>
                  </div>

                  {/* High-Impact Headline Text */}
                  <div className="space-y-1 text-center font-heading">
                    <h3 className="text-white font-black text-base sm:text-lg uppercase tracking-tight leading-tight drop-shadow-lg">
                      {hasStarted ? 'Vídeo Pausado' : 'Protocolo Glúteos Brasileños'}
                    </h3>
                    <p className="text-[#FFE1EC] text-[11px] sm:text-xs font-semibold leading-snug drop-shadow-sm font-body">
                      {hasStarted ? 'Toca para continuar viendo la explicación' : 'Aprende la estimulación neuromuscular para elevar y tonificar'}
                    </p>
                  </div>

                  {/* Shimmering CTA Pill Badge in Pink Gradient */}
                  <div className="relative overflow-hidden rounded-full shadow-2xl">
                    <div className="bg-gradient-to-r from-[#FF3D7F] via-[#D92667] to-[#FF8EBA] text-white text-[11px] sm:text-xs font-black px-5 py-2 uppercase tracking-wider flex items-center gap-2 font-heading shadow-lg border border-white/20">
                      <span>{hasStarted ? '▶️ CONTINUAR VÍDEO' : '🔊 TOCAR PARA ACTIVAR EL AUDIO'}</span>
                    </div>
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-sweep pointer-events-none" />
                  </div>

                </div>

              </div>
            </button>

          </div>

          {/* UNLOCKED CTA BUTTON (APPEARS WHEN VIDEO COMPLETES OR IS AT CONCLUSION) */}
          {isUnlocked && (
            <div className="pt-2 animate-pop">
              <button
                type="button"
                onClick={handleContinue}
                className="w-full py-4 px-6 rounded-[16px] bg-gradient-to-r from-[#FF3D7F] via-[#D92667] to-[#FF8EBA] hover:brightness-105 text-white font-black text-base sm:text-lg shadow-[0_10px_28px_rgba(255,61,127,0.35)] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer font-heading uppercase tracking-wide group animate-pulse"
              >
                <Gift className="w-5 h-5 text-white fill-white shrink-0" />
                <span>¡RECLAMAR MI BECA Y CUPÓN VIP!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
