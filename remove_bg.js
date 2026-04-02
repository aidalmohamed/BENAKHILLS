const Jimp = require('jimp');
const path = require('path');

const INPUT  = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\09844904-b067-4a57-854d-52f0d267081d\\media__1775115905779.png';
const OUTPUT = 'C:\\Users\\PC\\.gemini\\antigravity\\scratch\\benak-hills-vitrine\\public\\logo_benak.png';

Jimp.read(INPUT).then(img => {
  img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    // Remove dark/black pixels (background), keep golden pixels
    if (r < 60 && g < 60 && b < 60) {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  return img.writeAsync(OUTPUT);
}).then(() => {
  console.log('SUCCESS: Transparent logo saved!');
}).catch(err => {
  console.error('Error:', err.message);
});
