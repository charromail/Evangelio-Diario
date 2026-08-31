import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Sparkles, Flame, Share2, BookOpen } from 'lucide-react';
import { DailyLiturgy } from '../types';

interface NavbarProps {
  currentDate: string;
  onDateChange: (date: string) => void;
  liturgy: DailyLiturgy | null;
  onOpenEmmausSpecial: () => void;
  onOpenHistory: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDate,
  onDateChange,
  liturgy,
  onOpenEmmausSpecial,
  onOpenHistory,
  savedCount
}) => {
  // Format today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [activeLogoUrl, setActiveLogoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('emaus_custom_logo_persisted') || '/logo-emaus.png';
    } catch {
      return '/logo-emaus.png';
    }
  });

  useEffect(() => {
    const updateLogo = () => {
      try {
        const stored = localStorage.getItem('emaus_custom_logo_persisted');
        setActiveLogoUrl(stored || '/logo-emaus.png');
      } catch {
        setActiveLogoUrl('/logo-emaus.png');
      }
    };

    window.addEventListener('emaus_logo_updated', updateLogo);
    window.addEventListener('storage', updateLogo);
    return () => {
      window.removeEventListener('emaus_logo_updated', updateLogo);
      window.removeEventListener('storage', updateLogo);
    };
  }, []);

  const handleStepDay = (delta: number) => {
    if (currentDate === 'special-emmaus') {
      onDateChange(todayStr);
      return;
    }
    const d = new Date(currentDate + 'T12:00:00');
    d.setDate(d.getDate() + delta);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const getLiturgicalBadgeColor = (color?: string) => {
    switch (color?.toLowerCase()) {
      case 'verde':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50';
      case 'blanco':
        return 'bg-amber-100/15 text-amber-200 border-amber-300/40';
      case 'morado':
        return 'bg-purple-950/80 text-purple-300 border-purple-700/50';
      case 'rojo':
        return 'bg-red-950/80 text-red-300 border-red-700/50';
      default:
        return 'bg-amber-950/60 text-amber-300 border-amber-700/40';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#160f0a]/95 backdrop-blur-md border-b border-[#3d2618]/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8d5b36] to-[#432313] p-1 border border-[#d4af37]/40 shadow-inner flex items-center justify-center">
                <img 
                  src={activeLogoUrl} 
                  alt="Logo Emaús" 
                  className="w-full h-full object-contain filter drop-shadow" 
                />
              </div>
              <div>
                <h1 className="font-cinzel text-lg sm:text-xl font-bold tracking-wide text-[#f7eedf] flex items-center gap-2">
                  <span>Evangelio Diario</span>
                  <span className="text-[#c93b3e] text-sm font-semibold tracking-wider font-sans bg-[#c93b3e]/15 px-2 py-0.5 rounded-full border border-[#c93b3e]/30">
                    EMAÚS
                  </span>
                </h1>
                <p className="text-xs text-[#b89f89] flex items-center gap-1.5 font-serif italic">
                  <Flame className="w-3.5 h-3.5 text-[#e89138]" />
                  «¿No ardía nuestro corazón?» — Lc 24, 32
                </p>
              </div>
            </div>

            {/* Mobile History trigger */}
            <button
              onClick={onOpenHistory}
              className="md:hidden flex items-center gap-1.5 text-xs text-[#d4af37] bg-[#2a1a11] px-2.5 py-1.5 rounded-lg border border-[#d4af37]/30"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Galería ({savedCount})</span>
            </button>
          </div>

          {/* Date Selector and Liturgical Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {/* Quick Emmaus button */}
            <button
              onClick={onOpenEmmausSpecial}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 border ${
                currentDate === 'special-emmaus'
                  ? 'bg-[#c93b3e] text-white border-[#e05659] shadow-md shadow-red-950/50'
                  : 'bg-[#251710] text-[#eedbc6] hover:bg-[#342017] border-[#533423]'
              }`}
              title="Pasaje de los Discípulos de Emaús (Lucas 24, 13-35)"
            >
              <Flame className="w-3.5 h-3.5 text-[#ff7b7d]" />
              <span className="hidden sm:inline">Camino de</span> Emaús
            </button>

            {/* Day Nav Controls */}
            <div className="flex items-center bg-[#23150d] rounded-lg p-0.5 border border-[#4a2e1d]">
              <button
                onClick={() => handleStepDay(-1)}
                className="p-1.5 text-[#c8ad95] hover:text-[#f8ede0] hover:bg-[#382115] rounded-md transition-colors"
                title="Día anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="relative flex items-center px-2">
                <input
                  type="date"
                  value={currentDate === 'special-emmaus' ? todayStr : currentDate}
                  onChange={(e) => e.target.value && onDateChange(e.target.value)}
                  className="bg-transparent text-xs font-medium text-[#f3e7da] focus:outline-none cursor-pointer text-center"
                />
              </div>

              <button
                onClick={() => handleStepDay(1)}
                className="p-1.5 text-[#c8ad95] hover:text-[#f8ede0] hover:bg-[#382115] rounded-md transition-colors"
                title="Día siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick "Hoy" button */}
            {currentDate !== todayStr && (
              <button
                onClick={() => onDateChange(todayStr)}
                className="px-2.5 py-1.5 text-xs text-[#d4af37] bg-[#23150d] hover:bg-[#382115] rounded-lg border border-[#d4af37]/30 transition-colors"
              >
                Hoy
              </button>
            )}

            {/* Desktop Saved Gallery button */}
            <button
              onClick={onOpenHistory}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#d4af37] bg-[#23150d] hover:bg-[#382115] rounded-lg border border-[#d4af37]/30 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mis Obras ({savedCount})</span>
            </button>
          </div>

        </div>

          {/* Liturgical Season Summary Strip */}
          {liturgy && (
            <div className="mt-2.5 pt-2 border-t border-[#342015]/60 flex flex-wrap items-center justify-between text-xs text-[#bda48f] gap-2">
              <div className="flex items-center flex-wrap gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getLiturgicalBadgeColor(liturgy.liturgicalColor)}`}>
                  {liturgy.season} {liturgy.liturgicalColor && `• ${liturgy.liturgicalColor.toUpperCase()}`}
                </span>
                <span className="font-serif italic text-[#dfcaa7]">
                  {liturgy.feastOrSaint || liturgy.formattedDate}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#9b806b]">
                <span className="text-[#d4af37] font-medium font-serif">
                  {liturgy.gospel?.citation}
                </span>
                <span className="text-[#472c1c]">•</span>
                <span className="text-[10px] bg-[#23150d] px-2 py-0.5 rounded-md border border-[#3e2417] text-[#cbb29b]">
                  Fuentes: CEE & Dominicos.org
                </span>
              </div>
            </div>
          )}
      </div>
    </header>
  );
};
