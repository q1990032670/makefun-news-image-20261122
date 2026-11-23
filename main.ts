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

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL('./entry.png', import.meta.url), join(outDir, 'entry.png'));
