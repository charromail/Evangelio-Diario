import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { GospelReader } from './components/GospelReader';
import { ArtworkGenerator } from './components/ArtworkGenerator';
import { GalleryModal } from './components/GalleryModal';
import { DailyLiturgy, GeneratedArtwork } from './types';
import { PRESET_LITURGY_DATABASE } from './data/liturgyData';
import { getLiturgicalInfoForDate, getDailyLiturgyForDate } from './utils/liturgicalCalendar';
import { Flame, Sparkles, RefreshCw, AlertCircle, Calendar } from 'lucide-react';

export default function App() {
  // Current selected liturgical date (YYYY-MM-DD or 'special-emmaus')
  // We can default to today's real date, or fallback to preset
  const todayStr = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState<string>(
    PRESET_LITURGY_DATABASE[todayStr] ? todayStr : '2026-08-19'
  );

  const [liturgy, setLiturgy] = useState<DailyLiturgy | null>(() => {
    const initialKey = PRESET_LITURGY_DATABASE[todayStr] ? todayStr : '2026-08-19';
    if (PRESET_LITURGY_DATABASE[initialKey]) {
      return PRESET_LITURGY_DATABASE[initialKey];
    }
    return getDailyLiturgyForDate(initialKey);
  });
  
  const [isLoadingLiturgy, setIsLoadingLiturgy] = useState<boolean>(false);
  const [liturgyError, setLiturgyError] = useState<string | null>(null);

  // Active Tab in Gospel Reader
  const [activeTab, setActiveTab] = useState<'gospel' | 'firstReading' | 'psalm' | 'secondReading' | 'reflection' | 'lectio'>('gospel');

  // Active scene prompt for art generator
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [activeSceneTitle, setActiveSceneTitle] = useState<string>('');

  // Gallery Modal
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [savedArtworks, setSavedArtworks] = useState<GeneratedArtwork[]>(() => {
    try {
      const stored = localStorage.getItem('emaus_saved_artworks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save artworks to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('emaus_saved_artworks', JSON.stringify(savedArtworks));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }
  }, [savedArtworks]);

  // Fetch or resolve Daily Liturgy when date changes
  useEffect(() => {
    let isMounted = true;
    const calInfo = getLiturgicalInfoForDate(currentDate);

    // 1. Check presets first for instant zero-latency loading
    if (PRESET_LITURGY_DATABASE[currentDate]) {
      const preset = PRESET_LITURGY_DATABASE[currentDate];
      setLiturgy({
        ...preset,
        formattedDate: calInfo.formattedDate,
        feastOrSaint: preset.feastOrSaint || calInfo.feastOrSaint,
        season: preset.season || calInfo.season,
      });
      setActivePrompt(preset.artPrompt);
      setActiveSceneTitle(preset.suggestedScenes?.[0]?.title || '');
      setLiturgyError(null);
      return;
    }

    // 2. Compute authentic lectionary liturgy for this date immediately
    const computedLiturgy = getDailyLiturgyForDate(currentDate);
    setLiturgy(computedLiturgy);
    setActivePrompt(computedLiturgy.artPrompt);
    setActiveSceneTitle(computedLiturgy.suggestedScenes?.[0]?.title || '');

    // 3. In parallel, fetch from server API which uses Gemini for enhanced homily/reflection
    setIsLoadingLiturgy(true);
    setLiturgyError(null);

    fetch(`/api/liturgy/daily?date=${encodeURIComponent(currentDate)}`)
      .then((res) => res.json())
      .then((resData) => {
        if (!isMounted) return;
        if (resData.success && resData.data) {
          setLiturgy({
            ...resData.data,
            formattedDate: resData.data.formattedDate || calInfo.formattedDate,
            feastOrSaint: resData.data.feastOrSaint || calInfo.feastOrSaint,
            season: resData.data.season || calInfo.season,
            liturgicalColor: resData.data.liturgicalColor || calInfo.liturgicalColor,
          });
          if (resData.data.artPrompt) setActivePrompt(resData.data.artPrompt);
          if (resData.data.suggestedScenes?.[0]?.title) setActiveSceneTitle(resData.data.suggestedScenes[0].title);
        }
      })
      .catch((err) => {
        console.warn('Liturgy API note:', err);
        // Computed liturgy is already in state with exact Gospel and citation for this date
      })
      .finally(() => {
        if (isMounted) setIsLoadingLiturgy(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentDate]);

  const handleSelectScene = (prompt: string, title: string) => {
    setActivePrompt(prompt);
    setActiveSceneTitle(title);
  };

  const handleSaveArtwork = (artwork: GeneratedArtwork) => {
    setSavedArtworks((prev) => [artwork, ...prev.filter((a) => a.id !== artwork.id)]);
  };

  const handleDeleteArtwork = (id: string) => {
    setSavedArtworks((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#110b07] text-[#f4efe6] flex flex-col selection:bg-[#c93b3e]/30 selection:text-[#ffdedf]">
      {/* Top Navbar */}
      <Navbar
        currentDate={currentDate}
        onDateChange={(date) => {
          setCurrentDate(date);
          setActiveTab('gospel');
        }}
        liturgy={liturgy}
        onOpenEmmausSpecial={() => {
          setCurrentDate('special-emmaus');
          setActiveTab('gospel');
        }}
        onOpenHistory={() => setIsGalleryOpen(true)}
        savedCount={savedArtworks.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {isLoadingLiturgy ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-[#8d5b36]/30 border-t-[#d4af37] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#ff8c42] animate-pulse" />
              </div>
            </div>
            <div>
              <p className="font-cinzel text-lg font-bold text-[#faefe0]">
                Cargando el Evangelio y Liturgia del Día...
              </p>
              <p className="text-xs text-[#b89f89] font-serif italic mt-1">
                Consultando el Calendario Litúrgico de la Iglesia Católica
              </p>
            </div>
          </div>
        ) : liturgy ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Gospel & Liturgical Reader (7 Cols) */}
            <div className="lg:col-span-7 h-full">
              <GospelReader
                liturgy={liturgy}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onGenerateScene={handleSelectScene}
              />
            </div>

            {/* Right Column: 4:5 Artwork Studio with Emaús Logo (5 Cols) */}
            <div className="lg:col-span-5 h-full sticky top-24">
              <ArtworkGenerator
                liturgy={liturgy}
                activePrompt={activePrompt}
                activeSceneTitle={activeSceneTitle}
                onSaveArtwork={handleSaveArtwork}
              />
            </div>

          </div>
        ) : (
          <div className="bg-[#1b120c] p-8 rounded-2xl border border-[#3e2719] text-center max-w-md mx-auto my-16 space-y-4">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
            <p className="font-cinzel text-base font-bold text-[#faefe0]">
              No se pudo cargar la liturgia
            </p>
            <button
              onClick={() => setCurrentDate('2026-08-19')}
              className="px-4 py-2 rounded-xl bg-[#8d5b36] text-white text-xs font-semibold"
            >
              Cargar Evangelio de Hoy
            </button>
          </div>
        )}
      </main>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        savedArtworks={savedArtworks}
        onSelectArtwork={(art) => {
          setCurrentDate(art.date);
          setActivePrompt(art.prompt);
        }}
        onDeleteArtwork={handleDeleteArtwork}
      />

      {/* Subtle Devotional Footer */}
      <footer className="border-t border-[#2d1b11] bg-[#120c08] py-4 text-center text-xs text-[#8c7462]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c93b3e]" />
            <span className="font-serif italic">
              «¿No ardía nuestro corazón mientras nos hablaba en el camino?» — Lucas 24, 32
            </span>
          </div>
          <div>
            <span>Comunidad de Emaús • Evangelio Diario & Arte Sacro 4:5</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
