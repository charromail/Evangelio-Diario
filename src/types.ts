export interface LiturgicalReading {
  citation: string;
  title: string;
  text: string;
  response?: string;
}

export interface DailyLiturgy {
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "Miércoles 19 de Agosto de 2026"
  season: 'Tiempo Ordinario' | 'Cuaresma' | 'Pascua' | 'Adviento' | 'Navidad' | 'Semana Santa';
  liturgicalColor: 'verde' | 'blanco' | 'rojo' | 'morado' | 'rosa';
  feastOrSaint?: string;
  cycle: string; // e.g. "Año II / Ciclo C"
  
  firstReading: LiturgicalReading;
  psalm: LiturgicalReading;
  secondReading?: LiturgicalReading;
  gospelAcclamation: string;
  
  gospel: {
    book: string; // e.g. "Evangelio según San Lucas"
    citation: string; // e.g. "Lc 24, 13-35"
    text: string;
    keyVerse: string;
    summary: string;
  };
  
  reflection: {
    title: string;
    content: string;
    emmausHeart: string; // "¿No ardía nuestro corazón?" - aplicación al retiro/vida
    actionForToday: string;
  };
  
  prayer: string;
  
  artPrompt: string;
  suggestedScenes: {
    id: string;
    title: string;
    description: string;
    prompt: string;
  }[];
  sources?: {
    dominicosUrl?: string;
    ceeUrl?: string;
    sourceName?: string;
  };
}

export interface GeneratedArtwork {
  id: string;
  date: string;
  gospelCitation: string;
  prompt: string;
  imageUrl: string; // Base64 or URL
  compositedImageUrl?: string; // Image with Emaús logo embedded
  createdAt: string;
  aspectRatio: '4:5';
  style: string;
}

export interface WatermarkSettings {
  showLogo: boolean;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  sizePercent: number; // 10 to 30%
  opacity: number; // 0.2 to 1.0
  includeVerseBanner: boolean;
  bannerStyle: 'minimal' | 'card' | 'gold-border';
  customParishText?: string;
  customLogoUrl?: string; // Optional user-provided exact logo PNG
}
