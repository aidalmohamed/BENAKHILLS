import sharp from 'sharp';

const INPUT  = 'C:/Users/PC/.gemini/antigravity/brain/09844904-b067-4a57-854d-52f0d267081d/media__1775140087732.png';
const OUTPUT = 'C:/Users/PC/.gemini/antigravity/scratch/benak-hills-vitrine/public/logo_benak.png';

async function processLogo() {
  console.log("Removing background from the new logo...");
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // The background in the attached image is dark grey/black.
    // The text 'BENAK' is white, 'HILLS' is gold, and the building is gold.
    // Let's remove pixels where all RGB values are below 50.
    if (r < 50 && g < 50 && b < 50) {
      data[i + 3] = 0; // set alpha to 0 (transparent)
    }
  }

  // To make it larger and redimensioned, we'll resize it before saving.
  // The original might be small. Let's scale it to height 400px, 
  // keeping the aspect ratio intact and using high quality interpolation.
  await sharp(Buffer.from(data), { raw: { width, height, channels } })
    .resize({ height: 400, fit: 'inside' })
    .png()
    .toFile(OUTPUT);

  console.log(`SUCCESS: Logo saved to public/logo_benak.png`);
}

processLogo().catch(console.error);
