import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Flame, 
  Sparkles,
  ShieldCheck,
  Tv,
  Lock
} from 'lucide-react';
import HeaderLogo from './HeaderLogo';
import { ASSETS } from '../data/quizData';
import { trackVSLView, trackVSLPlay, trackVSLComplete } from '../utils/pixel';

export default function VSLStep({ onContinue }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isButtonUnlocked, setIsButtonUnlocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Time threshold to unlock CTA button (1 minute = 60s)
  const UNLOCK_TIME = 60;

  useEffect(() => {
    trackVSLView();

    // Fast image/gif preload confirmation
    const gifPreload = new Image();
    gifPreload.src = ASSETS.vslCover || '/assets/capa-vsl.gif';
  }, []);

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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;

    // Unlock button exclusively after 1 minute (60 seconds)
    if (time >= UNLOCK_TIME && !isButtonUnlocked) {
      setIsButtonUnlocked(true);
    }
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsButtonUnlocked(true);
  };

  const handleContinue = () => {
    trackVSLComplete();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onContinue();
  };

  return (
    <div className="min-h-dvh bg-[#FFF9F6] py-6 px-3 sm:px-4 flex flex-col justify-center items-center font-body text-[#171116]">
      
      <div className="w-full max-w-md mx-auto space-y-3.5">
        
        {/* Header Logo */}
        <HeaderLogo />

        {/* Clean Main VSL Card */}
        <div className="bg-white rounded-[24px] p-4 sm:p-5 shadow-xl border border-[#F0E3E9] space-y-3.5 text-center quiz-card animate-pop">
          
          {/* Header Badge & Title */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#FFE1EC] text-[#B71F58] border border-[#FF8EBA]/40 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs font-heading">
              <Tv className="w-3 h-3 text-[#FF3D7F]" />
              <span>Vídeo Exclusivo • Protocolo Glúteos</span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-[#171116] leading-tight font-heading">
              Mira la Explicación Antes de Continuar 🍑
            </h2>
            
            <p className="text-[11px] sm:text-xs text-[#5F525A] font-medium leading-relaxed font-body">
              Aprende el estímulo neuromuscular de <strong className="text-[#FF3D7F]">8 a 10 min/día</strong> desde casa.
            </p>
          </div>

          {/* 9:16 VERTICAL PLAYER WITH NEON GLOW & RIPPLE EFFECT */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-[310px] sm:max-w-[330px] mx-auto rounded-[20px] overflow-hidden shadow-[0_12px_40px_rgba(255,61,127,0.22)] ring-4 ring-[#FF3D7F]/20 border-2 border-[#FF3D7F]/40 aspect-[9/16] select-none flex items-center justify-center group bg-black transition-all hover:ring-[#FF3D7F]/40"
          >
            
            {/* HTML5 Video Element (No fullscreen, no native controls) */}
            <video
              ref={videoRef}
              preload="auto"
              playsInline
              disablePictureInPicture
              controlsList="nofullscreen nodownload noremoteplayback noplaybackrate"
              onContextMenu={(e) => e.preventDefault()}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              className="w-full h-full object-cover bg-black pointer-events-none"
            >
              <source src={ASSETS.vsl || '/assets/vsl-video.mp4'} type="video/mp4" />
              <track kind="captions" />
            </video>

            {/* FLOATING SOUND TOGGLE BUTTON (TOP RIGHT) */}
            <button
              type="button"
              onClick={handleMuteToggle}
              className="absolute top-3 right-3 z-40 w-9 h-9 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#FF3D7F] transition-all cursor-pointer border border-white/25 shadow-lg active:scale-90"
              title={isMuted ? 'Activar Sonido' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>

            {/* FULL-SURFACE ACCESSIBLE INTERACTION BUTTON (HANDLES PLAY / PAUSE / RESUME) */}
            <button
              type="button"
              onClick={handlePlayToggle}
              aria-label={isPlaying ? 'Pausar vídeo' : 'Reproducir vídeo com áudio'}
              className="absolute inset-0 z-30 w-full h-full border-none p-0 bg-transparent cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden focus:outline-none"
            >
              {/* HERO GIF COVER OVERLAY - MAXIMUM VISUAL IMPACT (VISIBLE BEFORE PLAY & ON PAUSE) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 flex flex-col items-center justify-center overflow-hidden w-full h-full ${
                  isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto bg-black/40'
                }`}
              >
                {/* Pure High-Def GIF Media */}
                <img
                  src={ASSETS.vslCover || '/assets/capa-vsl.gif'}
                  alt="Capa do Vídeo VSL"
                  decoding="async"
                  fetchPriority="high"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Subtle Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />
                
                {/* Glossy Diagonal Highlight */}
                <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                {/* Glowing Dynamic Center Play Trigger */}
                <div className="relative z-10 flex flex-col items-center gap-3 p-3 animate-float-gentle">
                  
                  {/* Concentric Ripple Waves */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-24 h-24 rounded-full bg-[#FF3D7F] animate-pulse-ripple pointer-events-none" />
                    <div className="absolute w-20 h-20 rounded-full bg-[#FF8EBA] opacity-60 animate-ping pointer-events-none" />
                    
                    {/* Master Play Core Button */}
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#FF3D7F] via-[#D92667] to-[#FF8EBA] text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,61,127,0.95)] border-[3px] border-white transform transition-transform group-hover:scale-110 active:scale-95">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1 drop-shadow-md" />
                    </div>
                  </div>

                  {/* Shimmering CTA Pill Badge */}
                  <div className="relative overflow-hidden rounded-full shadow-xl">
                    <div className="bg-gradient-to-r from-[#FF3D7F] via-[#D92667] to-[#FF3D7F] text-white text-[11px] sm:text-xs font-black px-4 py-1.5 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                      <span>{hasStarted ? '▶️ CONTINUAR VÍDEO' : '▶️ TOCAR PARA ESCUCHAR'}</span>
                    </div>
                    {/* Sliding Shimmer Light Beam */}
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-sweep pointer-events-none" />
                  </div>

                </div>

              </div>
            </button>

          </div>

          {/* ACTION BUTTON - UNLOCKED EXCLUSIVELY AFTER 1 MINUTE (60s) */}
          <div className="pt-1">
            {isButtonUnlocked ? (
              <div className="space-y-2 animate-pop">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full py-4 px-5 rounded-[14px] bg-gradient-to-r from-[#FF3D7F] to-[#D92667] hover:brightness-105 text-white font-extrabold text-base sm:text-lg shadow-[0_10px_24px_rgba(217,38,103,0.28)] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer group uppercase tracking-wide font-heading"
                >
                  <Flame className="w-5 h-5 text-[#D9A441] fill-[#D9A441] shrink-0" />
                  <span>CONTINUAR Y LIBERAR MI BECA 🎁</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform shrink-0" />
                </button>

                <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] font-medium text-[#8C7D86]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#32B768]" /> Garantía 7 Días
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF3D7F]" /> Descuento de $ 19,90
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-[#FFF9F6] border border-[#F0E3E9] rounded-xl p-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-[#8C7D86]">
                <Lock className="w-3.5 h-3.5 text-[#FF3D7F] shrink-0 animate-pulse" />
                <span>El botón de descuento se desbloqueará en el vídeo...</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
