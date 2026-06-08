import sharp from "sharp";
import fs from "fs";
import path from "path";

const PUBLIC = "./public";
let totalBefore = 0, totalAfter = 0;

function walk(dir) {
  return fs.readdirSync(dir).flatMap(f => {
    const p = path.join(dir, f);
    return fs.statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const images = walk(PUBLIC).filter(f => /\.(png|jpg|jpeg)$/i.test(f) && !f.endsWith(".webp"));

for (const file of images) {
  const sizeBefore = fs.statSync(file).size;
  totalBefore += sizeBefore;

  const out = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  try {
    await sharp(file)
      .webp({ quality: 82, effort: 6 })
      .toFile(out);
    const sizeAfter = fs.statSync(out).size;
    totalAfter += sizeAfter;
    const saved = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(0);
    console.log(`✓ ${path.basename(file)} → ${path.basename(out)}  ${(sizeBefore/1024).toFixed(0)}KB → ${(sizeAfter/1024).toFixed(0)}KB  (${saved}% smaller)`);
  } catch(e) {
    console.error(`✗ ${file}: ${e.message}`);
  }
}

console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB`);
