import sharp from 'sharp';

const INPUT  = 'C:/Users/PC/.gemini/antigravity/brain/09844904-b067-4a57-854d-52f0d267081d/media__1775115905779.png';
const OUTPUT = 'C:/Users/PC/.gemini/antigravity/scratch/benak-hills-vitrine/public/logo_benak.png';

// Load image and get raw pixel data
const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

// Iterate over every pixel
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  
  // Make dark/black pixels fully transparent (background)
  // Keep golden pixels (high red channel, moderate green, low blue)
  if (r < 50 && g < 50 && b < 50) {
    data[i + 3] = 0; // fully transparent
  }
}

// Write back as PNG with transparency
await sharp(Buffer.from(data), {
  raw: { width, height, channels }
})
  .png()
  .toFile(OUTPUT);

console.log(`SUCCESS: Transparent logo saved! (${width}x${height})`);
