import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import * as cheerio from "cheerio";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Cache for liturgical dates to prevent duplicate calls
const liturgyCache = new Map<string, any>();

/**
 * Scraper helper to extract official readings directly from Dominicos.org & CEE references
 */
async function fetchDominicosLiturgyText(dateStr: string): Promise<{
  scrapedRawText: string;
  dominicosUrl: string;
  ceeUrl: string;
} | null> {
  const ceeUrl = "https://www.conferenciaepiscopal.es/liturgia-en-espanol/";
  const dominicosUrl = `https://www.dominicos.org/predicacion/evangelio-del-dia/${dateStr}/`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(dominicosUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9",
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      // Try fallback URL /hoy/ if today's date
      const today = new Date().toISOString().split("T")[0];
      if (dateStr === today) {
        const todayRes = await fetch("https://www.dominicos.org/predicacion/evangelio-del-dia/hoy/", {
          headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "es-ES,es;q=0.9" },
        });
        if (todayRes.ok) {
          const html = await todayRes.text();
          const $ = cheerio.load(html);
          const bodyText = $("article, .evangelio, main, .cuerpo-texto").text().replace(/\s+/g, " ").trim();
          if (bodyText.length > 100) {
            return { scrapedRawText: bodyText.slice(0, 3500), dominicosUrl, ceeUrl };
          }
        }
      }
      return { scrapedRawText: "", dominicosUrl, ceeUrl };
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const bodyText = $("article, .evangelio, main, .cuerpo-texto").text().replace(/\s+/g, " ").trim();

    return {
      scrapedRawText: bodyText.length > 100 ? bodyText.slice(0, 3500) : "",
      dominicosUrl,
      ceeUrl,
    };
  } catch (error) {
    console.warn("Could not fetch Dominicos HTML directly, falling back to lectionary knowledge base:", error);
    return {
      scrapedRawText: "",
      dominicosUrl,
      ceeUrl,
    };
  }
}

// Style anchor strictly defining the visual identity of reference image 20260702.png
const SACRED_ART_STYLE_ANCHOR = `Masterpiece biblical fine art oil painting strictly in the aesthetic of Carl Bloch, Rembrandt, Heinrich Hofmann, and Caravaggio.
Key visual rules:
- Medium: Traditional classical oil on canvas with fine painterly texture, anatomical realism, and reverent sacred atmosphere.
- Lighting: Strong dramatic chiaroscuro with a prominent divine beam of warm golden celestial sunlight pouring down from above, illuminating Jesus and the central characters while peripheral areas rest in rich warm earthen shadow.
- Jesus Christ: Depicted with compassionate, noble, and radiant countenance, dark brown shoulder-length hair and neat beard, wearing a warm cream/linen under-tunic and a deep vibrant cobalt blue mantle draped over His shoulder, gesturing with tender divine authority.
- Characters & Setting: Authentic first-century Judean garments, linen head coverings, woven mantles, elderly bearded figures, women with tearful hope and hands clasped in prayer, rustic stone/clay interior or dusty Galilean landscape with wooden beams.
- Palette: Warm earth tones (burnt umber, sienna, golden ochre, deep indigo, madder red) with luminous golden highlights.
- Format: Strict vertical portrait composition (4:5 aspect ratio).
- Negative constraints: Strictly no anime, no 3D digital CGI render, no modern clothing, no cartoon, no neon colors, no text or typography inside the artwork.`;

/**
 * Endpoint: Get Catholic Daily Liturgy (Readings, Gospel, Emmaus Reflection, Image Prompts)
 */
app.get("/api/liturgy/daily", async (req, res) => {
  try {
    const dateStr = (req.query.date as string) || new Date().toISOString().split("T")[0];

    if (liturgyCache.has(dateStr)) {
      return res.json({ success: true, data: liturgyCache.get(dateStr), cached: true });
    }

    // Attempt direct extraction from Dominicos.org / CEE sources
    const scrapedSource = await fetchDominicosLiturgyText(dateStr);

    // Call Gemini with explicit grounding in Dominicos.org and Conferencia Episcopal Española (CEE)
    const prompt = `Eres un experto teólogo y liturgista católico de la Iglesia universal y predicador de los Retiros de Emaús.
Tu misión es extraer y generar la liturgia católica oficial para la fecha: ${dateStr}, tomando estrictamente como fuentes oficiales de verdad y referencia litúrgica en español:
1. https://www.conferenciaepiscopal.es/liturgia-en-espanol/ (Leccionario y Misal Romano de la Conferencia Episcopal Española - CEE).
2. https://dominicos.org/predicacion/evangelio-del-dia/ (Orden de Predicadores - Dominicos.org).

${scrapedSource?.scrapedRawText ? `CONTENIDO EXTRAÍDO DIRECTAMENTE DE LA FUENTE LITÚRGICA DOMINICOS:\n"""${scrapedSource.scrapedRawText}"""\n` : ''}

Asegúrate de estructurar con máxima fidelidad:
1. Tiempo litúrgico (Tiempo Ordinario, Cuaresma, Pascua, Adviento, Navidad) y color litúrgico (verde, blanco, rojo, morado).
2. Santo o memoria del día y semana litúrgica en el campo 'feastOrSaint' con el formato: "Nombre del Santo o Memoria / Día X del Tiempo Litúrgico" (por ejemplo: "San Bernardo, abad y doctor de la Iglesia / Jueves XX del Tiempo Ordinario", o "San Juan Eudes, presbítero / Miércoles XX del Tiempo Ordinario", o si no hay santo con memoria obligatoria: "Jueves XIII del Tiempo Ordinario").
3. Primera Lectura bíblica completa con su cita bíblica oficial.
4. Salmo Responsorial con cita, respuesta comunitaria y estrofas.
5. Segunda Lectura (si es domingo o solemnidad, o dejar vacío si es día ferial).
6. Aclamación del Evangelio (Aleluya).
7. Evangelio del día completo con cita bíblica (San Mateo, San Marcos, San Lucas o San Juan), texto fiel a la traducción litúrgica en español de la Conferencia Episcopal Española / Dominicos.org, versículo clave destacado y resumen.
8. Reflexión espiritual con el carisma de Emaús («¿No ardía nuestro corazón mientras nos hablaba en el camino?» Lucas 24, 32), aterrizada a la vida diaria y a la fraternidad cristiana.
9. Propósito práctico para el día y oración final.
10. Un prompt detallado en inglés para generar una obra de arte sacro al óleo clásica con el estilo EXACTO de la pintura de referencia: Jesús con túnica color crema y manto azul cobalto, haz de luz divina celestial cálida cayendo desde lo alto, claroscuro profundo, personajes del siglo I con expresiones emotivas de fe y devoción, formato vertical 4:5, estilo Carl Bloch, Rembrandt y Caravaggio.
11. Dos o tres escenas bíblicas sugeridas derivadas del Evangelio con títulos y descripciones.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING },
            formattedDate: { type: Type.STRING, description: "Fecha en español, ej: 'Miércoles 19 de Agosto de 2026'" },
            season: { type: Type.STRING },
            liturgicalColor: { type: Type.STRING },
            feastOrSaint: { type: Type.STRING },
            cycle: { type: Type.STRING },
            firstReading: {
              type: Type.OBJECT,
              properties: {
                citation: { type: Type.STRING },
                title: { type: Type.STRING },
                text: { type: Type.STRING },
              },
              required: ["citation", "title", "text"],
            },
            psalm: {
              type: Type.OBJECT,
              properties: {
                citation: { type: Type.STRING },
                title: { type: Type.STRING },
                response: { type: Type.STRING },
                text: { type: Type.STRING },
              },
              required: ["citation", "title", "response", "text"],
            },
            gospelAcclamation: { type: Type.STRING },
            gospel: {
              type: Type.OBJECT,
              properties: {
                book: { type: Type.STRING },
                citation: { type: Type.STRING },
                text: { type: Type.STRING },
                keyVerse: { type: Type.STRING },
                summary: { type: Type.STRING },
              },
              required: ["book", "citation", "text", "keyVerse", "summary"],
            },
            reflection: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.STRING },
                emmausHeart: { type: Type.STRING },
                actionForToday: { type: Type.STRING },
              },
              required: ["title", "content", "emmausHeart", "actionForToday"],
            },
            prayer: { type: Type.STRING },
            artPrompt: { type: Type.STRING },
            suggestedScenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  prompt: { type: Type.STRING },
                },
                required: ["id", "title", "description", "prompt"],
              },
            },
          },
          required: [
            "date",
            "formattedDate",
            "season",
            "liturgicalColor",
            "firstReading",
            "psalm",
            "gospelAcclamation",
            "gospel",
            "reflection",
            "prayer",
            "artPrompt",
            "suggestedScenes",
          ],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    // Attach official source references
    data.sources = {
      dominicosUrl: scrapedSource?.dominicosUrl || "https://www.dominicos.org/predicacion/evangelio-del-dia/",
      ceeUrl: scrapedSource?.ceeUrl || "https://www.conferenciaepiscopal.es/liturgia-en-espanol/",
      sourceName: "Conferencia Episcopal Española (CEE) y Dominicos.org",
    };

    // Save to cache
    liturgyCache.set(dateStr, data);

    res.json({ success: true, data });
  } catch (error: any) {
    console.error("Error generating liturgy:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Error al obtener la liturgia diaria",
    });
  }
});

// Curated database of sacred master biblical paintings in 4:5 ratio matching major Gospel scenes
const BIBLICAL_MASTERWORK_FALLBACKS: Record<string, string> = {
  // Cafarnaun healing / Mt 9 / 20260702 reference
  healing: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&h=1350&q=85",
  // Emmaus Supper / Lc 24
  emmaus: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&h=1350&q=85",
  // Vineyard / Parables / Mt 20
  vineyard: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1080&h=1350&q=85",
  // Light / Transfiguration / Mount
  mountain: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1080&h=1350&q=85",
  // Default sacred oil painting
  default: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&h=1350&q=85"
};

/**
 * Endpoint: Generate 4:5 Sacred Art Image based on Gospel Scene
 */
app.post("/api/generate-image", async (req, res) => {
  const { prompt, gospelCitation, sceneTitle } = req.body;

  if (!prompt) {
    return res.status(400).json({ success: false, error: "Prompt is required" });
  }

  // Enhance prompt to strictly guarantee the exact master oil painting aesthetic of reference 20260702.png
  const fullStylePrompt = `${SACRED_ART_STYLE_ANCHOR}\n\nBiblical Narrative Scene: ${prompt}\n\nStrict visual requirements: Jesus in cream tunic with royal cobalt blue mantle, divine warm sunbeam streaming from high ceiling opening, deep emotional expressions of weeping and awe, chiaroscuro lighting, authentic first century Jerusalem/Galilee stone room, fine art oil on canvas masterpiece, 4:5 vertical framing.`;

  console.log("Generating image with prompt:", fullStylePrompt.substring(0, 140) + "...");

  // Try generation with gemini-3.1-flash-lite-image first, then gemini-3.1-flash-image
  const modelsToTry = ["gemini-3.1-flash-lite-image", "gemini-3.1-flash-image"];
  let base64Image = "";
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [{ text: fullStylePrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "3:4",
            imageSize: "1K",
          },
        },
      });

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            const mime = part.inlineData.mimeType || "image/png";
            base64Image = `data:${mime};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (base64Image) {
        console.log(`Image successfully generated with ${modelName}`);
        break;
      }
    } catch (err: any) {
      console.warn(`Model ${modelName} attempt failed:`, err?.message?.substring(0, 120));
      lastError = err;
      // If error is 429 quota or rate limit, continue to next or fallback
    }
  }

  if (base64Image) {
    return res.json({
      success: true,
      imageUrl: base64Image,
      prompt: fullStylePrompt,
      gospelCitation,
      sceneTitle,
      source: "gemini_ai",
    });
  }

  // Graceful fallback on Quota Exceeded (429) or free tier limits
  console.log("Using sacred masterwork artwork matching Gospel due to Gemini rate limit/quota");
  let fallbackUrl = BIBLICAL_MASTERWORK_FALLBACKS.default;
  const lowerPrompt = (prompt + " " + (gospelCitation || "") + " " + (sceneTitle || "")).toLowerCase();
  
  if (lowerPrompt.includes("emaús") || lowerPrompt.includes("pan") || lowerPrompt.includes("lucas 24")) {
    fallbackUrl = BIBLICAL_MASTERWORK_FALLBACKS.emmaus;
  } else if (lowerPrompt.includes("viña") || lowerPrompt.includes("campo") || lowerPrompt.includes("sembrador")) {
    fallbackUrl = BIBLICAL_MASTERWORK_FALLBACKS.vineyard;
  } else if (lowerPrompt.includes("sana") || lowerPrompt.includes("paralítico") || lowerPrompt.includes("cafarnaún")) {
    fallbackUrl = BIBLICAL_MASTERWORK_FALLBACKS.healing;
  } else if (lowerPrompt.includes("monte") || lowerPrompt.includes("transfiguración")) {
    fallbackUrl = BIBLICAL_MASTERWORK_FALLBACKS.mountain;
  }

  return res.json({
    success: true,
    imageUrl: fallbackUrl,
    prompt: fullStylePrompt,
    gospelCitation,
    sceneTitle,
    source: "sacred_masterwork_library",
    notice: "Se cargó la obra sacra de referencia en estilo óleo 4:5 debido al límite temporal de cuota de la IA de imágenes.",
  });
});

/**
 * Endpoint: Refine or Translate Sacred Art Prompt
 */
app.post("/api/refine-prompt", async (req, res) => {
  try {
    const { gospelText, keyVerse, customIdea } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `You are an art director specializing in Catholic sacred art and Renaissance/Baroque master paintings.
Based on this Gospel passage: "${gospelText}"
Key verse: "${keyVerse}"
User custom emphasis: "${customIdea || "Authentic biblical moment"}"

Write an exquisite English prompt for generating a vertical 4:5 classical biblical oil painting (style of Rembrandt, Caravaggio, Carl Bloch). Focus on:
1. The exact interaction between Jesus and the characters
2. The atmospheric chiaroscuro lighting and divine sunbeams
3. Facial expressions and gestures
4. First-century clothing colors and rustic architectural setting

Return only a JSON object with:
{
  "title": "Short descriptive Spanish title",
  "prompt": "Detailed English generation prompt",
  "focusVerse": "Relevant short verse"
}`,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, ...parsed });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Evangelio Diario Emaús API" });
});

// Start Server and Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ Evangelio Emaús Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
