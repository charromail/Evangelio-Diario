import { DailyLiturgy } from '../types';

export const PRESET_LITURGY_DATABASE: Record<string, DailyLiturgy> = {
  // 2 DE JULIO DE 2026 - JUEVES XIII DEL TIEMPO ORDINARIO
  '2026-07-02': {
    date: '2026-07-02',
    formattedDate: 'Jueves 2 de Julio de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'verde',
    feastOrSaint: 'Jueves XIII del Tiempo Ordinario',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Amós 7, 10-17',
      title: 'Primera Lectura',
      text: 'En aquellos días, Amasías, sacerdote de Betel, mandó decir a Jeroboán, rey de Israel: «Amós conspira contra ti en medio de la casa de Israel; la tierra no puede soportar todas sus palabras...» Amós respondió a Amasías: «Yo no soy profeta ni hijo de profeta, sino pastor y cultivador de higos. El Señor me sacó de detrás del rebaño y me dijo: Ve y profetiza a mi pueblo Israel».'
    },
    psalm: {
      citation: 'Salmo 18',
      title: 'Salmo Responsorial',
      response: 'Los mandamientos del Señor alegran el corazón.',
      text: 'La ley del Señor es perfecta y es descanso del alma;\nel precepto del Señor es fiel e instruye al ignorante.\nLos mandatos del Señor son rectos y alegran el corazón;\nla norma del Señor es límpida y da luz a los ojos.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Dios estaba en Cristo reconciliando al mundo consigo, y ha puesto en nosotros la palabra de la reconciliación. Aleluya.',
    gospel: {
      book: 'Evangelio según San Mateo',
      citation: 'Mt 9, 1-8',
      text: `En aquel tiempo, subió Jesús a una barca, cruzó a la otra orilla y fue a su ciudad.

En esto le presentaron un paralítico, acostado en una camilla. Viendo la fe que tenían, dijo al paralítico:
—«¡Ánimo, hijo! Tus pecados te son perdonados».

De pronto, algunos escribas se dijeron:
—«Este blasfema».

Jesús, conociendo sus pensamientos, dijo:
—«¿Por qué pensáis mal en vuestros corazones? ¿Qué es más fácil, decir: "Tus pecados te son perdonados", o decir: "Levántate y anda"? Pues para que sepáis que el Hijo del hombre tiene potestad en la tierra para perdonar pecados —dice al paralítico—: "Ponte en pie, coge tu camilla y vete a tu casa"».

Se puso en pie y se fue a su casa. Al ver esto, la gente quedó sobrecogida y alababa a Dios, que da a los hombres tal potestad.`,
      keyVerse: '«¡Ánimo, hijo! Tus pecados te son perdonados... Ponte en pie, coge tu camilla y vete a tu casa». (Mt 9, 2.6)',
      summary: 'Jesús sana al paralítico en Cafarnaún tras perdonarle los pecados, demostrando su poder divino de sanación integral y misericordia.'
    },
    reflection: {
      title: 'La fe comunitaria y el perdón que levanta',
      content: 'Los amigos del paralítico no se rindieron; cargaron la camilla y la pusieron ante Jesús. El Señor se fija primero en la fe comunitaria de quienes lo traían: «Viendo la fe de ellos». Muchas veces en nuestro camino no tenemos fuerzas para caminar solos; necesitamos que los hermanos de Emaús nos acerquen a los pies del Maestro. Jesús sana primero el corazón perdonando los pecados y luego restituye el cuerpo, devolviendo la dignidad y la capacidad de ponerse en pie.',
      emmausHeart: 'En nuestro retiro y comunidad de Emaús, aprendemos a ser "camilleros" de la fe. ¿A quién necesitas acercar hoy a Jesús? El Señor te dice también a ti: "¡Ánimo, levántate!". Deja que su mirada restaure tus heridas más profundas.',
      actionForToday: 'Ora por un hermano o familiar que se sienta paralizado por el desánimo o la culpa, y hazle una llamada de consuelo y esperanza.'
    },
    prayer: 'Señor Jesús, médico de almas y cuerpos, concédenos la fe audaz de los amigos del paralítico. Levanta nuestras debilidades, perdona nuestros pecados y haznos instrumentos de tu misericordia en nuestra familia y comunidad. Amén.',
    artPrompt: 'Biblical classical oil painting in the style of Rembrandt and Caravaggio, depicting Jesus Christ standing in a rustic first-century Galilean stone room. Jesus has a serene and compassionate expression, wearing a warm white tunic and vibrant deep blue mantle, extending His hand toward a paralyzed man resting on a low woven wicker stretcher. Divine warm golden rays of sunlight pour down from an opening in the wooden beam ceiling, illuminating the scene. Anxious and hopeful family members and disciples surround the bed with hands clasped in tearful prayer, while skeptical Pharisees in ornate robes stand on the right murmuring in shadow. Chiaroscuro masterwork, warm earth tones, deep chiaroscuro contrasts, highly detailed painterly brushwork, vertical 4:5 composition.',
    suggestedScenes: [
      {
        id: 'curacion-paralitico',
        title: 'Jesús y el paralítico en Cafarnaún',
        description: 'Jesús bendiciendo y levantando al enfermo en la camilla rodeado de sus amigos.',
        prompt: 'Biblical classical oil painting in the style of Rembrandt and Caravaggio, depicting Jesus Christ standing in a rustic first-century Galilean stone room. Jesus has a serene and compassionate expression, wearing a warm white tunic and vibrant deep blue mantle, extending His hand toward a paralyzed man resting on a low woven wicker stretcher. Divine warm golden rays of sunlight pour down from an opening in the wooden beam ceiling, illuminating the scene. Anxious and hopeful family members and disciples surround the bed with hands clasped in tearful prayer, while skeptical Pharisees in ornate robes stand on the right murmuring in shadow. Chiaroscuro masterwork, warm earth tones, deep chiaroscuro contrasts, highly detailed painterly brushwork, vertical 4:5 composition.'
      }
    ]
  },

  // 17 DE AGOSTO DE 2026 - LUNES XX DEL TIEMPO ORDINARIO
  '2026-08-17': {
    date: '2026-08-17',
    formattedDate: 'Lunes 17 de Agosto de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'verde',
    feastOrSaint: 'Lunes XX del Tiempo Ordinario',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Ezequiel 24, 15-24',
      title: 'Primera Lectura',
      text: 'Me fue dirigida esta palabra del Señor: «Hijo de hombre, voy a arrebatarte repentinamente el encanto de tus ojos; no llores ni hagas duelo ni derrames lágrimas... Y dijo el pueblo: ¿No vas a explicarnos qué significa para nosotros lo que estás haciendo?».'
    },
    psalm: {
      citation: 'Deuteronomio 32, 18-21',
      title: 'Salmo Responsorial',
      response: 'Despreciaste a la Roca que te engendró.',
      text: 'Despreciaste a la Roca que te engendró, olvidaste al Dios que te dio a luz.\nLo vio el Señor y se indignó, irritado contra sus hijos y sus hijas.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Dichosos los pobres en el espíritu, porque de ellos es el reino de los cielos. Aleluya.',
    gospel: {
      book: 'Evangelio según San Mateo',
      citation: 'Mt 19, 16-22',
      text: `En aquel tiempo, se acercó uno a Jesús y le preguntó:
—«Maestro, ¿qué tengo que hacer de bueno para obtener la vida eterna?».

Jesús le contestó:
—«¿Por qué me preguntas qué es bueno? Uno solo es Bueno. De todos modos, si quieres entrar en la vida, guarda los mandamientos».

Él le preguntó:
—«¿Cuáles?».

Jesús contestó:
—«No matarás, no cometerás adulterio, no robarás, no darás falso testimonio, honra a tu padre y a tu madre, y ama a tu prójimo como a ti mismo».

El joven le dijo:
—«Todo eso lo he cumplido. ¿Qué me falta todavía?».

Jesús le dijo:
—«Si quieres ser perfecto, anda, vende tus bienes, da el dinero a los pobres —así tendrás un tesoro en el cielo— y luego ven y sígueme».

Al oír esto, el joven se fue triste, porque era muy rico.`,
      keyVerse: '«Si quieres ser perfecto, anda, vende tus bienes, da el dinero a los pobres... y luego ven y sígueme». (Mt 19, 21)',
      summary: 'El joven rico pregunta cómo ganar la vida eterna; Jesús lo invita a dejar sus apegos para seguirlo con libertad de corazón.'
    },
    reflection: {
      title: 'La mirada de amor de Jesús y el coraje de soltar',
      content: 'El joven cumplía todas las reglas, pero sentía un vacío en el corazón: «¿Qué me falta todavía?». Jesús le propone dar el salto del cumplimiento al amor verdadero. No basta con no hacer el mal; el Señor nos llama a entregarnos por entero.',
      emmausHeart: 'En Emaús aprendemos a desprendernos de las cargas, temores y apegos materiales que nos impiden caminar ligeros tras las huellas del Maestro.',
      actionForToday: 'Identifica un apego material o afectivo que ate tu libertad y haz un gesto concreto de generosidad compartiendo con alguien necesitado.'
    },
    prayer: 'Señor Jesús, danos la valentía de responder a tu llamada sin reservas. Que ninguna riqueza terrenal opaque la alegría de seguirte. Amén.',
    artPrompt: 'Masterpiece biblical oil painting, Jesus Christ speaking with the rich young ruler in a biblical Jerusalem colonnade. Golden sunset light, chiaroscuro, vertical 4:5.',
    suggestedScenes: [{ id: 'joven-rico', title: 'Jesús y el joven rico', description: 'Jesús invitando al joven a seguirle con amor.', prompt: 'Masterpiece biblical oil painting, Jesus Christ speaking with the rich young ruler, vertical 4:5.' }]
  },

  // 18 DE AGOSTO DE 2026 - MARTES XX DEL TIEMPO ORDINARIO
  '2026-08-18': {
    date: '2026-08-18',
    formattedDate: 'Martes 18 de Agosto de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'verde',
    feastOrSaint: 'Martes XX del Tiempo Ordinario',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Ezequiel 28, 1-10',
      title: 'Primera Lectura',
      text: 'Me fue dirigida esta palabra del Señor: «Hijo de hombre, di al soberano de Tiro: Así dice el Señor Dios: Tu corazón se ha engreído y has dicho: "Soy un dios, sentado en el trono de los dioses en el corazón de los mares"... Tú eres un hombre y no un dios».'
    },
    psalm: {
      citation: 'Deuteronomio 32, 26-28. 30. 35-36',
      title: 'Salmo Responsorial',
      response: 'Yo doy la muerte y la vida.',
      text: 'Pensé: «Voy a dispersarlos, borraré su memoria entre los hombres».\nEl Señor juzgará a su pueblo y tendrá compasión de sus siervos.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Jesucristo, siendo rico, se hizo pobre por vosotros, para enriqueceros con su pobreza. Aleluya.',
    gospel: {
      book: 'Evangelio según San Mateo',
      citation: 'Mt 19, 23-30',
      text: `En aquel tiempo, dijo Jesús a sus discípulos:
—«En verdad os digo que difícilmente entrará un rico en el reino de los cielos. Lo repito: más fácil le es a un camello pasar por el ojo de una aguja, que a un rico entrar en el reino de Dios».

Al oírlo, los discípulos dijeron consternados:
—«Entonces, ¿quién puede salvarse?».

Jesús se les quedó mirando y les dijo:
—«Es imposible para los hombres, pero para Dios todo es posible».

Entonces dijo Pedro:
—«Ya ves, nosotros lo hemos dejado todo y te hemos seguido; ¿qué nos va a tocar?».

Jesús les dijo:
—«En verdad os digo: cuando llegue la renovación y el Hijo del hombre se siente en el trono de su gloria, vosotros los que me habéis seguido os sentaréis también en doce tronos para juzgar a las doce tribus de Israel. Y todo el que haya dejado casa, o hermanos o hermanas, o padre o madre, o hijos o tierras, por mi nombre, recibirá el ciento por uno y heredará la vida eterna. Muchos primeros serán últimos y muchos últimos serán primeros».`,
      keyVerse: '«Es imposible para los hombres, pero para Dios todo es posible... recibirá el ciento por uno y heredará la vida eterna». (Mt 19, 26.29)',
      summary: 'Jesús enseña sobre la dificultad de las riquezas y la promesa del ciento por uno para quienes lo dejan todo por el Reino.'
    },
    reflection: {
      title: 'Para Dios todo es posible y su promesa no falla',
      content: 'Frente a las limitaciones humanas, la gracia divina abre caminos donde no los hay. Dios no se deja ganar en generosidad: quien confía en Él recibe paz, fraternidad y vida plena.',
      emmausHeart: 'En Emaús experimentamos el cumplimiento de su promesa: al poner nuestra vida a sus pies, Él la llena de sentido y nos regala una familia de hermanos en la fe.',
      actionForToday: 'Agradece a Dios las personas y gracias con las que ha bendecido tu camino cristiano.'
    },
    prayer: 'Señor, aumenta nuestra fe y ayúdanos a confiar plenamente en que para Ti nada es imposible. Amén.',
    artPrompt: 'Sacred biblical oil painting, Jesus reassuring His disciples at twilight, warm golden light, chiaroscuro, vertical 4:5.',
    suggestedScenes: [{ id: 'promesa-discipulos', title: 'Jesús y sus discípulos', description: 'Jesús prometiendo el ciento por uno a sus apóstoles.', prompt: 'Sacred biblical oil painting, vertical 4:5.' }]
  },

  // 19 DE AGOSTO DE 2026 - SAN JUAN EUDES / MIÉRCOLES XX DEL TIEMPO ORDINARIO
  '2026-08-19': {
    date: '2026-08-19',
    formattedDate: 'Miércoles 19 de Agosto de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'verde',
    feastOrSaint: 'San Juan Eudes, presbítero / Miércoles XX del Tiempo Ordinario',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Ezequiel 34, 1-11',
      title: 'Primera Lectura',
      text: 'Me fue dirigida esta palabra del Señor: «Hijo de hombre, profetiza contra los pastores de Israel... Así dice el Señor Dios: ¡Ay de los pastores de Israel que se apacientan a sí mismos! ¿No son las ovejas lo que deben apacentar los pastores?... Yo mismo buscaré a mis ovejas y cuidaré de ellas».'
    },
    psalm: {
      citation: 'Salmo 22',
      title: 'Salmo Responsorial',
      response: 'El Señor es mi pastor, nada me falta.',
      text: 'El Señor es mi pastor, nada me falta:\nen verdes praderas me hace recostar;\nme conduce hacia fuentes tranquilas\ny repara mis fuerzas.'
    },
    gospelAcclamation: 'Aleluya, aleluya. La palabra de Dios es viva y eficaz; juzga los deseos e intenciones del corazón. Aleluya.',
    gospel: {
      book: 'Evangelio según San Mateo',
      citation: 'Mt 20, 1-16',
      text: `En aquel tiempo, dijo Jesús a sus discípulos esta parábola:
—«El reino de los cielos se parece a un propietario que al amanecer salió a contratar jornaleros para su viña. Después de ajustarse con ellos en un denario por jornada, los mandó a la viña.

Salió otra vez a media mañana, vio a otros que estaban en la plaza sin trabajo y les dijo: "Id también vosotros a mi viña y os pagaré lo debido". Ellos fueron. Salió de nuevo hacia el mediodía y a media tarde, e hizo lo mismo.

Salió al caer la tarde y encontró a otros parados, y les dijo: "¿Cómo es que estáis aquí el día entero sin trabajar?". Le respondieron: "Nadie nos ha contratado". Él les dijo: "Id también vosotros a mi viña".

Cuando anocheció, dijo el dueño de la viña a su capataz: "Llama a los jornaleros y págales el jornal, empezando por los últimos y acabando por los primeros". Vinieron los de la última hora y cobraron un denario cada uno. Cuando llegaron los primeros, pensaban que recibirían más, pero ellos también cobraron un denario cada uno. Al recibirlo se pusieron a protestar contra el amo: "Estos últimos han trabajado solo una hora y los has tratado igual que a nosotros, que hemos aguantado el peso del día y el bochorno".

Él replicó a uno de ellos: "Amigo, no te hago ninguna injusticia. ¿No nos ajustamos en un denario? Toma lo tuyo y vete. Quiero darle a este último lo mismo que a ti. ¿Es que no tengo libertad para hacer lo que quiera en mis asuntos? ¿O vas a tener tú envidia porque yo soy bueno?".

Así, los últimos serán primeros y los primeros, últimos».`,
      keyVerse: '«¿O vas a tener tú envidia porque yo soy bueno? Así, los últimos serán primeros y los primeros, últimos». (Mt 20, 15-16)',
      summary: 'La parábola de los trabajadores de la viña revela la generosidad infinita y sin límites de Dios, que no mide el amor por cálculos humanos sino por pura gracia.'
    },
    reflection: {
      title: 'La generosidad sin medida del Dueño de la Viña',
      content: 'Dios no es un contable que mide nuestros méritos con una balanza fría. Él es un Padre generoso que sale a buscarnos a todas las horas de la vida: en la juventud, en la madurez y en el ocaso. Nadie está excluido ni llega demasiado tarde a su amor. En la lógica del Reino, la recompensa no es el salario, sino la comunión con el Dueño de la viña.',
      emmausHeart: 'En el camino de Emaús descubrimos que el Señor nos acoge sin importar nuestras tardanzas o cansancios. Si hoy sientes que has llegado tarde a la viña o que tus fuerzas flaquean, recuerda que su gracia te basta.',
      actionForToday: 'Agradece de corazón las bendiciones de los demás y evita toda comparación o envidia en tu comunidad o trabajo.'
    },
    prayer: 'Señor Jesús, enséñanos a mirar con tus ojos llenos de bondad y misericordia. Líbranos de la queja y de la envidia, y haznos servidores alegres en tu viña sin buscar más recompensa que amarte y hacerte amar. Amén.',
    artPrompt: 'Classical biblical fine-art oil painting in the style of Rembrandt and Caravaggio, depicting the Parable of the Laborers in the Vineyard. A gracious and noble landowner in warm golden robes standing beside a rustic stone table at twilight, handing a shining silver denarius coin to an elderly, humble laborer in simple linen clothes who receives it with deep gratitude and reverence. In the background, lush Mediterranean grapevines bathed in golden evening light, with other vineyard workers watching. Dramatic chiaroscuro, warm earthy tones, glowing sunset atmosphere, vertical 4:5 aspect ratio, sacred masterpiece.',
    suggestedScenes: [
      {
        id: 'pago-jornaleros',
        title: 'El Señor de la viña pagando el jornal',
        description: 'El dueño generoso entregando el denario con mirada bondadosa a los trabajadores de la última hora.',
        prompt: 'Classical biblical fine-art oil painting in the style of Rembrandt and Caravaggio, depicting the Parable of the Laborers in the Vineyard. Vertical 4:5 aspect ratio.'
      }
    ]
  },

  // 20 DE AGOSTO DE 2026 - SAN BERNARDO / JUEVES XX DEL TIEMPO ORDINARIO
  '2026-08-20': {
    date: '2026-08-20',
    formattedDate: 'Jueves 20 de Agosto de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'blanco',
    feastOrSaint: 'San Bernardo, abad y doctor de la Iglesia / Jueves XX del Tiempo Ordinario',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Ezequiel 36, 23-28',
      title: 'Primera Lectura',
      text: 'Así dice el Señor: «Santificaré mi gran nombre profanado entre las naciones... Os recogeré de entre las naciones, os reuniré de todos los países y os llevaré a vuestra tierra. Os rociaré con agua pura y quedaréis purificados... Os daré un corazón nuevo y os infundiré un espíritu nuevo; arrancaré de vuestra carne el corazón de piedra y os daré un corazón de carne».'
    },
    psalm: {
      citation: 'Salmo 50',
      title: 'Salmo Responsorial',
      response: 'Oh Dios, crea en mí un corazón puro.',
      text: 'Oh Dios, crea en mí un corazón puro, renuévame por dentro con espíritu firme.\nNo me arrojes lejos de tu rostro, no me quites tu santo espíritu.\nDevuélveme la alegría de tu salvación.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Si escucháis hoy la voz del Señor, no endurezcáis vuestro corazón. Aleluya.',
    gospel: {
      book: 'Evangelio según San Mateo',
      citation: 'Mt 22, 1-14',
      text: `En aquel tiempo, de nuevo tomó Jesús la palabra y habló en parábolas a los sumos sacerdotes y a los ancianos del pueblo:
—«El reino de los cielos se parece a un rey que celebraba la boda de su hijo. Mandó a sus criados a llamar a los convidados a la boda, pero no quisieron ir.

De nuevo envió otros criados con este encargo: "Decid a los convidados: Ya tengo preparado el banquete, he matado mis terneros y reses cebadas y todo está a punto. Venid a la boda". Pero ellos no hicieron caso y se fueron cada uno a su campo o a su negocio; los demás echaron mano a los criados, los maltrataron y los mataron.

El rey montó en cólera, envió sus tropas, que acabaron con aquellos asesinos y prendieron fuego a su ciudad. Luego dijo a sus criados: "La boda está preparada, pero los convidados no eran dignos. Id, pues, a los cruces de los caminos y a cuantos encontréis, convidadlos a la boda".

Los criados salieron a los caminos y reunieron a todos los que encontraron, malos y buenos; y la sala del banquete se llenó de comensales.

Cuando el rey entró a ver a los comensales, vio allí a un hombre que no llevaba traje de fiesta y le dijo: "Amigo, ¿cómo has entrado aquí sin el traje de fiesta?". El otro se quedó callado. Entonces el rey dijo a los servidores: "Atadlo de pies y manos y arrojadlo fuera, a las tinieblas; allí será el llanto y el rechinar de dientes".

Porque muchos son los llamados, pero pocos los elegidos».`,
      keyVerse: '«Id a los cruces de los caminos y a cuantos encontréis, convidadlos a la boda... Porque muchos son los llamados, pero pocos los elegidos». (Mt 22, 9.14)',
      summary: 'La parábola del banquete nupcial nos recuerda la invitación universal de Dios a la fiesta de su Reino y la necesidad de vestir el traje de la gracia y el amor fraterno.'
    },
    reflection: {
      title: 'La invitación al banquete y el traje de fiesta de la gracia',
      content: 'Dios prepara un banquete de fiesta para todos sus hijos. El rey envía a sus siervos a los cruces de caminos para invitar a todos, sin distinción. Pero presentarse al banquete exige vestir el "traje de fiesta": una vida renovada por el Espíritu, llena de misericordia, perdón y pureza de corazón.',
      emmausHeart: 'En Emaús somos invitados al banquete de la Eucaristía, donde el Señor se nos da como alimento. San Bernardo nos enseña que el amor es la medida del amor a Dios. Aceptemos la invitación con un corazón agradecido y dispuesto a la conversión.',
      actionForToday: 'Vístete hoy interiormente de paciencia, dulzura y caridad en tu trato con tu familia y compañeros.'
    },
    prayer: 'Señor Jesús, que nos llamas a la fiesta de tu Reino, purifica nuestros corazones para que vistamos siempre la túnica de tu gracia y celebremos con gozo tu salvación. Amén.',
    artPrompt: 'Masterpiece classical oil painting in the style of Rembrandt and Caravaggio, depicting the Parable of the Wedding Feast (Mt 22). Radiant King at the head of a festive biblical banquet hall warmly welcoming humble travelers and guests bathed in luminous celestial candlelight. Deep chiaroscuro, warm golden earth tones, rich garments, vertical 4:5 aspect ratio.',
    suggestedScenes: [
      {
        id: 'banquete-nupcial',
        title: 'El Banquete del Rey',
        description: 'El Rey recibiendo con brazos abiertos a los convidados de los cruces de caminos en el banquete nupcial.',
        prompt: 'Masterpiece biblical oil painting, The King welcoming humble travelers to the royal wedding feast in a grand hall, golden candlelight, chiaroscuro, vertical 4:5.'
      }
    ]
  },

  // 21 DE AGOSTO DE 2026 - SAN PÍO X / VIERNES XX DEL TIEMPO ORDINARIO
  '2026-08-21': {
    date: '2026-08-21',
    formattedDate: 'Viernes 21 de Agosto de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'blanco',
    feastOrSaint: 'San Pío X, papa / Viernes XX del Tiempo Ordinario',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Ezequiel 37, 1-14',
      title: 'Primera Lectura',
      text: 'La mano del Señor se posó sobre mí, y el Señor me sacó en espíritu y me colocó en medio de un campo lleno de huesos... Y me dijo: «Hijo de hombre, ¿revivirán estos huesos?». Yo respondí: «Señor Dios, tú lo sabes»... Profeticé como me había mandado, y entró en ellos el espíritu, revivieron y se pusieron en pie: era una multitud inmensa.'
    },
    psalm: {
      citation: 'Salmo 106',
      title: 'Salmo Responsorial',
      response: 'Dad gracias al Señor, porque es bueno, porque es eterna su misericordia.',
      text: 'Que lo confiesen los redimidos por el Señor, los que él libró de la mano del enemigo.\nLos congregó de entre los países, de oriente y occidente, del norte y del mar.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Guíame en tu verdad y enséñame, porque tú eres mi Dios y Salvador. Aleluya.',
    gospel: {
      book: 'Evangelio según San Mateo',
      citation: 'Mt 22, 34-40',
      text: `En aquel tiempo, los fariseos, al oír que Jesús había hecho callar a los saduceos, se reunieron en un lugar y uno de ellos, un doctor de la ley, le preguntó para ponerlo a prueba:
—«Maestro, ¿cuál es el mandamiento principal de la ley?».

Él le dijo:
—«"Amarás al Señor tu Dios con todo tu corazón, con toda tu alma, con toda tu mente". Este mandamiento es el principal y primero. El segundo es semejante a él: "Amarás a tu prójimo como a ti mismo". En estos dos mandamientos se sostienen toda la Ley y los Profetas».`,
      keyVerse: '«Amarás al Señor tu Dios con todo tu corazón... y a tu prójimo como a ti mismo. En estos dos mandamientos se sostienen toda la Ley». (Mt 22, 37-40)',
      summary: 'Jesús sintetiza toda la revelación y los mandamientos en el amor indivisible a Dios y al prójimo.'
    },
    reflection: {
      title: 'El Mandamiento del Amor: alma de la vida cristiana',
      content: 'Jesús no añade más cargas ni preceptos complicados. Resume toda la fe en un solo latido: amar a Dios con todo el ser y al hermano como a uno mismo. No se puede amar a Dios a quien no vemos si no amamos al hermano a quien vemos.',
      emmausHeart: 'En Emaús experimentamos que el amor fraterno es el termómetro de nuestro amor a Jesús. Cuando caminamos junto al hermano y partimos con él el pan y la vida, el mandamiento principal se hace realidad viva.',
      actionForToday: 'Realiza hoy un acto concreto de amor hacia alguien con quien te cueste convivir o hacia quien esté pasando necesidad.'
    },
    prayer: 'Señor Jesús, enséñanos a amar sin medida, con un corazón limpio y generoso, amando a Dios sobre todas las cosas y sirviendo a nuestros hermanos con alegría. Amén.',
    artPrompt: 'Biblical masterpiece oil painting, Jesus Christ teaching with divine tenderness among his disciples, holding his hand over his heart, golden chiaroscuro illumination, vertical 4:5.',
    suggestedScenes: [{ id: 'mandamiento-amor', title: 'El Gran Mandamiento del Amor', description: 'Jesús proclamando el mandamiento principal a sus oyentes.', prompt: 'Biblical masterpiece oil painting, vertical 4:5.' }]
  },

  // 22 DE AGOSTO DE 2026 - SANTA MARÍA REINA / SÁBADO XX DEL TIEMPO ORDINARIO
  '2026-08-22': {
    date: '2026-08-22',
    formattedDate: 'Sábado 22 de Agosto de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'blanco',
    feastOrSaint: 'Santa María Reina, memoria / Sábado XX del Tiempo Ordinario',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Ezequiel 43, 1-7',
      title: 'Primera Lectura',
      text: 'El ángel me llevó a la puerta que mira a oriente, y vi la gloria del Dios de Israel que venía de oriente... La gloria del Señor entró en el templo por la puerta de oriente... y la gloria del Señor llenaba el templo.'
    },
    psalm: {
      citation: 'Salmo 84',
      title: 'Salmo Responsorial',
      response: 'La gloria del Señor habitará en nuestra tierra.',
      text: 'Voy a escuchar lo que dice el Señor: «Dios anuncia la paz a su pueblo y a sus amigos».\nLa misericordia y la fidelidad se encuentran, la justicia y la paz se besan.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Vosotros tenéis un solo Padre, el del cielo, y un solo Maestro, Cristo. Aleluya.',
    gospel: {
      book: 'Evangelio según San Mateo',
      citation: 'Mt 23, 1-12',
      text: `En aquel tiempo, Jesús habló a la gente y a sus discípulos diciendo:
—«En la cátedra de Moisés se han sentado los escribas y los fariseos: haced y cumplid todo lo que os digan; pero no hagáis lo que ellos hacen, porque ellos dicen, pero no hacen. Lían fardos pesados e insoportables y se los cargan a la gente en los hombros, pero ellos no están dispuestos a mover un dedo para empujar.

Todo lo que hacen es para que los vea la gente... Les gusta el primer puesto en los banquetes y los primeros asientos en las sinagogas...

Vosotros, en cambio, no os dejéis llamar "maestro", porque uno solo es vuestro Maestro y todos vosotros sois hermanos. Y no llaméis padre vuestro a nadie en la tierra, porque uno solo es vuestro Padre, el del cielo. Ni os dejéis llamar preceptores, porque uno solo es vuestro Preceptor, el Mesías.

El mayor entre vosotros será vuestro servidor. El que se enaltece será humillado, y el que se humilla será enaltecido».`,
      keyVerse: '«El mayor entre vosotros será vuestro servidor. El que se enaltece será humillado, y el que se humilla será enaltecido». (Mt 23, 11-12)',
      summary: 'Jesús denuncia la hipocresía religiosa y propone el camino de la humildad sincera y el servicio generoso.'
    },
    reflection: {
      title: 'La grandeza del servicio y la humildad del corazón',
      content: 'En el Reino de Dios las jerarquías se invierten: el más grande no es quien domina, sino quien se pone de rodillas para lavar los pies y servir. María Santísima, Reina del cielo, se proclamó la humilde esclava del Señor.',
      emmausHeart: 'En Emaús los servidores son el alma de la comunidad. El carisma de servicio nos enseña a desaparecer para que Cristo brille en la vida de los caminantes.',
      actionForToday: 'Haz una tarea de servicio silenciosa en tu hogar o comunidad sin buscar reconocimiento ni agradecimiento.'
    },
    prayer: 'Señor Jesús, haznos mansos y humildes de corazón a ejemplo de tu Santísima Madre, Reina y servidora fiel. Amén.',
    artPrompt: 'Classical oil painting, Jesus washing the disciples feet and teaching humility, dramatic warm candlelight, Caravaggio style, vertical 4:5.',
    suggestedScenes: [{ id: 'servicio-humildad', title: 'El mayor sea vuestro servidor', description: 'Jesús enseñando el valor del servicio humilde.', prompt: 'Classical biblical oil painting, vertical 4:5.' }]
  },

  // 23 DE AGOSTO DE 2026 - DOMINGO XXI DEL TIEMPO ORDINARIO
  '2026-08-23': {
    date: '2026-08-23',
    formattedDate: 'Domingo 23 de Agosto de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'verde',
    feastOrSaint: 'Domingo XXI del Tiempo Ordinario',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Isaías 66, 18-21',
      title: 'Primera Lectura',
      text: 'Así dice el Señor: «Yo conozco sus obras y sus pensamientos. Vendré para reunir a todas las naciones y lenguas; vendrán y verán mi gloria... y de entre ellos tomaré sacerdotes y levitas».'
    },
    psalm: {
      citation: 'Salmo 116',
      title: 'Salmo Responsorial',
      response: 'Id al mundo entero y proclamad el Evangelio.',
      text: 'Alabad al Señor, todas las naciones, aclamadlo, todos los pueblos.\nFirme es su misericordia con nosotros, su fidelidad dura por siempre.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Yo soy el camino, y la verdad, y la vida —dice el Señor—; nadie viene al Padre sino por mí. Aleluya.',
    gospel: {
      book: 'Evangelio según San Lucas',
      citation: 'Lc 13, 22-30',
      text: `En aquel tiempo, Jesús pasaba por ciudades y aldeas enseñando y encaminándose hacia Jerusalén. Uno le preguntó:
—«Señor, ¿son pocos los que se salvan?».

Él les dijo:
—«Esforzaos en entrar por la puerta estrecha, pues os digo que muchos intentarán entrar y no podrán. Cuando el amo de la casa se levante y cierre la puerta, os quedaréis fuera y llamaréis a la puerta diciendo: "Señor, ábrenos"; pero él os responderá: "No sé quiénes sois".

Entonces os pondréis a decir: "Hemos comido y bebido contigo, y has enseñado en nuestras plazas". Pero él os dirá: "No sé de dónde sois. Alejaos de mí todos los obradores de iniquidad".

Allí será el llanto y el rechinar de dientes, cuando veáis a Abrahán, a Isaac y a Jacob y a todos los profetas en el reino de Dios, pero vosotros os veáis arrojados fuera. Y vendrán de oriente y occidente, del norte y del sur, y se sentarán a la mesa en el reino de Dios.

Mirad: hay últimos que serán primeros, y primeros que serán últimos».`,
      keyVerse: '«Esforzaos en entrar por la puerta estrecha... vendrán de oriente y occidente, del norte y del sur, y se sentarán a la mesa en el reino de Dios». (Lc 13, 24.29)',
      summary: 'Jesús nos exhorta a no acomodarnos en una religiosidad superficial y a entrar con decisión por la puerta estrecha del amor y la coherencia de vida.'
    },
    reflection: {
      title: 'La puerta estrecha del amor fiel y perseverante',
      content: 'La salvación no es un boleto automático por pertenecer a un grupo o haber escuchado palabras piadosas. La "puerta estrecha" es la de la caridad sincera, el perdón diario y la perseverancia en la cruz junto a Jesús.',
      emmausHeart: 'En Emaús aprendemos que caminar con Jesús requiere dejar equipaje innecesario para caber por la puerta del Reino: el perdón, la reconciliación y el arrepentimiento abren las puertas de par en par.',
      actionForToday: 'Revisa tu coherencia entre lo que profesas los domingos y cómo vives de lunes a sábado con tus seres queridos.'
    },
    prayer: 'Señor Jesús, danos la gracia de caminar con decisión por la senda de tu Evangelio y perseverar con fidelidad hasta sentarnos a tu mesa celestial. Amén.',
    artPrompt: 'Masterpiece classical oil painting, Jesus teaching along the road to Jerusalem, warm golden sunset, disciples listening intently, vertical 4:5.',
    suggestedScenes: [{ id: 'puerta-estrecha', title: 'La Puerta Estrecha', description: 'Jesús exhortando a sus seguidores en el camino.', prompt: 'Masterpiece biblical oil painting, vertical 4:5.' }]
  },

  // 24 DE AGOSTO DE 2026 - SAN BARTOLOMÉ, APÓSTOL
  '2026-08-24': {
    date: '2026-08-24',
    formattedDate: 'Lunes 24 de Agosto de 2026',
    season: 'Tiempo Ordinario',
    liturgicalColor: 'rojo',
    feastOrSaint: 'San Bartolomé, apóstol / Fiesta',
    cycle: 'Año II / Ciclo C',
    firstReading: {
      citation: 'Apocalipsis 21, 9-14',
      title: 'Primera Lectura',
      text: 'Vino uno de los siete ángeles y me habló diciendo: «Ven, te mostraré a la novia, a la esposa del Cordero»... La muralla de la ciudad se asentaba sobre doce piedras de cimiento, que llevaban los nombres de los doce apóstoles del Cordero.'
    },
    psalm: {
      citation: 'Salmo 144',
      title: 'Salmo Responsorial',
      response: 'Que tus fieles, Señor, proclamen la gloria de tu reinado.',
      text: 'Que todas tus criaturas te den gracias, Señor, que te bendigan tus fieles.\nQue proclamen la gloria de tu reinado, que hablen de tus hazañas.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Rabí, tú eres el Hijo de Dios, tú eres el Rey de Israel. Aleluya.',
    gospel: {
      book: 'Evangelio según San Juan',
      citation: 'Jn 1, 45-51',
      text: `En aquel tiempo, Felipe encuentra a Natanael y le dice:
—«Aquel de quien escribieron Moisés en la ley y los profetas, lo hemos encontrado: Jesús, hijo de José, de Nazaret».

Natanael le replicó:
—«¿De Nazaret puede salir algo bueno?».

Felipe le contestó:
—«Ven y verás».

Vio Jesús que se acercaba Natanael y dijo de él:
—«Ahí tenéis a un verdadero israelita, en quien no hay engaño».

Natanael le contesta:
—«¿De qué me conoces?».

Jesús le responde:
—«Antes de que Felipe te llamara, cuando estabas debajo de la higuera, te vi».

Natanael respondió:
—«Rabí, tú eres el Hijo de Dios, tú eres el Rey de Israel».

Jesús le contestó:
—«¿Por haberte dicho que te vi debajo de la higuera, crees? Has de ver cosas mayores». Y le añadió: «En verdad, en verdad os digo: veréis el cielo abierto y a los ángeles de Dios subir y bajar sobre el Hijo del hombre».`,
      keyVerse: '«Ven y verás... Antes de que Felipe te llamara, cuando estabas debajo de la higuera, te vi». (Jn 1, 46.48)',
      summary: 'El encuentro entre Jesús y San Bartolomé (Natanael): «Ven y verás». Jesús nos conoce en lo íntimo y nos invita a ser testigos de su gloria.'
    },
    reflection: {
      title: '«Ven y verás»: la experiencia personal con Jesús',
      content: 'Felipe no discute teorías; da un testimonio simple y contundente: «Ven y verás». Cuando Natanael se encuentra cara a cara con Jesús y descubre que el Señor lo conocía desde antes, sus dudas se transforman en una confesión de fe.',
      emmausHeart: 'Emaús es exactamente esa invitación: «Ven y verás». No te quedes con lo que otros te cuenten de Jesús; ven y encuéntrate vivo con Él en el camino.',
      actionForToday: 'Invita con entusiasmo y cariño a un amigo o familiar a un grupo de oración, misa o retiro de Emaús.'
    },
    prayer: 'Señor Jesús, que conoces los secretos de nuestro corazón como conocías a Natanael bajo la higuera, abre nuestros ojos para contemplar tu gloria y dar testimonio de tu amor. Amén.',
    artPrompt: 'Masterpiece classical fine art oil painting, Jesus Christ meeting Nathanael (Saint Bartholomew) under the shade of a fig tree, golden atmospheric lighting, chiaroscuro, vertical 4:5.',
    suggestedScenes: [{ id: 'encuentro-natanael', title: 'Jesús y San Bartolomé', description: '«Antes de que Felipe te llamara, te vi debajo de la higuera».', prompt: 'Masterpiece biblical oil painting, vertical 4:5.' }]
  },

  // PASAJE CENTRAL DE EMAÚS
  'emmaus-special': {
    date: 'special-emmaus',
    formattedDate: 'El Camino de Emaús (Pasaje Central)',
    season: 'Pascua',
    liturgicalColor: 'blanco',
    feastOrSaint: 'Los Discípulos de Emaús / Lucas 24',
    cycle: 'Evangelio de San Lucas',
    firstReading: {
      citation: 'Hechos 2, 14. 22-33',
      title: 'Primera Lectura',
      text: 'El día de Pentecostés, Pedro, de pie con los Once, levantó la voz y les dijo: «Judíos y todos los que habitáis en Jerusalén... a este Jesús Dios lo resucitó, de lo cual todos nosotros somos testigos».'
    },
    psalm: {
      citation: 'Salmo 15',
      title: 'Salmo Responsorial',
      response: 'Señor, me enseñarás el camino de la vida.',
      text: 'Protégeme, Dios mío, que me refugio en ti.\nYo digo al Señor: «Tú eres mi bien».\nEl Señor es el lote de mi heredad y mi copa;\nmi suerte está en tu mano.'
    },
    gospelAcclamation: 'Aleluya, aleluya. Señor Jesús, explícanos las Escrituras; haz que arda nuestro corazón mientras nos hablas. Aleluya.',
    gospel: {
      book: 'Evangelio según San Lucas',
      citation: 'Lc 24, 13-35',
      text: `Aquel mismo día, dos de los discípulos iban caminando a una aldea llamada Emaús, distante unas dos leguas de Jerusalén; iban conversando entre ellos de todo lo que había sucedido.

Mientras conversaban y discutían, Jesús en persona se acercó y se puso a caminar con ellos. Pero sus ojos no eran capaces de reconocerlo.

Él les dijo:
—«¿De qué conversáis por el camino?».

Ellos se detuvieron con aire entristecido. Y uno de ellos, que se llamaba Cleofás, le respondió:
—«¿Eres tú el único forastero en Jerusalén que no sabe lo que ha pasado allí estos días?».

Él les dijo:
—«¿Qué?».

Ellos le contestaron:
—«Lo de Jesús el Nazareno, que fue un profeta poderoso en obras y palabras ante Dios y todo el pueblo... Nosotros esperábamos que él fuera el futuro liberador de Israel, y ya es el tercer día...».

Entonces Jesús les dijo:
—«¡Qué necios y torpes sois para creer lo que dijeron los profetas! ¿No era necesario que el Mesías padeciera esto y entrara así en su gloria?».

Y, comenzando por Moisés y siguiendo por todos los profetas, les explicó lo que se refería a él en todas las Escrituras.

Llegaron cerca de la aldea adonde iban y él hizo ademán de seguir adelante. Pero ellos le apremiaron diciendo:
—«Quédate con nosotros, porque atardece y el día va de caída».

Y entró para quedarse con ellos. Sentado a la mesa con ellos, tomó el pan, pronunció la bendición, lo partió y se lo dio. A ellos se les abrieron los ojos y lo reconocieron. Pero él desapareció de su vista.

Y se dijeron el uno al otro:
—«¿No ardía nuestro corazón mientras nos hablaba en el camino y nos explicaba las Escrituras?».

Y, levantándose en aquel momento, se volvieron a Jerusalén... y contaron lo que les había pasado por el camino y cómo lo habían reconocido al partir el pan.`,
      keyVerse: '«¿No ardía nuestro corazón mientras nos hablaba en el camino y nos explicaba las Escrituras?... Quédate con nosotros, porque atardece». (Lc 24, 29.32)',
      summary: 'Jesús resucitado camina junto a dos discípulos desanimados hacia Emaús, les ilumina las Escrituras y se revela vivo al partir el pan.'
    },
    reflection: {
      title: 'Jesús camina a nuestro lado y parte el Pan',
      content: 'El pasaje de Emaús es el corazón palpitante de nuestra experiencia de fe. Todos hemos caminado cabizbajos hacia nuestro propio Emaús, con sueños rotos y preguntas sin respuesta. Jesús no nos juzga; se hace el encontradizo, camina a nuestro ritmo, escucha nuestro dolor y luego transforma nuestro luto en danza al explicarnos el sentido del dolor y de la Pascua.',
      emmausHeart: '«¿No ardía nuestro corazón?». Esa es la llama viva de Emaús. Cuando nos encontramos con Jesús en los sacramentos, en la adoración y en el amor fraterno, nuestro corazón vuelve a encenderse para volver a Jerusalén a dar testimonio: ¡Jesucristo ha resucitado!',
      actionForToday: 'Haz una oración de acogida diciendo: "Quédate con nosotros, Señor, en mi hogar y en mi corazón", y comparte con alguien un testimonio de esperanza.'
    },
    prayer: 'Señor Jesús, divino caminante de Emaús, quédate con nosotros porque atardece. Enciende en nuestras almas el fuego de tu amor, abre nuestros ojos para reconocerte en los hermanos y en la fracción del pan, y haznos mensajeros alegres de tu Resurrección. Amén.',
    artPrompt: 'Classical Renaissance fine-art oil painting in the style of Rembrandt and Caravaggio, depicting the Supper at Emmaus (Lucas 24). Risen Jesus Christ at the center of a rustic wooden tavern table, clothed in glowing warm white robes and deep blue mantle with a radiant subtle halo of golden light. Jesus is blessing and breaking a loaf of rustic bread. Two disciples with intense emotional astonishment, eyes wide open in awe and hands raised in reverence as they recognize the Lord. Warm candlelight and divine golden aura, deep chiaroscuro shadows, rich earthy tones, masterwork quality, vertical 4:5 format.',
    suggestedScenes: [
      {
        id: 'partir-el-pan',
        title: 'La Fracción del Pan en Emaús',
        description: 'Jesús partiendo el pan en la mesa mientras los ojos de los dos discípulos se abren con asombro.',
        prompt: 'Classical Renaissance fine-art oil painting in the style of Rembrandt and Caravaggio, depicting the Supper at Emmaus. Vertical 4:5 format.'
      }
    ]
  }
};
