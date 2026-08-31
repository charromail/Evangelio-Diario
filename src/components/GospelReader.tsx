import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Volume2, VolumeX, Copy, Check, Sparkles, Heart, Flame, 
  Bookmark, ArrowRight, Quote, CheckCircle2, Hash, X, Share2, ExternalLink 
} from 'lucide-react';
import { DailyLiturgy } from '../types';
import { formatGospelForInstagram, toUnicodeBold, toDoubleStruck } from '../utils/instagramFormatter';

interface GospelReaderProps {
  liturgy: DailyLiturgy;
  activeTab: 'gospel' | 'firstReading' | 'psalm' | 'secondReading' | 'reflection' | 'lectio';
  onTabChange: (tab: 'gospel' | 'firstReading' | 'psalm' | 'secondReading' | 'reflection' | 'lectio') => void;
  onGenerateScene: (prompt: string, title: string) => void;
}

interface CopyToastInfo {
  title: string;
  header: string;
  book: string;
  citation: string;
  preview: string;
  hashtagsCount: number;
}

export const GospelReader: React.FC<GospelReaderProps> = ({
  liturgy,
  activeTab,
  onTabChange,
  onGenerateScene,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copyToast, setCopyToast] = useState<CopyToastInfo | null>(null);

  // Cancel speech on unmount or tab change
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeTab, liturgy.date]);

  // Auto-dismiss toast notification after 5 seconds
  useEffect(() => {
    if (!copyToast) return;
    const timer = setTimeout(() => {
      setCopyToast(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [copyToast]);

  const handleToggleSpeech = (textToRead: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = textToRead.replace(/[*_#«»—]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.92; // Reverent prayerful pace
    utterance.pitch = 1.0;

    // Pick Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') || v.name.includes('Spanish'));
    if (esVoice) utterance.voice = esVoice;

    utterance.onend = () => setIsPlayingSpeech(false);
    utterance.onerror = () => setIsPlayingSpeech(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingSpeech(true);
  };

  const handleCopyGospel = () => {
    // Primera línea: Fecha litúrgica + Festividad / Memoria / Tiempo Ordinario (sin "Evangelio de hoy")
    const liturgicalHeader = liturgy.feastOrSaint
      ? `${liturgy.formattedDate} - ${liturgy.feastOrSaint}`
      : `${liturgy.formattedDate} - ${liturgy.season}`;

    const fullText = formatGospelForInstagram(
      liturgicalHeader,
      liturgy.gospel.book,
      liturgy.gospel.citation,
      liturgy.gospel.text
    );
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setCopyToast({
      title: '¡Evangelio copiado para Instagram!',
      header: liturgicalHeader,
      book: toUnicodeBold(liturgy.gospel.book),
      citation: toDoubleStruck(liturgy.gospel.citation),
      preview: liturgy.gospel.text.slice(0, 130) + '...',
      hashtagsCount: 14,
    });
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyReading = (header: string, title: string, citation: string, text: string, closing: string) => {
    const liturgicalHeader = liturgy.feastOrSaint
      ? `${liturgy.formattedDate} - ${liturgy.feastOrSaint}`
      : `${liturgy.formattedDate} - ${liturgy.season}`;

    const fullText = `${liturgicalHeader}\n\n${toUnicodeBold(title)}\n${toDoubleStruck(citation)}\n\n${text}${closing ? `\n\n${toUnicodeBold(closing)}` : ''}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setCopyToast({
      title: `¡${header} copiada para Instagram!`,
      header: liturgicalHeader,
      book: toUnicodeBold(title),
      citation: toDoubleStruck(citation),
      preview: text.slice(0, 130) + '...',
      hashtagsCount: 0,
    });
    setTimeout(() => setCopied(false), 2200);
  };

  const getTextClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="bg-[#1b120c] rounded-2xl border border-[#3e2719] shadow-xl overflow-hidden flex flex-col h-full">
      {/* Liturgical Reading Tabs Header */}
      <div className="bg-[#150d08] border-b border-[#362114] px-4 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => onTabChange('gospel')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
              activeTab === 'gospel'
                ? 'bg-gradient-to-r from-[#9b2c2c] to-[#c93b3e] text-white shadow-md shadow-red-950/40'
                : 'text-[#d4beaa] hover:bg-[#281910] hover:text-[#f8ede0]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Evangelio</span>
          </button>

          <button
            onClick={() => onTabChange('reflection')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
              activeTab === 'reflection'
                ? 'bg-[#8d5b36] text-white shadow-md'
                : 'text-[#d4beaa] hover:bg-[#281910] hover:text-[#f8ede0]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#ff8c42]" />
            <span>Reflexión Emaús</span>
          </button>

          <button
            onClick={() => onTabChange('firstReading')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeTab === 'firstReading'
                ? 'bg-[#3b2518] text-[#f8ede0] border border-[#6d432b]'
                : 'text-[#a98f79] hover:bg-[#281910]'
            }`}
          >
            1ª Lectura
          </button>

          <button
            onClick={() => onTabChange('psalm')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
              activeTab === 'psalm'
                ? 'bg-[#3b2518] text-[#f8ede0] border border-[#6d432b]'
                : 'text-[#a98f79] hover:bg-[#281910]'
            }`}
          >
            Salmo
          </button>

          {liturgy.secondReading && (
            <button
              onClick={() => onTabChange('secondReading')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                activeTab === 'secondReading'
                  ? 'bg-[#3b2518] text-[#f8ede0] border border-[#6d432b]'
                : 'text-[#a98f79] hover:bg-[#281910]'
              }`}
            >
              2ª Lectura
            </button>
          )}

          <button
            onClick={() => onTabChange('lectio')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all flex items-center gap-1 ${
              activeTab === 'lectio'
                ? 'bg-[#2f1f15] text-[#eedbc6] border border-[#5d3b25]'
                : 'text-[#a98f79] hover:bg-[#281910]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Lectio Divina</span>
          </button>
        </div>

        {/* Font size and Audio controls */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-[#23150d] rounded-lg p-0.5 border border-[#3e2719]">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 text-xs font-serif rounded ${fontSize === 'normal' ? 'bg-[#432717] text-[#f5ebd9]' : 'text-[#9e836f]'}`}
              title="Tamaño normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 text-sm font-serif rounded ${fontSize === 'large' ? 'bg-[#432717] text-[#f5ebd9]' : 'text-[#9e836f]'}`}
              title="Tamaño grande"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-5">
        {/* EVANGELIO TAB */}
        {activeTab === 'gospel' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header & Citation */}
            <div className="border-b border-[#3d2719] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  {liturgy.gospel.book}
                </span>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#faefe0] mt-0.5">
                  {liturgy.gospel.citation}
                </h2>
                <p className="text-xs text-[#b89f89] font-serif italic mt-1">
                  «{liturgy.gospel.summary}»
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleSpeech(`${liturgy.gospel.book}, capítulo ${liturgy.gospel.citation}. ${liturgy.gospel.text}`)}
                  className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isPlayingSpeech
                      ? 'bg-[#c93b3e] text-white border-[#e05659] animate-pulse'
                      : 'bg-[#271810] text-[#eedbc6] hover:bg-[#382216] border-[#4a2e1d]'
                  }`}
                  title={isPlayingSpeech ? 'Detener lectura en voz alta' : 'Escuchar el Evangelio'}
                >
                  {isPlayingSpeech ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#d4af37]" />}
                  <span className="hidden sm:inline">{isPlayingSpeech ? 'Detener' : 'Escuchar'}</span>
                </button>

                <button
                  onClick={handleCopyGospel}
                  className="p-2 rounded-xl bg-[#271810] text-[#eedbc6] hover:bg-[#382216] border border-[#4a2e1d] text-xs transition-colors flex items-center gap-1.5"
                  title="Copiar Evangelio con formato Instagram"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? 'Copiado para Instagram' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* Gospel Acclamation */}
            <div className="bg-[#24160e] p-3 rounded-xl border border-[#462d1c] flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="text-xs text-[#dfcaa7] italic font-serif leading-relaxed">
                {liturgy.gospelAcclamation}
              </p>
            </div>

            {/* Key Verse Highlight Box */}
            <div className="bg-gradient-to-r from-[#2c170d] via-[#3d2012] to-[#2c170d] p-4 sm:p-5 rounded-2xl border-2 border-[#d4af37]/40 shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
                  Versículo Clave del Día
                </span>
              </div>
              <p className="font-serif italic text-base sm:text-lg text-[#faefe0] font-medium leading-relaxed">
                {liturgy.gospel.keyVerse}
              </p>
            </div>

            {/* Gospel Main Scripture Text */}
            <div className={`font-scripture text-[#f2e6d5] space-y-4 whitespace-pre-line tracking-wide ${getTextClass()}`}>
              {liturgy.gospel.text}
            </div>

            {/* Prompt Quick Scenes Bar */}
            {liturgy.suggestedScenes && liturgy.suggestedScenes.length > 0 && (
              <div className="mt-6 pt-5 border-t border-[#3b2417] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                      Escenas del Evangelio para Ilustrar
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#9b806b]">Formato 4:5 Óleo Sacro</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {liturgy.suggestedScenes.map((scene) => (
                    <button
                      key={scene.id}
                      onClick={() => onGenerateScene(scene.prompt, scene.title)}
                      className="text-left p-3 rounded-xl bg-[#23150d] hover:bg-[#341f13] border border-[#4a2e1d] hover:border-[#d4af37]/50 transition-all group flex flex-col justify-between gap-1.5 shadow-sm"
                    >
                      <div>
                        <div className="font-serif text-sm font-semibold text-[#f8ede0] group-hover:text-[#d4af37] transition-colors">
                          {scene.title}
                        </div>
                        <div className="text-xs text-[#a98f79] line-clamp-2 mt-0.5">
                          {scene.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#d4af37] font-medium mt-1">
                        <span>Generar Arte 4:5</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* REFLEXIÓN EMAÚS TAB */}
        {activeTab === 'reflection' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-[#3d2719] pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#ff8c42] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Espiritualidad de Emaús
                </span>
                <h2 className="font-cinzel text-xl font-bold text-[#faefe0] mt-0.5">
                  {liturgy.reflection.title}
                </h2>
              </div>
              <button
                onClick={() => handleToggleSpeech(`${liturgy.reflection.title}. ${liturgy.reflection.content}. Para nuestro camino de Emaús: ${liturgy.reflection.emmausHeart}. Oración: ${liturgy.prayer}`)}
                className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isPlayingSpeech
                    ? 'bg-[#c93b3e] text-white border-[#e05659] animate-pulse'
                    : 'bg-[#271810] text-[#eedbc6] hover:bg-[#382216] border-[#4a2e1d]'
                }`}
              >
                {isPlayingSpeech ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#d4af37]" />}
                <span className="hidden sm:inline">{isPlayingSpeech ? 'Detener' : 'Escuchar'}</span>
              </button>
            </div>

            {/* Emmaus Heart Callout */}
            <div className="bg-gradient-to-br from-[#3b1c12] to-[#25120a] p-5 rounded-2xl border-2 border-[#ff8c42]/40 shadow-lg space-y-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#ff8c42]" />
                <h3 className="font-cinzel text-sm font-bold text-[#ffb076]">
                  ¿No ardía nuestro corazón?
                </h3>
              </div>
              <p className="font-serif italic text-base text-[#faefe0] leading-relaxed">
                {liturgy.reflection.emmausHeart}
              </p>
            </div>

            {/* Detailed Reflection */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Meditación del Evangelio
              </h4>
              <p className={`text-[#ebdccb] font-serif leading-relaxed whitespace-pre-line ${getTextClass()}`}>
                {liturgy.reflection.content}
              </p>
            </div>

            {/* Action for Today */}
            <div className="bg-[#241710] p-4 rounded-xl border border-[#523321] space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8ec07c] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Propósito para Caminar Hoy
              </div>
              <p className="text-sm text-[#f0e4d4] font-serif italic">
                {liturgy.reflection.actionForToday}
              </p>
            </div>

            {/* Daily Prayer */}
            <div className="bg-[#18100b] p-4 rounded-xl border border-[#3b2518] space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Oración del Día
              </div>
              <p className="text-sm text-[#dfcaa7] font-serif italic leading-relaxed">
                {liturgy.prayer}
              </p>
            </div>
          </div>
        )}

        {/* PRIMERA LECTURA TAB */}
        {activeTab === 'firstReading' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border-b border-[#3d2719] pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  {liturgy.firstReading.title}
                </span>
                <h2 className="font-cinzel text-xl font-bold text-[#faefe0] mt-0.5">
                  {liturgy.firstReading.citation}
                </h2>
              </div>
              <button
                onClick={() => handleCopyReading('Primera Lectura', liturgy.firstReading.title, liturgy.firstReading.citation, liturgy.firstReading.text, 'Palabra de Dios')}
                className="p-2 rounded-xl bg-[#271810] text-[#eedbc6] hover:bg-[#382216] border border-[#4a2e1d] text-xs transition-colors"
                title="Copiar Primera Lectura"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className={`font-scripture text-[#f2e6d5] space-y-4 whitespace-pre-line tracking-wide ${getTextClass()}`}>
              {liturgy.firstReading.text}
            </div>
          </div>
        )}

        {/* SALMO RESPONSORIAL TAB */}
        {activeTab === 'psalm' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border-b border-[#3d2719] pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  {liturgy.psalm.title}
                </span>
                <h2 className="font-cinzel text-xl font-bold text-[#faefe0] mt-0.5">
                  {liturgy.psalm.citation}
                </h2>
              </div>
              <button
                onClick={() => handleCopyReading('Salmo Responsorial', liturgy.psalm.title, liturgy.psalm.citation, `R/. ${liturgy.psalm.response}\n\n${liturgy.psalm.text}`, '')}
                className="p-2 rounded-xl bg-[#271810] text-[#eedbc6] hover:bg-[#382216] border border-[#4a2e1d] text-xs transition-colors"
                title="Copiar Salmo"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Psalm Response */}
            {liturgy.psalm.response && (
              <div className="bg-[#2a1a11] p-4 rounded-xl border border-[#523321]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] block mb-1">
                  Respuesta de la Comunidad
                </span>
                <p className="font-serif italic text-base text-[#faefe0] font-semibold">
                  R/. {liturgy.psalm.response}
                </p>
              </div>
            )}

            <div className={`font-scripture text-[#f2e6d5] space-y-4 whitespace-pre-line tracking-wide ${getTextClass()}`}>
              {liturgy.psalm.text}
            </div>
          </div>
        )}

        {/* SEGUNDA LECTURA TAB */}
        {activeTab === 'secondReading' && liturgy.secondReading && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border-b border-[#3d2719] pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                  {liturgy.secondReading.title}
                </span>
                <h2 className="font-cinzel text-xl font-bold text-[#faefe0] mt-0.5">
                  {liturgy.secondReading.citation}
                </h2>
              </div>
              <button
                onClick={() => handleCopyReading('Segunda Lectura', liturgy.secondReading!.title, liturgy.secondReading!.citation, liturgy.secondReading!.text, 'Palabra de Dios')}
                className="p-2 rounded-xl bg-[#271810] text-[#eedbc6] hover:bg-[#382216] border border-[#4a2e1d] text-xs transition-colors"
                title="Copiar Segunda Lectura"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className={`font-scripture text-[#f2e6d5] space-y-4 whitespace-pre-line tracking-wide ${getTextClass()}`}>
              {liturgy.secondReading.text}
            </div>
          </div>
        )}

        {/* LECTIO DIVINA TAB */}
        {activeTab === 'lectio' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="border-b border-[#3d2719] pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                Método Tradicional de Oración
              </span>
              <h2 className="font-cinzel text-xl font-bold text-[#faefe0] mt-0.5">
                Lectio Divina con el Evangelio de Hoy
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-[#24160e] p-4 rounded-xl border border-[#492e1d]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center text-[11px]">1</span>
                  Lectio (Lectura)
                </div>
                <p className="text-xs sm:text-sm text-[#e8d5c4] font-serif leading-relaxed">
                  ¿Qué dice el texto bíblico en sí mismo? Lee el Evangelio despacio, saboreando cada palabra de Jesús y observando los personajes y sus actitudes.
                </p>
              </div>

              <div className="bg-[#24160e] p-4 rounded-xl border border-[#492e1d]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff8c42] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff8c42]/20 text-[#ff8c42] flex items-center justify-center text-[11px]">2</span>
                  Meditatio (Meditación)
                </div>
                <p className="text-xs sm:text-sm text-[#e8d5c4] font-serif leading-relaxed">
                  ¿Qué me dice Dios hoy a mí a través de este pasaje? ¿En qué momento de mi vida me encuentro como los discípulos de Emaús? Deja que la Palabra interrogue tu realidad.
                </p>
              </div>

              <div className="bg-[#24160e] p-4 rounded-xl border border-[#492e1d]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e05659] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#e05659]/20 text-[#e05659] flex items-center justify-center text-[11px]">3</span>
                  Oratio (Oración)
                </div>
                <p className="text-xs sm:text-sm text-[#e8d5c4] font-serif leading-relaxed">
                  ¿Qué le respondo yo a Dios? Háblale a Jesús con el corazón abierto, pidiendo perdón, dando gracias o suplicando la gracia de levantarte y andar.
                </p>
              </div>

              <div className="bg-[#24160e] p-4 rounded-xl border border-[#492e1d]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8ec07c] mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#8ec07c]/20 text-[#8ec07c] flex items-center justify-center text-[11px]">4</span>
                  Contemplatio (Contemplación y Acción)
                </div>
                <p className="text-xs sm:text-sm text-[#e8d5c4] font-serif leading-relaxed">
                  Descansa en el silencio de su presencia amorosa y asume el compromiso de caminar con los hermanos y anunciar con gozo el Evangelio.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Official Sources Reference Footer */}
        <div className="mt-8 pt-4 border-t border-[#362114] flex flex-wrap items-center justify-between gap-3 text-xs text-[#a88d75]">
          <div className="flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Fuentes litúrgicas oficiales:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={liturgy.sources?.ceeUrl || "https://www.conferenciaepiscopal.es/liturgia-en-espanol/"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#ffb076] hover:text-[#ffc9a1] transition-colors hover:underline text-[11.5px]"
            >
              <span>Conferencia Episcopal Española</span>
              <ExternalLink className="w-3 h-3 text-[#ffb076]" />
            </a>
            <span className="text-[#553622] hidden sm:inline">•</span>
            <a
              href={liturgy.sources?.dominicosUrl || "https://dominicos.org/predicacion/evangelio-del-dia/"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#d4af37] hover:text-[#fae596] transition-colors hover:underline text-[11.5px]"
            >
              <span>Dominicos.org</span>
              <ExternalLink className="w-3 h-3 text-[#d4af37]" />
            </a>
          </div>
        </div>
      </div>

      {/* Visual Popup Notification (Toast) confirming Instagram copy */}
      {copyToast && (
        <div className="fixed bottom-6 right-4 sm:right-8 z-50 max-w-md w-full animate-fadeIn">
          <div className="bg-[#1e130c]/95 backdrop-blur-md border-2 border-[#d4af37]/60 rounded-2xl p-4 shadow-2xl text-xs text-[#faefe0] space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#faefe0] font-cinzel">
                    {copyToast.title}
                  </h4>
                  <p className="text-[11px] text-[#cbb29b]">
                    Listo para pegar directamente en tu publicación o historia
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCopyToast(null)}
                className="p-1 rounded-lg text-[#a98f79] hover:text-[#faefe0] hover:bg-[#341e13] transition-colors"
                title="Cerrar notificación"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Structure Badges */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <span className="bg-[#2e1d13] text-[#d4beaa] px-2 py-0.5 rounded-md border border-[#4a2e1d] text-[10px]">
                Encabezado normal
              </span>
              <span className="bg-[#2e1d13] text-[#ffb076] px-2 py-0.5 rounded-md border border-[#ff8c42]/30 text-[10px] font-bold">
                Título Negrita
              </span>
              <span className="bg-[#2e1d13] text-[#d4af37] px-2 py-0.5 rounded-md border border-[#d4af37]/30 text-[10px]">
                Cita 𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜
              </span>
              <span className="bg-[#2e1d13] text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-600/30 text-[10px] font-bold">
                𝗣𝗮𝗹𝗮𝗯𝗿𝗮 𝗱𝗲𝗹 𝗦𝗲ñ𝗼𝗿
              </span>
              {copyToast.hashtagsCount > 0 && (
                <span className="bg-[#2e1d13] text-amber-200 px-2 py-0.5 rounded-md border border-amber-600/30 text-[10px] flex items-center gap-1 font-medium">
                  <Hash className="w-3 h-3 text-[#d4af37]" /> {copyToast.hashtagsCount} hashtags
                </span>
              )}
            </div>

            {/* Formatted Preview Box */}
            <div className="bg-[#120a06] p-2.5 rounded-xl border border-[#3a2214] font-serif text-[11px] text-[#ecdccb] space-y-1 max-h-24 overflow-y-auto">
              <div className="text-[#d4beaa] text-[10.5px] font-sans font-medium">{copyToast.header}</div>
              <div className="font-sans font-bold text-[#f5ecd9]">{copyToast.book}</div>
              <div className="text-[#d4af37]">{copyToast.citation}</div>
              <div className="text-[#d5c3b1] line-clamp-1 italic">{copyToast.preview}</div>
              <div className="font-sans font-bold text-emerald-400">𝗣𝗮𝗹𝗮𝗯𝗿𝗮 𝗱𝗲𝗹 𝗦𝗲ñ𝗼𝗿</div>
              {copyToast.hashtagsCount > 0 && (
                <div className="text-[10px] text-amber-300/80 line-clamp-1 font-sans">
                  #EvangelioDelDía #PalabraDeDios #Emaús #Católicos #Liturgia...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
