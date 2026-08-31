import { WatermarkSettings } from '../types';

// Embedded vector string of the Emaús logo matching uploaded LOGO EMAUS.png exactly
export const EMAUS_LOGO_SVG_STRING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 650" width="600" height="650">
  <defs>
    <filter id="logoShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <g filter="url(#logoShadow)">
    <!-- EMAÚS Inscription -->
    <g id="text-emaus" fill="#1b120c" stroke="#1b120c">
      <path d="M 175 145 L 182 110 L 210 102 L 208 112 L 192 117 L 190 126 L 204 123 L 202 133 L 188 135 L 185 147 L 204 143 L 202 153 Z" stroke-width="1.5" stroke-linejoin="round" />
      <path d="M 218 100 L 230 75 L 243 92 L 255 70 L 268 95 L 258 97 L 250 82 L 241 99 L 234 85 L 227 101 Z" stroke-width="1.5" stroke-linejoin="round" />
      <path d="M 275 66 L 290 48 L 305 64 L 297 66 L 294 60 L 285 62 L 282 68 Z M 287 56 L 292 55 L 289 50 Z" stroke-width="1.5" stroke-linejoin="round" />
      <path d="M 305 32 L 311 26 L 315 31 L 309 37 Z M 310 63 L 315 45 L 324 45 L 321 57 C 322 61 328 62 331 58 L 334 46 L 343 47 L 338 60 C 333 69 321 70 315 65 Z" stroke-width="1.5" stroke-linejoin="round" />
      <path d="M 360 48 C 354 44 345 46 345 52 C 345 59 362 58 360 69 C 358 76 348 78 340 73 L 343 64 C 347 67 353 67 353 63 C 353 57 337 57 338 48 C 339 40 351 37 361 41 Z" stroke-width="1.5" stroke-linejoin="round" />
    </g>
    <!-- Curved Rustic Wooden Cross -->
    <g id="wooden-cross">
      <path d="M 235 158 C 220 152 205 152 145 235 C 130 258 135 292 165 305 C 225 265 248 245 272 238 L 275 510 C 275 538 315 545 335 525 C 342 460 340 350 338 238 C 365 240 405 252 445 278 C 475 292 485 258 472 235 C 415 190 372 188 340 190 L 338 105 C 338 78 310 70 295 90 C 285 105 272 135 270 162 Z" fill="#a66a3d" stroke="#261309" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" />
      <path d="M 292 95 C 285 140 282 250 285 515" stroke="#4a2411" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 312 90 C 315 150 318 350 312 520" stroke="#78421c" stroke-width="4.5" fill="none" stroke-linecap="round" />
      <path d="M 326 100 C 330 180 332 380 326 510" stroke="#4a2411" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M 288 120 C 300 135 320 130 330 115" stroke="#5c2e15" stroke-width="2.5" fill="none" />
      <path d="M 285 320 C 302 335 320 330 330 315" stroke="#5c2e15" stroke-width="2.5" fill="none" />
      <path d="M 282 430 C 300 450 320 445 332 425" stroke="#5c2e15" stroke-width="2.5" fill="none" />
      <path d="M 160 255 C 215 225 385 210 460 248" stroke="#4a2411" stroke-width="3.5" fill="none" stroke-linecap="round" />
      <path d="M 155 272 C 220 240 375 225 455 262" stroke="#78421c" stroke-width="4" fill="none" stroke-linecap="round" />
      <path d="M 168 288 C 225 258 360 240 445 275" stroke="#4a2411" stroke-width="3" fill="none" stroke-linecap="round" />
      <path d="M 148 240 C 138 265 148 290 162 300" stroke="#261309" stroke-width="5" fill="none" />
      <path d="M 450 275 C 470 265 470 240 455 230" stroke="#261309" stroke-width="5" fill="none" />
      <path d="M 292 90 C 310 80 332 88 335 100" stroke="#261309" stroke-width="5" fill="none" />
      <path d="M 280 515 C 300 535 325 530 332 518" stroke="#261309" stroke-width="5" fill="none" />
    </g>
    <!-- Rose System -->
    <g id="rose-stem-system">
      <path d="M 305 320 C 308 380 300 440 312 515 C 316 538 322 560 326 575" fill="none" stroke="#4b7027" stroke-width="11" stroke-linecap="round" />
      <path d="M 305 320 C 308 380 300 440 312 515 C 316 538 322 560 326 575" fill="none" stroke="#1c300c" stroke-width="14" stroke-linecap="round" opacity="0.35" />
      <path d="M 308 385 L 320 392 L 310 398 Z" fill="#38541c" stroke="#182c09" stroke-width="2" />
      <path d="M 303 445 L 291 452 L 302 458 Z" fill="#38541c" stroke="#182c09" stroke-width="2" />
      <path d="M 314 495 L 326 502 L 316 508 Z" fill="#38541c" stroke="#182c09" stroke-width="2" />
      <path d="M 322 550 L 333 555 L 324 560 Z" fill="#38541c" stroke="#182c09" stroke-width="2" />
      <g id="leaves-left">
        <path d="M 306 410 C 265 425 240 405 210 395" fill="none" stroke="#3d5e1e" stroke-width="6" stroke-linecap="round" />
        <path d="M 215 395 C 170 350 145 400 178 442 C 212 455 228 422 215 395 Z" fill="#7ea74f" stroke="#1b300b" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M 212 400 C 185 415 170 435 168 440" stroke="#365718" stroke-width="3" fill="none" />
        <path d="M 230 420 C 215 470 258 495 280 460 C 285 430 255 408 230 420 Z" fill="#6a913f" stroke="#1b300b" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M 235 423 C 248 450 268 468 274 465" stroke="#2d4a13" stroke-width="2.5" fill="none" />
        <path d="M 265 375 C 235 350 220 380 242 400 C 260 405 272 390 265 375 Z" fill="#8db55b" stroke="#1b300b" stroke-width="3.5" />
      </g>
      <g id="leaves-right">
        <path d="M 306 375 C 345 358 375 370 410 385" fill="none" stroke="#3d5e1e" stroke-width="5" stroke-linecap="round" />
        <path d="M 408 385 C 445 350 460 395 430 428 C 405 435 390 410 408 385 Z" fill="#7ea74f" stroke="#1b300b" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M 408 388 C 428 405 438 420 440 425" stroke="#365718" stroke-width="2.5" fill="none" />
        <path d="M 370 380 C 388 345 422 360 405 395 C 388 405 372 395 370 380 Z" fill="#6a913f" stroke="#1b300b" stroke-width="4" />
      </g>
      <path d="M 252 285 C 228 270 235 240 265 255 C 275 262 262 288 252 285 Z" fill="#6a913f" stroke="#1b300b" stroke-width="3.5" />
      <path d="M 355 285 C 380 270 372 240 342 255 C 332 262 345 288 355 285 Z" fill="#6a913f" stroke="#1b300b" stroke-width="3.5" />
      <path d="M 292 295 C 282 320 322 325 325 295 Z" fill="#577a32" stroke="#1b300b" stroke-width="3.5" />
    </g>
    <!-- Blooming Rose -->
    <g id="blooming-rose">
      <path d="M 245 210 C 215 245 245 305 305 305 C 365 305 395 245 365 210 C 345 185 265 185 245 210 Z" fill="#a11b20" stroke="#3b080a" stroke-width="5" stroke-linejoin="round" />
      <path d="M 235 220 C 220 262 265 292 305 290 C 265 280 245 250 252 225 Z" fill="#be2429" stroke="#4a0a0d" stroke-width="3.5" />
      <path d="M 375 220 C 390 262 345 292 305 290 C 345 280 365 250 358 225 Z" fill="#be2429" stroke="#4a0a0d" stroke-width="3.5" />
      <path d="M 258 198 C 250 245 330 275 348 225 C 355 198 325 185 305 190 C 285 185 265 185 258 198 Z" fill="#d63035" stroke="#4a0a0d" stroke-width="4.5" />
      <path d="M 270 205 C 270 240 325 255 335 220 C 335 200 312 200 302 210 C 292 200 275 200 270 205 Z" fill="#e24449" stroke="#4a0a0d" stroke-width="4" />
      <path d="M 285 195 C 285 178 322 178 322 195 C 322 218 292 230 290 208 C 290 198 312 192 308 205" fill="#b81f24" stroke="#4a0a0d" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 295 182 C 305 175 315 182 305 190 Z" fill="#f26166" stroke="#4a0a0d" stroke-width="2.5" />
      <path d="M 260 215 C 290 192 328 210 328 210" fill="none" stroke="#ff8f92" stroke-width="2.5" opacity="0.75" stroke-linecap="round" />
      <path d="M 272 250 C 302 275 335 250 335 250" fill="none" stroke="#ff8f92" stroke-width="3" opacity="0.65" stroke-linecap="round" />
      <path d="M 252 235 C 238 260 270 280 270 280" fill="none" stroke="#ff7377" stroke-width="2" opacity="0.6" stroke-linecap="round" />
    </g>
  </g>
</svg>`;

export const DEFAULT_WATERMARK_SETTINGS: WatermarkSettings = {
  showLogo: true,
  position: 'bottom-right',
  sizePercent: 18,
  opacity: 0.95,
  includeVerseBanner: false,
  bannerStyle: 'minimal',
  customParishText: ''
};

/**
 * Loads an image from a URL or Base64 string
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error('Failed to load image: ' + e));
    img.src = src;
  });
}

/**
 * Loads the exact original Emaús logo PNG image or user-provided file
 */
function loadLogoImage(customUrl?: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    // 1. If user provided a custom uploaded logo data URL, use it directly
    if (customUrl) {
      const customImg = new Image();
      customImg.crossOrigin = 'anonymous';
      customImg.onload = () => resolve(customImg);
      customImg.onerror = () => {
        // Fallback to default
        loadLogoImage().then(resolve).catch(reject);
      };
      customImg.src = customUrl;
      return;
    }

    // 2. Try loading the exact PNG file directly
    const pngImg = new Image();
    pngImg.crossOrigin = 'anonymous';
    pngImg.onload = () => resolve(pngImg);
    pngImg.onerror = () => {
      // 3. Fallback to vector blob if file loading fails
      const blob = new Blob([EMAUS_LOGO_SVG_STRING], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const svgImg = new Image();
      svgImg.onload = () => {
        URL.revokeObjectURL(url);
        resolve(svgImg);
      };
      svgImg.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };
      svgImg.src = url;
    };
    pngImg.src = '/logo-emaus.png';
  });
}

/**
 * Composites the biblical image with the EMAÚS logo in the bottom right corner (or custom position)
 * Ensures 4:5 aspect ratio output with crisp details and optional verse text.
 */
export async function compositeEmausArtwork(
  imageSource: string,
  settings: WatermarkSettings = DEFAULT_WATERMARK_SETTINGS,
  verseInfo?: { citation?: string; text?: string; date?: string }
): Promise<string> {
  const baseImg = await loadImage(imageSource);
  const logoImg = settings.showLogo ? await loadLogoImage(settings.customLogoUrl) : null;

  // Determine target canvas dimensions (Standard 4:5 ratio: 1080 x 1350 for HD social/print)
  let targetWidth = 1080;
  let targetHeight = 1350;

  // If source image is high-res, preserve dimensions while ensuring 4:5
  if (baseImg.width >= 1000) {
    targetWidth = baseImg.width;
    targetHeight = Math.round((targetWidth * 5) / 4);
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Fill dark sacred background
  ctx.fillStyle = '#140e0a';
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // Draw base image centered / cropped to 4:5
  const srcAspect = baseImg.width / baseImg.height;
  const targetAspect = 4 / 5;

  let drawW = targetWidth;
  let drawH = targetHeight;
  let drawX = 0;
  let drawY = 0;

  if (srcAspect > targetAspect) {
    // Source is wider than 4:5 -> crop sides
    drawW = targetHeight * srcAspect;
    drawX = (targetWidth - drawW) / 2;
  } else {
    // Source is taller than 4:5 -> crop top/bottom
    drawH = targetWidth / srcAspect;
    drawY = (targetHeight - drawH) / 2;
  }

  ctx.drawImage(baseImg, drawX, drawY, drawW, drawH);

  // Optional: subtle vignette effect to enhance the sacred oil painting look
  const vignette = ctx.createRadialGradient(
    targetWidth / 2,
    targetHeight * 0.45,
    targetWidth * 0.2,
    targetWidth / 2,
    targetHeight * 0.5,
    targetWidth * 0.85
  );
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(0.7, 'rgba(15,8,4,0.15)');
  vignette.addColorStop(1, 'rgba(10,5,2,0.45)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  // Optional: Verse Banner overlay at bottom
  if (settings.includeVerseBanner && verseInfo?.text) {
    const bannerH = targetHeight * 0.16;
    const bannerY = targetHeight - bannerH;

    // Dark parchment / amber gradient banner
    const bannerGrad = ctx.createLinearGradient(0, bannerY, 0, targetHeight);
    bannerGrad.addColorStop(0, 'rgba(18, 10, 5, 0.88)');
    bannerGrad.addColorStop(1, 'rgba(8, 4, 2, 0.96)');
    ctx.fillStyle = bannerGrad;
    ctx.fillRect(0, bannerY, targetWidth, bannerH);

    // Gold trim line
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40, bannerY);
    ctx.lineTo(targetWidth - 40, bannerY);
    ctx.stroke();

    // Verse Citation
    ctx.fillStyle = '#e8c872';
    ctx.font = `600 ${Math.round(targetWidth * 0.024)}px 'Cinzel', 'Georgia', serif`;
    ctx.textAlign = 'left';
    ctx.fillText((verseInfo.citation || 'Evangelio del Día').toUpperCase(), 50, bannerY + 36);

    if (verseInfo.date) {
      ctx.fillStyle = 'rgba(235, 220, 190, 0.65)';
      ctx.font = `400 ${Math.round(targetWidth * 0.018)}px 'Georgia', serif`;
      ctx.textAlign = 'right';
      ctx.fillText(verseInfo.date, targetWidth - (settings.showLogo ? targetWidth * 0.25 : 50), bannerY + 36);
    }

    // Verse body quote
    ctx.fillStyle = '#f8f4eb';
    ctx.font = `italic 500 ${Math.round(targetWidth * 0.022)}px 'Georgia', serif`;
    ctx.textAlign = 'left';
    
    // Simple text wrapping for banner
    const quoteMaxWidth = targetWidth - (settings.showLogo ? targetWidth * 0.28 : 100);
    const words = verseInfo.text.replace(/^["«]|["»]$/g, '').split(' ');
    let line = '';
    let lineY = bannerY + 72;
    const lineHeight = Math.round(targetWidth * 0.03);

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > quoteMaxWidth && n > 0) {
        ctx.fillText(`«${line.trim()}»`, 50, lineY);
        line = words[n] + ' ';
        lineY += lineHeight;
        if (lineY > targetHeight - 20) break;
      } else {
        line = testLine;
      }
    }
    if (line.trim() && lineY <= targetHeight - 20) {
      ctx.fillText(`«${line.trim()}»`, 50, lineY);
    }
  }

  // Draw EMAÚS Logo in the Bottom-Right Corner (or configured position)
  if (logoImg && settings.showLogo) {
    const logoScaleFactor = (settings.sizePercent || 18) / 100;
    const logoW = targetWidth * logoScaleFactor;
    // Aspect ratio of logo SVG is 500:550 -> height is 1.1x width
    const logoH = logoW * 1.1;

    const marginX = targetWidth * 0.035;
    const marginY = targetHeight * 0.035;

    let logoX = targetWidth - logoW - marginX;
    let logoY = targetHeight - logoH - marginY;

    if (settings.position === 'bottom-left') {
      logoX = marginX;
      logoY = targetHeight - logoH - marginY;
    } else if (settings.position === 'top-right') {
      logoX = targetWidth - logoW - marginX;
      logoY = marginY;
    } else if (settings.position === 'top-left') {
      logoX = marginX;
      logoY = marginY;
    }

    ctx.save();
    ctx.globalAlpha = Math.max(0.1, Math.min(1.0, settings.opacity ?? 0.95));

    // Gentle soft drop shadow to make the wooden cross pop from any dark/light background
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 4;

    ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
    ctx.restore();

    // Optional custom parish or community subtitle under logo
    if (settings.customParishText) {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = `600 ${Math.round(targetWidth * 0.016)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 6;
      ctx.fillText(settings.customParishText, logoX + logoW / 2, logoY + logoH + 16);
      ctx.restore();
    }
  }

  return canvas.toDataURL('image/jpeg', 0.95);
}

/**
 * Triggers a direct download of the image file
 */
export function downloadImage(dataUrl: string, filename: string = 'evangelio-emaus.jpg') {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
