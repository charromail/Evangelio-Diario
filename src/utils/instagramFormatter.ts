/**
 * Utilities to format texts for Instagram with Unicode styling (Bold, Double-Struck, etc.)
 */

/**
 * Converts alphanumeric characters to Unicode Mathematical Sans-Serif Bold
 * for native rendering on Instagram, WhatsApp, and social media captions.
 */
export function toUnicodeBold(text: string): string {
  const accentMap: Record<string, string> = {
    'á': '𝗮́',
    'é': '𝗲́',
    'í': '𝗶́',
    'ó': '𝗼́',
    'ú': '𝘂́',
    'Á': '𝗔́',
    'É': '𝗘́',
    'Í': '𝗜́',
    'Ó': '𝗢́',
    'Ú': '𝗨́',
    'ñ': '𝗻̃',
    'Ñ': '𝗡̃',
    'ü': '𝘂̈',
    'Ü': '𝗨̈'
  };

  return text.split('').map(char => {
    if (accentMap[char]) return accentMap[char];
    const code = char.charCodeAt(0);
    // Uppercase A-Z -> 𝗔-𝗭
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(0x1D5D4 + (code - 65));
    }
    // Lowercase a-z -> 𝗮-𝘇
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(0x1D5EE + (code - 97));
    }
    // Numbers 0-9 -> 𝟬-𝟵
    if (code >= 48 && code <= 57) {
      return String.fromCodePoint(0x1D7EC + (code - 48));
    }
    return char;
  }).join('');
}

/**
 * Converts alphanumeric characters to Unicode Mathematical Double-Struck (Blackboard Bold)
 * Special Unicode points reserved in Latin block (C, H, N, P, Q, R, Z) are handled accurately.
 */
export function toDoubleStruck(text: string): string {
  const doubleStruckExceptions: Record<string, string> = {
    'C': 'ℂ', // U+2102
    'H': 'ℍ', // U+210D
    'N': 'ℕ', // U+2115
    'P': 'ℙ', // U+2119
    'Q': 'ℚ', // U+211A
    'R': 'ℝ', // U+211D
    'Z': 'ℤ', // U+2124
  };

  return text.split('').map(char => {
    if (doubleStruckExceptions[char]) {
      return doubleStruckExceptions[char];
    }
    const code = char.charCodeAt(0);
    // Uppercase A-Z -> 𝔸-ℤ
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(0x1D538 + (code - 65));
    }
    // Lowercase a-z -> 𝕒-𝕫
    if (code >= 97 && code <= 122) {
      return String.fromCodePoint(0x1D552 + (code - 97));
    }
    // Numbers 0-9 -> 𝟘-𝟡
    if (code >= 48 && code <= 57) {
      return String.fromCodePoint(0x1D7D8 + (code - 48));
    }
    return char;
  }).join('');
}

export const CATHOLIC_INSTAGRAM_HASHTAGS = [
  '#EvangelioDelDía',
  '#EvangelioDeHoy',
  '#PalabraDeDios',
  '#Emaús',
  '#CaminoDeEmaús',
  '#Católicos',
  '#FeCatólica',
  '#Liturgia',
  '#Evangelio',
  '#Jesús',
  '#Dios',
  '#SantaMisa',
  '#IglesiaCatólica',
  '#Oración'
];

/**
 * Formats the Gospel text for Instagram according to specific liturgical requirements:
 * 1. Encabezado del evangelio: normal
 * 2. Título del Evangelio: negrita
 * 3. Cita bíblica: formato "Double Struck"
 * 4. Contenido de la cita bíblica: texto normal
 * 5. Cierre: "Palabra del Señor" en negrita
 * 6. Bloque de hashtags católicos para optimizar alcance en Instagram
 */
export function formatGospelForInstagram(
  header: string,
  bookTitle: string,
  citation: string,
  bodyText: string,
  extraHashtags?: string[]
): string {
  const normalHeader = header.trim();
  const boldTitle = toUnicodeBold(bookTitle.trim());
  const doubleStruckCitation = toDoubleStruck(citation.trim());
  const normalBody = bodyText.trim();
  const boldClosing = toUnicodeBold('Palabra del Señor');

  const allHashtags = extraHashtags && extraHashtags.length > 0
    ? [...new Set([...CATHOLIC_INSTAGRAM_HASHTAGS, ...extraHashtags])]
    : CATHOLIC_INSTAGRAM_HASHTAGS;

  const hashtagsText = allHashtags.join(' ');

  return `${normalHeader}\n\n${boldTitle}\n${doubleStruckCitation}\n\n${normalBody}\n\n${boldClosing}\n\n.\n.\n.\n${hashtagsText}`;
}
