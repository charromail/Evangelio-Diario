/**
 * Pre-curated sacred master oil paintings in 4:5 aspect ratio corresponding to reference styles
 */
export const PRESET_ARTWORKS: Record<string, {
  url: string;
  title: string;
  artistStyle: string;
  citation: string;
}> = {
  '2026-07-02': {
    // High-res classical biblical oil painting matching the Cafarnaún healing from reference 20260702.png
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&h=1350&q=85',
    title: 'Jesús sana al paralítico en Cafarnaún',
    artistStyle: 'Óleo barroco / claroscuro celestial',
    citation: 'Mt 9, 1-8'
  },
  '2026-08-19': {
    // Parable of the vineyard laborers at twilight
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1080&h=1350&q=85',
    title: 'Los trabajadores de la Viña al atardecer',
    artistStyle: 'Óleo clásico claroscuro',
    citation: 'Mt 20, 1-16'
  },
  'special-emmaus': {
    // Supper at Emmaus - blessing and breaking the bread
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&h=1350&q=85',
    title: 'La Fracción del Pan en Emaús',
    artistStyle: 'Escuela de Rembrandt y Caravaggio',
    citation: 'Lc 24, 13-35'
  }
};
