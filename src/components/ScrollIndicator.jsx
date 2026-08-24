import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const [hasScroll, setHasScroll] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (typeof window === 'undefined') return;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const needsScroll = scrollHeight > clientHeight + 80;
      setHasScroll(needsScroll);
    };

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolledAway(true);
      } else {
        setScrolledAway(false);
      }
    };

    checkScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    // Recheck after DOM renders completely
    const timer = setTimeout(checkScroll, 600);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!hasScroll || scrolledAway) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollBy({ top: 220, behavior: 'smooth' })}
      aria-label="Deslizar para ver más"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white/95 backdrop-blur-md border border-[#F0D2E4] text-[#2B0B2E] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-[11px] font-extrabold font-heading cursor-pointer animate-bounce hover:bg-[#FFF5F9] hover:border-[#FF2A85] transition-all select-none"
    >
      <span>Desliza para ver más</span>
      <ChevronDown className="w-3.5 h-3.5 text-[#FF2A85] stroke-[3]" />
    </button>
  );
}

