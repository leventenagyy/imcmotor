/**
 * Optimize product master photos → responsive WebP.
 *
 * Input : public/images/products/<handle>/<handle>-NN.(jpg|jpeg|png)   (masters)
 * Output: <handle>-NN-<w>.webp (responsive) + <handle>-NN.webp (fallback)
 *
 * White-studio shots are placed onto a clean canvas at the product's aspect
 * ratio (4:5 bikes, 1:1 accessories) with `fit: contain` + white background,
 * so the whole bike shows (no wheel-clipping) and the look stays consistent.
 *
 * Run:  node scripts/optimize-images.mjs
 * Masters can be committed under /assets-source or deleted after; only the
 * .webp outputs are needed by the site.
 */
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const ROOT = 'public/images/products'

// Accessories render square; everything else is 4:5 portrait.
const SQUARE = new Set([
  'integralt-bukosisak-premium',
  'motoros-kesztyu-touring',
  'mistral-kipufogo-v7',
])
const WIDTHS_PORTRAIT = [640, 1024, 1600]
const WIDTHS_SQUARE = [480, 960, 1280]
const MASTER_RE = /-\d{2}\.(jpe?g|png)$/i

let count = 0
let folders
try {
  folders = await readdir(ROOT, { withFileTypes: true })
} catch {
  console.error(`No ${ROOT} directory yet — add master photos first.`)
  process.exit(1)
}

for (const entry of folders) {
  if (!entry.isDirectory()) continue
  const handle = entry.name
  const dir = path.join(ROOT, handle)
  const square = SQUARE.has(handle)
  const [rw, rh] = square ? [1, 1] : [4, 5]
  const widths = square ? WIDTHS_SQUARE : WIDTHS_PORTRAIT

  for (const file of await readdir(dir)) {
    if (!MASTER_RE.test(file)) continue
    const stem = path.join(dir, file.replace(/\.[^.]+$/, ''))
    const src = path.join(dir, file)

    const render = (w) =>
      sharp(src)
        .resize({
          width: w,
          height: Math.round((w * rh) / rw),
          fit: 'contain',
          background: '#ffffff',
          withoutEnlargement: true, // never upscale a low-res master into blur
        })
        .webp({ quality: 82 })

    for (const w of widths) {
      await render(w).toFile(`${stem}-${w}.webp`)
    }
    // Fallback = largest width.
    await render(widths[widths.length - 1]).toFile(`${stem}.webp`)
    count++
    console.log(`✓ ${handle}/${file}`)
  }
}

console.log(`\nDone — optimized ${count} master(s).`)
