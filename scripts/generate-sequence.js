const fs = require('fs');
const path = require('path');

const sequenceDir = path.join(__dirname, '..', 'public', 'sequence');
const baseImage = path.join(sequenceDir, 'base.jpg');

// cek base.jpg
if (!fs.existsSync(baseImage)) {
  console.error('❌ base.jpg tidak ditemukan di:', baseImage);
  process.exit(1);
}

// generate 240 jpg frame
for (let i = 1; i <= 240; i++) {
  const index = i.toString().padStart(3, '0');
  const target = path.join(sequenceDir, `ezgif-frame-${index}.jpg`);
  fs.copyFileSync(baseImage, target);
}

console.log('✅ 240 JPG frames berhasil dibuat');
