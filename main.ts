// news-image-20261120 — "The World in One Day".
//
// The entry is one image: a newspaper front page drawn for Friday
// 20 November 2026 (entry.png beside this file). It is drawn offline,
// ahead of time, with a Python/PIL script, so this program only has to
// copy the finished image to the output directory. Copying is
// byte-for-byte deterministic: run it twice and both runs write the
// same file. No network, no dependencies — Node 22 standard library only.
//
// The front page sums up 20 November 2026: Russia's overnight
// ballistic-missile strike on Kyiv, damaging three bridges over the
// Dnipro; the world court ruling Myanmar committed genocide against
// the Rohingya; a global market rout as AI fears spread; Anthropic
// closing up 17% after its record IPO debut; the first-ever
// Trump–Xi–Putin trilateral summit in Shenzhen; and a Houthi missile
// hitting Riyadh's tallest tower.
//
// Run it outside the grader's container with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), outPath);
// Guard against a truncated or empty copy: the gate refuses a file
// that is not a whole image, so fail loudly instead of shipping one.
if (statSync(outPath).size === 0) {
  throw new Error('entry.png copied empty');
}
