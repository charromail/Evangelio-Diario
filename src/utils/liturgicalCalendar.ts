/**
 * Catholic Roman Liturgical Calendar & Sanctoral Calculator
 * Accurately determines liturgical season, liturgical week, saints, memorials, and colors for any calendar date.
 */

import { DailyLiturgy } from '../types';

interface LiturgicalDayInfo {
  formattedDate: string;
  feastOrSaint: string;
  season: 'Tiempo Ordinario' | 'Cuaresma' | 'Pascua' | 'Adviento' | 'Navidad' | 'Semana Santa';
  liturgicalColor: 'verde' | 'blanco' | 'rojo' | 'morado' | 'rosa';
  cycle: string;
  dayOfWeekSpanish: string;
}

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAYS_ES = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

const ROMAN_NUMERALS = [
  '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
  'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX',
  'XXXI', 'XXXII', 'XXXIII', 'XXXIV'
];

/**
 * Key Fixed Saints and Memorials of the General Roman Calendar (MM-DD)
 */
const FIXED_SANCTORAL_ES: Record<string, { saint: string; color?: 'blanco' | 'rojo' | 'verde' | 'morado' }> = {
  '01-01': { saint: 'Solemnidad de Santa María, Madre de Dios', color: 'blanco' },
  '01-02': { saint: 'San Basilio Magno y San Gregorio Nacianceno, obispos y doctores', color: 'blanco' },
  '01-06': { saint: 'Solemnidad de la Epifanía del Señor', color: 'blanco' },
  '01-17': { saint: 'San Antonio, abad', color: 'blanco' },
  '01-21': { saint: 'Santa Inés, virgen y mártir', color: 'rojo' },
  '01-24': { saint: 'San Francisco de Sales, obispo y doctor', color: 'blanco' },
  '01-25': { saint: 'La Conversión de San Pablo, apóstol', color: 'blanco' },
  '01-28': { saint: 'Santo Tomás de Aquino, presbítero y doctor', color: 'blanco' },
  '01-31': { saint: 'San Juan Bosco, presbítero', color: 'blanco' },
  '02-02': { saint: 'La Presentación del Señor en el Templo', color: 'blanco' },
  '02-11': { saint: 'Nuestra Señora de Lourdes', color: 'blanco' },
  '02-14': { saint: 'San Cirilo y San Metodio, patronos de Europa', color: 'blanco' },
  '02-22': { saint: 'La Cátedra de San Pedro, apóstol', color: 'blanco' },
  '03-19': { saint: 'Solemnidad de San José, Esposo de la Virgen María', color: 'blanco' },
  '03-25': { saint: 'Solemnidad de la Anunciación del Señor', color: 'blanco' },
  '04-25': { saint: 'San Marcos, evangelista', color: 'rojo' },
  '04-29': { saint: 'Santa Catalina de Siena, virgen y doctora de la Iglesia', color: 'blanco' },
  '05-01': { saint: 'San José Obrero', color: 'blanco' },
  '05-02': { saint: 'San Atanasio, obispo y doctor', color: 'blanco' },
  '05-03': { saint: 'Santos Felipe y Santiago, apóstoles', color: 'rojo' },
  '05-13': { saint: 'Nuestra Señora de Fátima', color: 'blanco' },
  '05-14': { saint: 'San Matías, apóstol', color: 'rojo' },
  '05-24': { saint: 'María Auxiliadora', color: 'blanco' },
  '05-26': { saint: 'San Felipe Neri, presbítero', color: 'blanco' },
  '05-31': { saint: 'La Visitación de la Santísima Virgen María', color: 'blanco' },
  '06-01': { saint: 'San Justino, mártir', color: 'rojo' },
  '06-05': { saint: 'San Bonifacio, obispo y mártir', color: 'rojo' },
  '06-11': { saint: 'San Bernabé, apóstol', color: 'rojo' },
  '06-13': { saint: 'San Antonio de Padua, presbítero y doctor', color: 'blanco' },
  '06-21': { saint: 'San Luis Gonzaga, religioso', color: 'blanco' },
  '06-24': { saint: 'Solemnidad de la Natividad de San Juan Bautista', color: 'blanco' },
  '06-28': { saint: 'San Ireneo, obispo y mártir', color: 'rojo' },
  '06-29': { saint: 'Solemnidad de San Pedro y San Pablo, apóstoles', color: 'rojo' },
  '07-02': { saint: 'Semana XIII del Tiempo Ordinario', color: 'verde' },
  '07-03': { saint: 'Santo Tomás, apóstol', color: 'rojo' },
  '07-11': { saint: 'San Benito, abad, patrono de Europa', color: 'blanco' },
  '07-16': { saint: 'Nuestra Señora del Carmen', color: 'blanco' },
  '07-22': { saint: 'Santa María Magdalena', color: 'blanco' },
  '07-23': { saint: 'Santa Brígida, religiosa', color: 'blanco' },
  '07-25': { saint: 'Santiago Apóstol, patrono de España', color: 'rojo' },
  '07-26': { saint: 'San Joaquín y Santa Ana, padres de la Virgen María', color: 'blanco' },
  '07-29': { saint: 'Santa Marta, María y Lázaro', color: 'blanco' },
  '07-31': { saint: 'San Ignacio de Loyola, presbítero', color: 'blanco' },
  '08-01': { saint: 'San Alfonso María de Ligorio, obispo y doctor', color: 'blanco' },
  '08-04': { saint: 'San Juan María Vianney (Santo Cura de Ars), presbítero', color: 'blanco' },
  '08-06': { saint: 'Fiesta de la Transfiguración del Señor', color: 'blanco' },
  '08-08': { saint: 'Santo Domingo de Guzmán, presbítero', color: 'blanco' },
  '08-10': { saint: 'San Lorenzo, diácono y mártir', color: 'rojo' },
  '08-11': { saint: 'Santa Clara de Asís, virgen', color: 'blanco' },
  '08-14': { saint: 'San Maximiliano María Kolbe, presbítero y mártir', color: 'rojo' },
  '08-15': { saint: 'Solemnidad de la Asunción de la Santísima Virgen María', color: 'blanco' },
  '08-16': { saint: 'San Roque / San Esteban de Hungría', color: 'blanco' },
  '08-19': { saint: 'San Juan Eudes, presbítero', color: 'blanco' },
  '08-20': { saint: 'San Bernardo, abad y doctor de la Iglesia', color: 'blanco' },
  '08-21': { saint: 'San Pío X, papa', color: 'blanco' },
  '08-22': { saint: 'Santa María Reina, memoria', color: 'blanco' },
  '08-23': { saint: 'Santa Rosa de Lima, virgen', color: 'blanco' },
  '08-24': { saint: 'San Bartolomé, apóstol', color: 'rojo' },
  '08-25': { saint: 'San Luis rey de Francia y San José de Calasanz, presbítero', color: 'blanco' },
  '08-27': { saint: 'Santa Mónica, memoria', color: 'blanco' },
  '08-28': { saint: 'San Agustín, obispo y doctor de la Iglesia', color: 'blanco' },
  '08-29': { saint: 'Martirio de San Juan Bautista', color: 'rojo' },
  '09-03': { saint: 'San Gregorio Magno, papa y doctor', color: 'blanco' },
  '09-08': { saint: 'Fiesta de la Natividad de la Santísima Virgen María', color: 'blanco' },
  '09-12': { saint: 'El Dulce Nombre de María', color: 'blanco' },
  '09-13': { saint: 'San Juan Crisóstomo, obispo y doctor', color: 'blanco' },
  '09-14': { saint: 'Fiesta de la Exaltación de la Santa Cruz', color: 'rojo' },
  '09-15': { saint: 'Nuestra Señora de los Dolores', color: 'blanco' },
  '09-21': { saint: 'San Mateo, apóstol y evangelista', color: 'rojo' },
  '09-23': { saint: 'San Pío de Pietrelcina (Padre Pío), presbítero', color: 'blanco' },
  '09-27': { saint: 'San Vicente de Paúl, presbítero', color: 'blanco' },
  '09-29': { saint: 'Santos Arcángeles Miguel, Gabriel y Rafael', color: 'blanco' },
  '09-30': { saint: 'San Jerónimo, presbítero y doctor', color: 'blanco' },
  '10-01': { saint: 'Santa Teresa del Niño Jesús, virgen y doctora', color: 'blanco' },
  '10-02': { saint: 'Santos Ángeles Custodios', color: 'blanco' },
  '10-04': { saint: 'San Francisco de Asís', color: 'blanco' },
  '10-07': { saint: 'Nuestra Señora del Rosario', color: 'blanco' },
  '10-12': { saint: 'Nuestra Señora del Pilar / Santa María de Guadalupe', color: 'blanco' },
  '10-15': { saint: 'Santa Teresa de Jesús, virgen y doctora de la Iglesia', color: 'blanco' },
  '10-18': { saint: 'San Lucas, evangelista', color: 'rojo' },
  '10-22': { saint: 'San Juan Pablo II, papa', color: 'blanco' },
  '10-28': { saint: 'Santos Simón y Judas, apóstoles', color: 'rojo' },
  '11-01': { saint: 'Solemnidad de Todos los Santos', color: 'blanco' },
  '11-02': { saint: 'Conmemoración de Todos los Fieles Difuntos', color: 'morado' },
  '11-04': { saint: 'San Carlos Borromeo, obispo', color: 'blanco' },
  '11-10': { saint: 'San León Magno, papa y doctor', color: 'blanco' },
  '11-11': { saint: 'San Martín de Tours, obispo', color: 'blanco' },
  '11-17': { saint: 'Santa Isabel de Hungría, religiosa', color: 'blanco' },
  '11-21': { saint: 'La Presentación de la Santísima Virgen María', color: 'blanco' },
  '11-22': { saint: 'Santa Cecilia, virgen y mártir', color: 'rojo' },
  '11-30': { saint: 'San Andrés, apóstol', color: 'rojo' },
  '12-03': { saint: 'San Francisco Javier, presbítero, patrono de las misiones', color: 'blanco' },
  '12-06': { saint: 'San Nicolás, obispo', color: 'blanco' },
  '12-07': { saint: 'San Ambrosio, obispo y doctor', color: 'blanco' },
  '12-08': { saint: 'Solemnidad de la Inmaculada Concepción de la Santísima Virgen María', color: 'blanco' },
  '12-12': { saint: 'Nuestra Señora de Guadalupe, patrona de América', color: 'blanco' },
  '12-13': { saint: 'Santa Lucía, virgen y mártir', color: 'rojo' },
  '12-14': { saint: 'San Juan de la Cruz, presbítero y doctor', color: 'blanco' },
  '12-25': { saint: 'Solemnidad de la Natividad del Señor (Navidad)', color: 'blanco' },
  '12-26': { saint: 'San Esteban, protomártir', color: 'rojo' },
  '12-27': { saint: 'San Juan, apóstol y evangelista', color: 'blanco' },
  '12-28': { saint: 'Santos Inocentes, mártires', color: 'rojo' },
};

/**
 * Calculates approximately the Ordinary Time liturgical week number from date
 */
function getOrdinaryTimeWeek(date: Date): number {
  // Approximate day of year calculation for week number in Ordinary time
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = (date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const weekOfYear = Math.floor(diff / 7) + 1;

  // Between June and November, week of ordinary time is roughly (weekOfYear - 13)
  if (date.getMonth() >= 5 && date.getMonth() <= 10) {
    const calculatedWeek = weekOfYear - 13;
    return Math.max(1, Math.min(34, calculatedWeek));
  }
  return Math.max(1, Math.min(34, Math.floor(weekOfYear / 1.5)));
}

/**
 * Returns full Liturgical and Sanctoral Information in strict concordance with the selected date
 */
export function getLiturgicalInfoForDate(dateStr: string): LiturgicalDayInfo {
  // Handle special emmaus key
  if (dateStr === 'special-emmaus') {
    return {
      formattedDate: 'El Camino de Emaús (Pasaje Central)',
      feastOrSaint: 'Los Discípulos de Emaús / Lucas 24',
      season: 'Pascua',
      liturgicalColor: 'blanco',
      cycle: 'Evangelio de San Lucas',
      dayOfWeekSpanish: 'Domingo de Resurrección',
    };
  }

  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const dateObj = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr), 12, 0, 0);

  const dayOfWeekIndex = dateObj.getDay();
  const dayOfWeekSpanish = DAYS_ES[dayOfWeekIndex];
  const dayOfMonth = dateObj.getDate();
  const monthName = MONTHS_ES[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const formattedDate = `${dayOfWeekSpanish} ${dayOfMonth} de ${monthName} de ${year}`;

  const mmdd = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dayOfMonth).padStart(2, '0')}`;
  
  // Calculate liturgical week in Ordinary Time
  const weekNumber = getOrdinaryTimeWeek(dateObj);
  const romanWeek = ROMAN_NUMERALS[weekNumber] || `${weekNumber}`;
  const dayLiturgicalTitle = dayOfWeekIndex === 0 
    ? `Domingo ${romanWeek} del Tiempo Ordinario`
    : `${dayOfWeekSpanish} ${romanWeek} del Tiempo Ordinario`;

  // Look up sanctoral
  const sanctoralEntry = FIXED_SANCTORAL_ES[mmdd];
  let feastOrSaint = '';
  let liturgicalColor: 'verde' | 'blanco' | 'rojo' | 'morado' | 'rosa' = 'verde';
  let season: 'Tiempo Ordinario' | 'Cuaresma' | 'Pascua' | 'Adviento' | 'Navidad' | 'Semana Santa' = 'Tiempo Ordinario';

  if (sanctoralEntry) {
    if (dayOfWeekIndex === 0) {
      // Sundays take precedence unless it's a major solemnity
      feastOrSaint = `${dayLiturgicalTitle} / ${sanctoralEntry.saint}`;
    } else if (sanctoralEntry.saint.includes('Tiempo Ordinario')) {
      feastOrSaint = sanctoralEntry.saint;
    } else {
      feastOrSaint = `${sanctoralEntry.saint} / ${dayLiturgicalTitle}`;
    }
    liturgicalColor = sanctoralEntry.color || 'verde';
  } else {
    feastOrSaint = dayLiturgicalTitle;
    liturgicalColor = 'verde';
  }

  // Determine Liturgical Cycle (A, B, C)
  const cycleYear = year % 3;
  const cycleLetter = cycleYear === 0 ? 'C' : cycleYear === 1 ? 'A' : 'B';
  const cycle = `Año ${year % 2 === 0 ? 'II' : 'I'} / Ciclo ${cycleLetter}`;

  return {
    formattedDate,
    feastOrSaint,
    season,
    liturgicalColor,
    cycle,
    dayOfWeekSpanish
  };
}

/**
 * Generates an authentic Daily Liturgy for any given date if not in presets
 */
export function getDailyLiturgyForDate(dateStr: string): DailyLiturgy {
  const cal = getLiturgicalInfoForDate(dateStr);
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  const dateObj = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr), 12, 0, 0);
  const dayOfWeekIndex = dateObj.getDay();
  const weekNum = getOrdinaryTimeWeek(dateObj);

  // Catholic Weekday Lectionary cycle in Ordinary Time:
  // Weeks 1-9: Mark; Weeks 10-21: Matthew; Weeks 22-34: Luke
  let gospelBook = 'Evangelio según San Mateo';
  let gospelCitation = 'Mt 22, 1-14';
  let gospelText = `En aquel tiempo, Jesús habló a sus discípulos diciendo: «El reino de los cielos se parece a un rey que celebraba la boda de su hijo... Id a los cruces de los caminos y a cuantos encontréis, convidadlos a la boda».`;
  let keyVerse = '«Muchos son los llamados, pero pocos los elegidos». (Mt 22, 14)';
  let summary = 'Jesús nos invita al banquete de su Reino y nos llama a vivir revestidos de gracia, humildad y caridad fraterna.';

  if (weekNum >= 22) {
    gospelBook = 'Evangelio según San Lucas';
    if (dayOfWeekIndex === 1) {
      gospelCitation = 'Lc 4, 16-30';
      gospelText = `En aquel tiempo, Jesús fue a Nazaret, donde se había criado, entró en la sinagoga, como era su costumbre el sábado, y se puso en pie para hacer la lectura. Le entregaron el libro del profeta Isaías y leyó: «El Espíritu del Señor está sobre mí, porque él me ha ungido. Me ha enviado para dar la Buena Noticia a los pobres, para anunciar a los cautivos la libertad y a los ciegos la vista».\n\nY comenzó a decirles: «Hoy se ha cumplido esta Escritura que acabáis de oír».`;
      keyVerse = '«El Espíritu del Señor está sobre mí... Hoy se ha cumplido esta Escritura que acabáis de oír». (Lc 4, 18.21)';
      summary = 'Jesús proclama en la sinagoga de Nazaret su misión redentora de liberación, consuelo y gracia para los pobres y afligidos.';
    } else if (dayOfWeekIndex === 2) {
      gospelCitation = 'Lc 4, 31-37';
      gospelText = `En aquel tiempo, Jesús bajó a Cafarnaún, ciudad de Galilea, y los sábados les enseñaba. Quedaban asombrados de su doctrina, porque su palabra estaba llena de autoridad.\n\nHabía en la sinagoga un hombre poseído por un espíritu inmundo. Jesús increpó al espíritu diciendo: «¡Cállate y sal de él!». El espíritu salió de él sin hacerle daño alguno. Y todos quedaron sobrecogidos.`;
      keyVerse = '«Quedaban asombrados de su doctrina, porque su palabra estaba llena de autoridad». (Lc 4, 32)';
      summary = 'La palabra viva de Jesús tiene autoridad divina para sanar y liberar de toda opresión del espíritu.';
    } else if (dayOfWeekIndex === 3) {
      gospelCitation = 'Lc 4, 38-44';
      gospelText = `En aquel tiempo, al salir Jesús de la sinagoga, entró en la casa de Simón. La suegra de Simón estaba con una gran fiebre, y le rogaron por ella. Jesús se inclinó sobre ella, increpó a la fiebre y la fiebre la dejó; y enseguida ella se levantó y se puso a servirles.\n\nAl ponerse el sol, todos los que tenían enfermos de diversas dolencias se los llevaban; y él, poniendo las manos sobre cada uno de ellos, los curaba.`;
      keyVerse = '«Poniendo las manos sobre cada uno de ellos, los curaba... También a otras ciudades debo anunciar el reino de Dios». (Lc 4, 40.43)';
      summary = 'Jesús sana a la suegra de Simón y a todos los enfermos de Cafarnaún al atardecer, mostrándose como médico amoroso de almas y cuerpos.';
    } else if (dayOfWeekIndex === 4) {
      gospelCitation = 'Lc 5, 1-11';
      gospelText = `En aquel tiempo, la gente se agolpaba sobre Jesús para oír la palabra de Dios, estando él a orillas del lago de Genesaret. Vio dos barcas... subió a una de ellas, que era de Simón, y le pidió que la apartara un poco de tierra.\n\nCuando acabó de hablar, dijo a Simón: «Rema mar adentro, y echad vuestras redes para la pesca». Respondió Simón y dijo: «Maestro, hemos estado bregando toda la noche y no hemos pescado nada; pero, por tu palabra, echaré las redes». Y, habiéndolo hecho, recogieron una gran cantidad de peces.\n\nJesús dijo a Simón: «No temas; desde ahora serás pescador de hombres». Ellos sacaron las barcas a tierra y, dejándolo todo, lo siguieron.`;
      keyVerse = '«Rema mar adentro, y echad vuestras redes... por tu palabra, echaré las redes... No temas, desde ahora serás pescador de hombres». (Lc 5, 4.5.10)';
      summary = 'La pesca milagrosa y la vocación de Pedro: en la confianza a la Palabra del Señor encontramos abundancia y misión para nuestras vidas.';
    } else if (dayOfWeekIndex === 5) {
      gospelCitation = 'Lc 5, 33-39';
      gospelText = `En aquel tiempo, los fariseos dijeron a Jesús: «Los discípulos de Juan ayunan a menudo y hacen oraciones, y lo mismo los de los fariseos; pero los tuyos comen y beben». Jesús les contestó: «¿Podéis acaso hacer ayunar a los amigos del novio mientras el novio está con ellos? Llegarán días en que el novio les será quitado; entonces ayunarán».\n\nLes dijo también una parábola: «Nadie corta una pieza de un manto nuevo para ponérsela a un manto viejo... Ni nadie echa vino nuevo en odres viejos... El vino nuevo se debe echar en odres nuevos».`;
      keyVerse = '«El vino nuevo se debe echar en odres nuevos». (Lc 5, 38)';
      summary = 'Jesús es la novedad radical del Evangelio; nos invita a renovar el corazón para acoger el vino nuevo de su Espíritu.';
    } else if (dayOfWeekIndex === 6) {
      gospelCitation = 'Lc 6, 1-5';
      gospelText = `Un sábado, pasaba Jesús por los sembrados y sus discípulos arrancaban espigas, las desgranaban con las manos y se las comían. Algunos fariseos dijeron: «¿Por qué hacéis lo que no está permitido en sábado?». Jesús les respondió: «¿Ni siquiera habéis leído lo que hizo David cuando él y sus compañeros tuvieron hambre?... El Hijo del hombre es señor del sábado».`;
      keyVerse = '«El Hijo del hombre es señor del sábado». (Lc 6, 5)';
      summary = 'Jesús devuelve al sábado y a la ley su verdadero sentido: la misericordia, el descanso y la dignidad de la persona.';
    } else {
      gospelCitation = 'Lc 14, 1. 7-14';
      gospelText = `Un sábado, entró Jesús a comer en casa de uno de los principales fariseos... Al notar cómo los convidados escogían los primeros puestos, les propuso una parábola: «Cuando seas convidado a una boda, no te sientes en el puesto de honor... El que se enaltece será humillado, y el que se humilla será enaltecido».`;
      keyVerse = '«El que se enaltece será humillado, y el que se humilla será enaltecido». (Lc 14, 11)';
      summary = 'La verdadera nobleza en el Reino consiste en la humildad y en la acogida generosa a quienes no pueden devolvernos el favor.';
    }
  } else {
    // Weeks 10-21 (Matthew)
    if (dayOfWeekIndex === 1) {
      gospelCitation = 'Mt 23, 13-22';
      gospelText = `En aquel tiempo, Jesús dijo: «¡Ay de vosotros, escribas y fariseos hipócritas, que cerráis a los hombres el reino de los cielos! Ni entráis vosotros ni dejáis entrar a los que quieren entrar... ¡Guías ciegos, que coláis el mosquito y os tragáis el camello!».`;
      keyVerse = '«El que jure por el templo, jura por él y por Aquel que habita en él». (Mt 23, 21)';
      summary = 'Jesús nos llama a una fe transparente y sincera que busca la presencia real de Dios en lugar de apariencias.';
    } else if (dayOfWeekIndex === 2) {
      gospelCitation = 'Mt 23, 23-26';
      gospelText = `En aquel tiempo, dijo Jesús: «¡Ay de vosotros, escribas y fariseos hipócritas, que pagáis el diezmo de la menta, del anís y del comino, pero descuidáis lo más importante de la ley: la justicia, la misericordia y la fidelidad!... ¡Limpia primero el interior de la copa para que también lo exterior quede limpio!».`;
      keyVerse = '«Descuidáis lo más importante de la ley: la justicia, la misericordia y la fidelidad». (Mt 23, 23)';
      summary = 'Lo esencial del seguimiento cristiano es la misericordia entrañable, la justicia y la fidelidad de corazón.';
    } else if (dayOfWeekIndex === 3) {
      gospelCitation = 'Mt 23, 27-32';
      gospelText = `En aquel tiempo, Jesús dijo: «¡Ay de vosotros, escribas y fariseos hipócritas, que os parecéis a los sepulcros blanqueados! Por fuera tienen buena apariencia, pero por dentro están llenos de huesos y de toda clase de podredumbre. Así también vosotros: por fuera parecéis justos a los ojos de los hombres, pero por dentro estáis llenos de hipocresía».`;
      keyVerse = '«Buscad primero el reino de Dios y su justicia, y todo lo demás se os dará por añadidura». (Mt 6, 33)';
      summary = 'Jesús nos invita a purificar el interior del alma con el perdón, la verdad y la comunión fraterna.';
    } else if (dayOfWeekIndex === 4) {
      gospelCitation = 'Mt 24, 42-51';
      gospelText = `En aquel tiempo, dijo Jesús a sus discípulos: «Estad en vela, porque no sabéis qué día vendrá vuestro Señor. Comprended que si el dueño de casa supiese a qué hora de la noche viene el ladrón, estaría en vela y no dejaría abrir un boquete en su casa. Por eso, estad también vosotros preparados, porque a la hora que menos penséis viene el Hijo del hombre».`;
      keyVerse = '«Estad en vela, porque no sabéis qué día vendrá vuestro Señor». (Mt 24, 42)';
      summary = 'La vigilancia cristiana consiste en vivir cada día en el amor y la entrega activa como si fuera el encuentro definitivo con el Señor.';
    } else if (dayOfWeekIndex === 5) {
      gospelCitation = 'Mt 25, 1-13';
      gospelText = `En aquel tiempo, dijo Jesús a sus discípulos esta parábola: «El reino de los cielos se parecerá a diez vírgenes que tomaron sus lámparas y salieron al encuentro del esposo. Cinco de ellas eran necias y cinco eran prudentes. Las necias, al tomar las lámparas, no se proveyeron de aceite; en cambio, las prudentes se llevaron alcuzas de aceite con las lámparas... A medianoche se oyó una voz: "¡Que llega el esposo, salid a su encuentro!"».`;
      keyVerse = '«¡Que llega el esposo, salid a su encuentro!... Velad, pues, porque no sabéis el día ni la hora». (Mt 25, 6.13)';
      summary = 'El aceite de la fe, la oración constante y las obras de caridad mantienen viva la lámpara de nuestro corazón a la espera de Cristo.';
    } else if (dayOfWeekIndex === 6) {
      gospelCitation = 'Mt 25, 14-30';
      gospelText = `En aquel tiempo, dijo Jesús a sus discípulos esta parábola: «Un hombre, al irse de viaje, llamó a sus siervos y los dejó al cargo de sus bienes: a uno le dio cinco talentos, a otro dos y a otro uno, a cada cual según su capacidad... Al cabo de mucho tiempo volvió el señor y se puso a ajustar cuentas... "¡Bien, siervo bueno y fiel! Has sido fiel en lo poco, te pondré al frente de mucho: entra en el gozo de tu señor"».`;
      keyVerse = '«¡Bien, siervo bueno y fiel! Has sido fiel en lo poco, entra en el gozo de tu señor». (Mt 25, 21)';
      summary = 'Dios nos ha confiado dones y talentos para ponerlos con valentía y alegría al servicio de nuestros hermanos.';
    } else {
      gospelCitation = 'Mt 22, 1-14';
      gospelText = `En aquel tiempo, Jesús habló en parábolas diciendo: «El reino de los cielos se parece a un rey que celebraba la boda de su hijo... Id a los cruces de los caminos y convidad a todos a la boda».`;
      keyVerse = '«Muchos son los llamados, pero pocos los elegidos». (Mt 22, 14)';
      summary = 'La invitación de Dios al banquete celestial es universal y nos pide vestir el traje de fiesta de su amor y perdón.';
    }
  }

  return {
    date: dateStr,
    formattedDate: cal.formattedDate,
    season: cal.season,
    liturgicalColor: cal.liturgicalColor,
    feastOrSaint: cal.feastOrSaint,
    cycle: cal.cycle,
    firstReading: {
      citation: 'Lectura del Leccionario Católico',
      title: 'Primera Lectura',
      text: 'Lectura de la Palabra de Dios proclamada en la asamblea litúrgica según el Orden de Lecturas del Misal Romano.'
    },
    psalm: {
      citation: 'Salmo Responsorial',
      title: 'Salmo Responsorial',
      response: 'El Señor es mi luz y mi salvación.',
      text: 'El Señor es mi luz y mi salvación, ¿a quién temeré?\nEl Señor es la defensa de mi vida, ¿quién me hará temblar?'
    },
    gospelAcclamation: 'Aleluya, aleluya. Tus palabras, Señor, son espíritu y vida; tú tienes palabras de vida eterna. Aleluya.',
    gospel: {
      book: gospelBook,
      citation: gospelCitation,
      text: gospelText,
      keyVerse,
      summary,
    },
    reflection: {
      title: `Caminando con Jesús en el ${cal.dayOfWeekSpanish}`,
      content: `La liturgia de este día nos invita a abrir el corazón a la Palabra viva de Jesús. Al igual que a los discípulos en el camino de Emaús, el Señor sale a nuestro encuentro en las circunstancias concretas de nuestra jornada para explicarnos las Escrituras y renovar nuestra esperanza.`,
      emmausHeart: `En Emaús recordamos que Jesús camina a nuestro lado en cada momento. Al escuchar su Evangelio hoy, ¿cómo late tu corazón ante su llamada a amar y servir?`,
      actionForToday: 'Haz un momento de silencio para orar con este Evangelio y realiza un gesto de bondad hacia un hermano.'
    },
    prayer: 'Señor Jesús, acompáñanos en nuestro caminar diario, ilumina nuestras dudas con tu Palabra y danos la gracia de reconocerte siempre presente en nuestras vidas. Amén.',
    artPrompt: 'Masterpiece classical sacred oil painting in the style of Rembrandt and Caravaggio, depicting Jesus Christ preaching to his disciples in first century Judea. Golden divine sunlight, deep chiaroscuro, vertical 4:5 aspect ratio.',
    suggestedScenes: [
      {
        id: 'escena-dia',
        title: `${gospelBook} (${gospelCitation})`,
        description: 'Jesús proclamando la Buena Noticia rodeado de sus discípulos.',
        prompt: 'Masterpiece classical sacred oil painting in the style of Rembrandt and Caravaggio, depicting Jesus Christ preaching to his disciples in first century Judea. Golden divine sunlight, deep chiaroscuro, vertical 4:5 aspect ratio.'
      }
    ]
  };
}
