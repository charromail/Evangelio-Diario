import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Download, Copy, Check, Sliders, RefreshCw, Maximize2, 
  Share2, Eye, ShieldCheck, Heart, Flame, Image as ImageIcon,
  Layers, AlertCircle, Info, Upload, RotateCcw, ImagePlus, CheckCircle2,
  X, ArrowUpRight
} from 'lucide-react';
import { DailyLiturgy, GeneratedArtwork, WatermarkSettings } from '../types';
import { compositeEmausArtwork, downloadImage, DEFAULT_WATERMARK_SETTINGS } from '../utils/imageCompositor';
import { PRESET_ARTWORKS } from '../data/presetImages';

interface ArtworkGeneratorProps {
  liturgy: DailyLiturgy;
  activePrompt: string;
  activeSceneTitle: string;
  onSaveArtwork: (artwork: GeneratedArtwork) => void;
}

export const ArtworkGenerator: React.FC<ArtworkGeneratorProps> = ({
  liturgy,
  activePrompt,
  activeSceneTitle,
  onSaveArtwork,
}) => {
  // Current raw image (Base64 or URL)
  const [rawImageUrl, setRawImageUrl] = useState<string>('');
  // Composited 4:5 image with Emaús logo embedded
  const [compositedUrl, setCompositedUrl] = useState<string>('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompositing, setIsCompositing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [isManualUpload, setIsManualUpload] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  // Watermark / Emaús logo configuration persisted in localStorage
  const [watermarkSettings, setWatermarkSettings] = useState<WatermarkSettings>(() => {
    try {
      const saved = localStorage.getItem('emaus_watermark_settings');
      const savedLogo = localStorage.getItem('emaus_custom_logo_persisted');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_WATERMARK_SETTINGS,
          ...parsed,
          customLogoUrl: savedLogo || parsed.customLogoUrl || undefined,
        };
      }
      if (savedLogo) {
        return {
          ...DEFAULT_WATERMARK_SETTINGS,
          customLogoUrl: savedLogo,
          showLogo: true,
        };
      }
    } catch (e) {
      console.warn('Error reading watermark settings from localStorage:', e);
    }
    return DEFAULT_WATERMARK_SETTINGS;
  });

  // Keep watermark settings and custom logo permanently persisted
  useEffect(() => {
    try {
      localStorage.setItem('emaus_watermark_settings', JSON.stringify(watermarkSettings));
      if (watermarkSettings.customLogoUrl) {
        localStorage.setItem('emaus_custom_logo_persisted', watermarkSettings.customLogoUrl);
      }
    } catch (e) {
      console.warn('Error saving watermark settings to localStorage:', e);
    }
  }, [watermarkSettings]);

  const handleCustomLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        const dataUrl深入 = event.target?.result as string;
        try {
          localStorage.setItem('emaus_custom_logo_persisted', dataUrl深入);
        } catch (err) {
          console.warn('Could not persist custom logo to localStorage:', err);
        }
        setWatermarkSettings(prev => ({
          ...prev,
          customLogoUrl: dataUrl深入,
          showLogo: true
        }));
        window.dispatchEvent(new Event('emaus_logo_updated'));
        setUploadToast('¡Logotipo de Emaús guardado permanentemente! Se mantendrá activo en todas las obras hasta que decidas cambiarlo.');
        setTimeout(() => setUploadToast(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetToDefaultLogo = () => {
    try {
      localStorage.removeItem('emaus_custom_logo_persisted');
      const saved = localStorage.getItem('emaus_watermark_settings');
      if (saved) {
        const parsed专 = JSON.parse(saved);
        delete parsed专.customLogoUrl;
        localStorage.setItem('emaus_watermark_settings', JSON.stringify(parsed专));
      }
    } catch (e) {
      console.warn(e);
    }
    setWatermarkSettings(prev => ({
      ...prev,
      customLogoUrl: undefined
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
    window.dispatchEvent(new Event('emaus_logo_updated'));
    setUploadToast('Se ha restablecido el logo predeterminado oficial de Emaús.');
    setTimeout(() => setUploadToast(null), 2500);
  };

  // Handler for uploading a manual image for this day
  const handleProcessUploadedImage = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecciona un archivo de imagen válido (JPG, PNG, WEBP, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        const dataUrl = event.target?.result as string;
        setRawImageUrl(dataUrl);
        setIsManualUpload(true);
        setErrorMessage(null);

        // Store in localStorage for this specific date
        try {
          localStorage.setItem(`emaus_manual_img_${liturgy.date}`, dataUrl);
        } catch (e) {
          console.warn('Could not persist to localStorage:', e);
        }

        // Save into collection
        const manualArtwork: GeneratedArtwork = {
          id: `manual-${Date.now()}`,
          date: liturgy.date,
          gospelCitation: liturgy.gospel.citation,
          prompt: `Imagen subida manualmente para el ${liturgy.formattedDate}`,
          imageUrl: dataUrl,
          createdAt: new Date().toISOString(),
          aspectRatio: '4:5',
          style: 'Obra personalizada (Subida manual)',
        };
        onSaveArtwork(manualArtwork);

        setUploadToast('¡Imagen subida correctamente! Se ha aplicado el formato y sello de Emaús.');
        setTimeout(() => setUploadToast(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefaultArtwork = () => {
    try {
      localStorage.removeItem(`emaus_manual_img_${liturgy.date}`);
    } catch (e) {}
    
    setIsManualUpload(false);
    const preset = PRESET_ARTWORKS[liturgy.date];
    if (preset) {
      setRawImageUrl(preset.url);
    } else {
      setRawImageUrl(PRESET_ARTWORKS['2026-07-02']?.url || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&h=1350&q=85');
    }
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';
    setUploadToast('Se ha restablecido la imagen sacra predeterminada para este día.');
    setTimeout(() => setUploadToast(null), 2500);
  };

  // Sync with active prompt when liturgical date or scene selection changes
  useEffect(() => {
    const defaultPrompt = activePrompt || liturgy.artPrompt;
    setCustomPrompt(defaultPrompt);

    // 1. Check if user previously uploaded a manual image for this date
    try {
      const storedManual = localStorage.getItem(`emaus_manual_img_${liturgy.date}`);
      if (storedManual) {
        setRawImageUrl(storedManual);
        setIsManualUpload(true);
        return;
      }
    } catch (e) {
      console.warn(e);
    }

    setIsManualUpload(false);

    // 2. Load preset initial image if available for this date
    const preset = PRESET_ARTWORKS[liturgy.date];
    if (preset) {
      setRawImageUrl(preset.url);
    } else {
      // Fallback base artwork
      setRawImageUrl(PRESET_ARTWORKS['2026-07-02']?.url || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&h=1350&q=85');
    }
  }, [liturgy.date, activePrompt]);

  // Re-composite whenever rawImageUrl, watermarkSettings, or verse changes
  useEffect(() => {
    if (!rawImageUrl) return;

    let isMounted = true;
    setIsCompositing(true);

    compositeEmausArtwork(
      rawImageUrl,
      watermarkSettings,
      {
        citation: liturgy.gospel.citation,
        text: liturgy.gospel.keyVerse,
        date: liturgy.formattedDate,
      }
    )
      .then((dataUrl) => {
        if (isMounted) {
          setCompositedUrl(dataUrl);
          setIsCompositing(false);
        }
      })
      .catch((err) => {
        console.error('Compositing error:', err);
        if (isMounted) {
          setCompositedUrl(rawImageUrl); // fallback to raw
          setIsCompositing(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [rawImageUrl, watermarkSettings, liturgy.gospel.keyVerse, liturgy.gospel.citation]);

  // Handle AI Image Generation via Backend Server
  const handleGenerateArtwork = async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    setGenerationStep('Interpretando el pasaje del Evangelio...');

    try {
      setGenerationStep('Pintando al óleo sacro en formato 4:5...');
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt || liturgy.artPrompt,
          gospelCitation: liturgy.gospel.citation,
          sceneTitle: activeSceneTitle || liturgy.gospel.summary,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'No se pudo generar la imagen');
      }

      setGenerationStep('Insertando el sello y logo de Emaús en la esquina...');
      setRawImageUrl(data.imageUrl);

      if (data.notice) {
        setErrorMessage(data.notice);
      } else {
        setErrorMessage(null);
      }

      // Save to collection
      const newArtwork: GeneratedArtwork = {
        id: `art-${Date.now()}`,
        date: liturgy.date,
        gospelCitation: liturgy.gospel.citation,
        prompt: customPrompt,
        imageUrl: data.imageUrl,
        createdAt: new Date().toISOString(),
        aspectRatio: '4:5',
        style: 'Óleo clásico bíblico (Escuela de Caravaggio y Rembrandt)',
      };
      onSaveArtwork(newArtwork);
    } catch (err: any) {
      console.warn('AI generation error:', err);
      setErrorMessage(
        err.message?.includes('GEMINI_API_KEY')
          ? 'Configura tu clave de Gemini en el panel de Ajustes para generar imágenes personalizadas con IA.'
          : `Aviso: ${err.message || 'Error en la generación'}. Mostrando obra sacra de referencia.`
      );
      // Ensure we still have an artwork ready
      if (!rawImageUrl) {
        setRawImageUrl(PRESET_ARTWORKS['2026-07-02'].url);
      }
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleDownloadImage = (withBanner: boolean = false) => {
    if (!compositedUrl) return;

    if (withBanner !== watermarkSettings.includeVerseBanner) {
      // Temporary generate with the requested banner mode
      compositeEmausArtwork(
        rawImageUrl,
        { ...watermarkSettings, includeVerseBanner: withBanner },
        {
          citation: liturgy.gospel.citation,
          text: liturgy.gospel.keyVerse,
          date: liturgy.formattedDate,
        }
      ).then((bannerDataUrl) => {
        const filename = `evangelio-emaus-${liturgy.date}-${withBanner ? 'devocional' : 'arte4x5'}.jpg`;
        downloadImage(bannerDataUrl, filename);
      });
    } else {
      const filename = `evangelio-emaus-${liturgy.date}-${withBanner ? 'devocional' : 'arte4x5'}.jpg`;
      downloadImage(compositedUrl, filename);
    }
  };

  const handleCopyImage = async () => {
    if (!compositedUrl) return;
    try {
      const res = await fetch(compositedUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.warn('Clipboard write failed, copying link:', err);
      navigator.clipboard.writeText(compositedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="bg-[#1b120c] rounded-2xl border border-[#3e2719] shadow-xl overflow-hidden flex flex-col h-full">
      {/* Header bar */}
      <div className="bg-[#150d08] border-b border-[#362114] px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#c93b3e]/20 text-[#ff7b7d] flex items-center justify-center">
            <ImageIcon className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-cinzel text-sm sm:text-base font-bold text-[#faefe0] flex items-center gap-2">
              <span>Arte Bíblico 4:5</span>
              <span className="text-[10px] bg-[#d4af37]/15 text-[#d4af37] px-2 py-0.5 rounded border border-[#d4af37]/30 font-sans uppercase font-semibold">
                {isManualUpload ? 'Imagen Personalizada' : 'Estilo Óleo Clásico'}
              </span>
            </h2>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Main Manual Image Upload Button */}
          <input
            type="file"
            ref={mainImageInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleProcessUploadedImage(file);
            }}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            id="main-day-image-upload"
          />

          <button
            onClick={() => mainImageInputRef.current?.click()}
            className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-[#2c1a11] to-[#3a2216] hover:from-[#3e2417] hover:to-[#4f2e1e] text-[#fcefdc] border border-[#d4af37]/50 hover:border-[#d4af37] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            title="Subir una imagen o pintura manualmente para este día"
          >
            <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden xs:inline sm:inline">Subir Imagen</span>
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl border text-xs transition-colors flex items-center gap-1.5 ${
              showSettings
                ? 'bg-[#8d5b36] text-white border-[#b0784a]'
                : 'bg-[#271810] text-[#eedbc6] hover:bg-[#382216] border-[#4a2e1d]'
            }`}
            title="Ajustes de Marca y Logo Emaús"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logo Emaús</span>
          </button>

          <button
            onClick={() => setShowFullscreen(true)}
            className="p-2 rounded-xl bg-[#271810] text-[#eedbc6] hover:bg-[#382216] border border-[#4a2e1d] text-xs transition-colors"
            title="Ver pantalla completa"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Watermark / Logo Customization Drawer */}
      {showSettings && (
        <div className="bg-[#241710] border-b border-[#492d1c] p-4 space-y-3.5 animate-fadeIn text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Personalización del Logo Emaús
            </span>
            <span className="text-[11px] text-[#a98f79]">Esquina Inferior Derecha</span>
          </div>

          {/* Logo Source & File Uploader */}
          <div className="bg-[#1a0f0a] p-3 rounded-xl border border-[#3e2719] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#271810] border border-[#5a3821] p-1 flex items-center justify-center shrink-0">
                <img 
                  src={watermarkSettings.customLogoUrl || '/logo-emaus.png'} 
                  alt="Logo Emaús" 
                  className="w-full h-full object-contain filter drop-shadow" 
                />
              </div>
              <div>
                <p className="text-[#f0e4d4] font-semibold text-xs flex items-center gap-1.5">
                  <span>Logotipo Oficial Emaús</span>
                  {watermarkSettings.customLogoUrl && (
                    <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 px-1.5 py-0.2 rounded font-sans">
                      Archivo personalizado cargado
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-[#a98f79]">
                  Cruz de madera tallada con rosa roja y la inscripción «EMAÚS» en fondo transparente.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleCustomLogoFile}
                accept="image/png,image/jpeg,image/svg+xml,image/webp" 
                className="hidden" 
                id="logo-upload-input"
              />
              <label
                htmlFor="logo-upload-input"
                className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#3d2417] hover:bg-[#523120] text-[#f5ebd9] border border-[#6b422a] text-[11px] font-medium flex items-center gap-1.5 transition-colors shrink-0"
              >
                <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Cargar LOGO EMAUS.png</span>
              </label>

              {watermarkSettings.customLogoUrl && (
                <button
                  onClick={resetToDefaultLogo}
                  className="p-1.5 rounded-lg bg-[#2a170f] hover:bg-[#381e13] text-[#cfbaaa] border border-[#482819] text-[11px] transition-colors"
                  title="Restablecer logo predeterminado"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Toggle Logo */}
            <label className="flex items-center gap-2 cursor-pointer bg-[#1a0f0a] p-2.5 rounded-xl border border-[#3e2719]">
              <input
                type="checkbox"
                checked={watermarkSettings.showLogo}
                onChange={(e) => setWatermarkSettings({ ...watermarkSettings, showLogo: e.target.checked })}
                className="rounded accent-[#c93b3e]"
              />
              <span className="text-[#f0e4d4] font-medium">Insertar Logo EMAÚS</span>
            </label>

            {/* Size Slider */}
            <div className="bg-[#1a0f0a] p-2.5 rounded-xl border border-[#3e2719] space-y-1">
              <div className="flex justify-between text-[11px] text-[#d4beaa]">
                <span>Tamaño del Logo</span>
                <span className="font-bold text-[#d4af37]">{watermarkSettings.sizePercent}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={30}
                value={watermarkSettings.sizePercent}
                onChange={(e) => setWatermarkSettings({ ...watermarkSettings, sizePercent: Number(e.target.value) })}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
            </div>

            {/* Opacity Slider */}
            <div className="bg-[#1a0f0a] p-2.5 rounded-xl border border-[#3e2719] space-y-1">
              <div className="flex justify-between text-[11px] text-[#d4beaa]">
                <span>Opacidad</span>
                <span className="font-bold text-[#d4af37]">{Math.round(watermarkSettings.opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.3}
                max={1.0}
                step={0.05}
                value={watermarkSettings.opacity}
                onChange={(e) => setWatermarkSettings({ ...watermarkSettings, opacity: Number(e.target.value) })}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
            </div>
          </div>

          {/* Position and Verse Banner Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Position */}
            <div className="flex items-center gap-2 bg-[#1a0f0a] p-2 rounded-xl border border-[#3e2719]">
              <span className="text-[#a98f79] text-[11px] shrink-0">Posición:</span>
              <select
                value={watermarkSettings.position}
                onChange={(e) => setWatermarkSettings({ ...watermarkSettings, position: e.target.value as any })}
                className="bg-transparent text-[#f0e4d4] font-medium text-xs focus:outline-none w-full"
              >
                <option value="bottom-right" className="bg-[#1b120c]">Inferior Derecha (Recomendado)</option>
                <option value="bottom-left" className="bg-[#1b120c]">Inferior Izquierda</option>
                <option value="top-right" className="bg-[#1b120c]">Superior Derecha</option>
                <option value="top-left" className="bg-[#1b120c]">Superior Izquierda</option>
              </select>
            </div>

            {/* Include Verse Banner */}
            <label className="flex items-center gap-2 cursor-pointer bg-[#1a0f0a] p-2 rounded-xl border border-[#3e2719]">
              <input
                type="checkbox"
                checked={watermarkSettings.includeVerseBanner}
                onChange={(e) => setWatermarkSettings({ ...watermarkSettings, includeVerseBanner: e.target.checked })}
                className="rounded accent-[#c93b3e]"
              />
              <span className="text-[#f0e4d4] font-medium">Franja con Cita Bíblica (Tarjeta Devocional)</span>
            </label>
          </div>

          {/* Custom parish text */}
          <div className="pt-1">
            <input
              type="text"
              placeholder="Texto o Parroquia opcional (ej: Emaús Hombres - Parroquia San Juan)"
              value={watermarkSettings.customParishText || ''}
              onChange={(e) => setWatermarkSettings({ ...watermarkSettings, customParishText: e.target.value })}
              className="w-full bg-[#1a0f0a] text-[#f0e4d4] border border-[#3e2719] rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>
      )}

      {/* Main Artwork Stage (4:5 Ratio Container) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="bg-amber-950/60 border border-amber-600/40 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-200 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {/* Manual Image Status Bar if user uploaded a custom image */}
        {isManualUpload && (
          <div className="bg-[#241710] border border-[#d4af37]/40 px-3.5 py-2 rounded-xl flex items-center justify-between gap-2 text-xs animate-fadeIn shadow-md">
            <div className="flex items-center gap-2 text-[#f6ecd9]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-medium text-[11.5px]">
                Has subido una imagen manual para el {liturgy.formattedDate}
              </span>
            </div>
            <button
              onClick={handleResetToDefaultArtwork}
              className="text-[11px] text-[#ffb076] hover:text-[#ffd2b3] hover:underline flex items-center gap-1 shrink-0 font-medium transition-colors"
              title="Volver a la pintura sacra oficial de este día"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer</span>
            </button>
          </div>
        )}

        {/* 4:5 Art Canvas Display with Drag & Drop */}
        <div 
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleProcessUploadedImage(file);
          }}
          className={`relative mx-auto w-full max-w-[420px] aspect-[4/5] bg-[#0d0805] rounded-2xl overflow-hidden border-2 shadow-2xl group flex items-center justify-center transition-all ${
            isDragging 
              ? 'border-[#d4af37] ring-4 ring-[#d4af37]/30 scale-[1.02]' 
              : isManualUpload 
                ? 'border-[#8d5b36]' 
                : 'border-[#543622]'
          }`}
        >
          
          {/* Drag & Drop Visual Overlay */}
          {isDragging && (
            <div className="absolute inset-0 bg-[#160f0a]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-center space-y-3 border-2 border-dashed border-[#d4af37] animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center">
                <Upload className="w-8 h-8 text-[#d4af37] animate-bounce" />
              </div>
              <div>
                <p className="font-cinzel text-base font-bold text-[#f7eedf]">
                  Suelta tu imagen aquí
                </p>
                <p className="text-xs text-[#dfcaa7] mt-1 font-serif italic">
                  Se adaptará al formato 4:5 con el sello de Emaús para el {liturgy.formattedDate}
                </p>
              </div>
            </div>
          )}

          {/* Loading overlay during AI Generation */}
          {isGenerating && (
            <div className="absolute inset-0 bg-[#0d0805]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-[#c93b3e]/30 border-t-[#c93b3e] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-[#ff8c42] animate-pulse" />
                </div>
              </div>
              <div>
                <p className="font-cinzel text-base font-bold text-[#f7eedf]">
                  Generando Arte Sacro 4:5
                </p>
                <p className="text-xs text-[#d4af37] font-serif italic mt-1 animate-pulse">
                  {generationStep || 'Pintando al óleo con luz celestial...'}
                </p>
              </div>
              <p className="text-[11px] text-[#9a806c] max-w-xs font-serif italic">
                «Los discípulos lo reconocieron al partir el pan» — Lc 24, 35
              </p>
            </div>
          )}

          {/* Composited Image with Logo */}
          {compositedUrl ? (
            <img
              src={compositedUrl}
              alt="Obra de Arte Bíblico 4:5 con Logo Emaús"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#7d6552] p-6 text-center space-y-2">
              <ImageIcon className="w-10 h-10 stroke-[1.5]" />
              <p className="text-xs font-serif italic">Cargando lienzo de arte bíblico 4:5...</p>
            </div>
          )}

          {/* Quick Floating Action Button on Canvas: Change/Upload Image */}
          <div className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity z-20">
            <button
              onClick={() => mainImageInputRef.current?.click()}
              className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-[#f5ebd9] text-[11px] font-medium flex items-center gap-1.5 shadow-lg transition-all"
              title="Cambiar imagen subiendo un archivo"
            >
              <Upload className="w-3 h-3 text-[#d4af37]" />
              <span>{isManualUpload ? 'Cambiar Foto' : 'Subir Imagen'}</span>
            </button>
          </div>

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 pointer-events-none">
            <div className="text-white space-y-1 pointer-events-auto">
              <p className="text-xs font-bold font-cinzel text-[#d4af37]">
                {isManualUpload ? `Imagen subida para el ${liturgy.formattedDate}` : (activeSceneTitle || liturgy.gospel.summary)}
              </p>
              <p className="text-[11px] text-[#e8d5c4] font-serif italic line-clamp-1">
                {liturgy.gospel.citation} • {liturgy.gospel.book}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Download 4:5 with Logo */}
            <button
              onClick={() => handleDownloadImage(false)}
              className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#8d5b36] to-[#603b20] hover:from-[#a0683e] hover:to-[#744726] text-white font-medium text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
              title="Descargar imagen en alta resolución con logo EMAÚS"
            >
              <Download className="w-3.5 h-3.5 text-[#f8ede0]" />
              <span>Descargar 4:5</span>
            </button>

            {/* Download Devotional Card */}
            <button
              onClick={() => handleDownloadImage(true)}
              className="px-3 py-2.5 rounded-xl bg-[#2b1b12] hover:bg-[#3d2719] text-[#eedbc6] border border-[#543622] font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
              title="Descargar con franja dorada y versículo del Evangelio"
            >
              <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Con Versículo</span>
              <span className="sm:hidden">Tarjeta</span>
            </button>

            {/* Copy image */}
            <button
              onClick={handleCopyImage}
              className="px-3 py-2.5 rounded-xl bg-[#2b1b12] hover:bg-[#3d2719] text-[#eedbc6] border border-[#543622] font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
              title="Copiar imagen al portapapeles"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>

            {/* Fullscreen Preview */}
            <button
              onClick={() => setShowFullscreen(true)}
              className="px-3 py-2.5 rounded-xl bg-[#2b1b12] hover:bg-[#3d2719] text-[#eedbc6] border border-[#543622] font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
              title="Ver en pantalla completa para oración o meditación"
            >
              <Eye className="w-3.5 h-3.5 text-[#ff8c42]" />
              <span>Ver Grande</span>
            </button>
          </div>

          {/* Manual Upload Section Card */}
          <div className="bg-[#180f0a] p-3 rounded-xl border border-[#3b2417] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-[#cfbcaa]">
              <div className="w-7 h-7 rounded-lg bg-[#271810] border border-[#4d301e] flex items-center justify-center shrink-0">
                <ImagePlus className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div>
                <p className="font-semibold text-[#faefe0] text-[11.5px]">
                  ¿Prefieres usar tu propia imagen o pintura?
                </p>
                <p className="text-[10.5px] text-[#9b806b]">
                  Sube cualquier imagen JPG, PNG o WEBP (o arrástrala al lienzo).
                </p>
              </div>
            </div>

            <button
              onClick={() => mainImageInputRef.current?.click()}
              className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-[#2a170f] hover:bg-[#3d2216] text-[#faefe0] border border-[#d4af37]/40 hover:border-[#d4af37] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-sm"
            >
              <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{isManualUpload ? 'Subir otra imagen' : 'Subir imagen manual'}</span>
            </button>
          </div>

          {/* AI Generation Prompt Input & Button */}
          <div className="bg-[#150d08] p-3.5 rounded-2xl border border-[#3b2417] space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Prompt de Generación de Arte Sacro
              </label>
              <span className="text-[10px] text-[#9b806b]">Estilo 20260702 / Óleo Barroco</span>
            </div>

            <textarea
              rows={2}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Describe los detalles de la escena bíblica al óleo..."
              className="w-full bg-[#20130b] text-[#f4efe6] text-xs font-serif rounded-xl p-2.5 border border-[#442b1b] focus:outline-none focus:border-[#d4af37] resize-none leading-relaxed"
            />

            <button
              onClick={handleGenerateArtwork}
              disabled={isGenerating}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg ${
                isGenerating
                  ? 'bg-[#4a2e1d] text-[#a98f79] cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#a8282b] to-[#d63f42] hover:from-[#ba2e31] hover:to-[#e44d50] text-white shadow-red-950/50'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Pintando con IA en formato 4:5...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generar Nueva Obra 4:5 con Logo Emaús</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Upload Confirmation Toast */}
      {uploadToast && (
        <div className="fixed bottom-6 left-4 sm:left-8 z-50 max-w-sm w-full animate-fadeIn">
          <div className="bg-[#1b120c]/95 backdrop-blur-md border-2 border-emerald-500/50 rounded-2xl p-3.5 shadow-2xl text-xs text-[#faefe0] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="font-medium text-xs text-[#e8ded3]">{uploadToast}</p>
            </div>
            <button
              onClick={() => setUploadToast(null)}
              className="text-[#a98f79] hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setShowFullscreen(false)}
        >
          <div 
            className="relative max-w-2xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-xs bg-white/10 px-3 py-1.5 rounded-full border border-white/20"
            >
              Cerrar (Esc)
            </button>

            {/* 4:5 Canvas Card */}
            <div className="w-full max-w-[480px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl bg-black">
              <img
                src={compositedUrl}
                alt="Arte Bíblico 4:5 Pantalla Completa"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Citation & Download in Fullscreen */}
            <div className="mt-4 text-center space-y-2">
              <p className="font-cinzel text-lg text-[#faefe0] font-bold">
                {liturgy.gospel.citation} • {liturgy.gospel.book}
              </p>
              <p className="font-serif italic text-sm text-[#dfcaa7] max-w-lg">
                «{liturgy.gospel.keyVerse}»
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => handleDownloadImage(false)}
                  className="px-4 py-2 rounded-xl bg-[#c93b3e] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar 4:5</span>
                </button>
                <button
                  onClick={() => handleDownloadImage(true)}
                  className="px-4 py-2 rounded-xl bg-[#2b1b12] text-[#eedbc6] border border-[#543622] text-xs font-semibold flex items-center gap-1.5"
                >
                  <Layers className="w-4 h-4 text-[#d4af37]" />
                  <span>Descargar Devocional</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
