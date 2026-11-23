// News image entry for 22 November 2026 (Node 22, standard library only).
//
// The entry image is the entry.png beside this file: a newspaper front page
// summing up the day's world news (the COP31 climate talks collapsing in
// Antalya, the ICJ genocide ruling on Myanmar, Ukrainian sea drones striking
// a Russian warship off Libya, tankers hit near Hormuz, missiles on Kyiv and
// the cartel capture in Mexico). This program copies it to the output
// location the grader reads. Outside the grader's container,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');

try {
  // The grader's /output is writable but may not exist in every sandbox;
  // creating it recursively is a no-op when it already does.
  mkdirSync(outDir, { recursive: true });
  copyFileSync(src, dest);
  // copyFileSync preserves the source file's mode, and the bundled image
  // can be group-only; force the copy to be readable by anyone (0644) so
  // the grader can always open it.
  chmodSync(dest, 0o644);
  // A short write would hand the grader a truncated image and score 0;
  // catch that here instead of failing silently.
  const expected = statSync(src).size;
  const written = statSync(dest).size;
  if (written !== expected) {
    throw new Error(`copy incomplete: wrote ${written} of ${expected} bytes`);
  }
} catch (err) {
  console.error(`news-image: failed to write ${dest}: ${err.message}`);
  process.exit(1);
}
