// Hämtar typsnitten som egna WOFF2-filer (backlogg 42 i Marillin), så att
// sidan inte laddar något från Google när den visas.
//
// Frågan nedan är ordagrant den adress landningssidan hämtade från Google
// före backlogg 42. Skriptet hämtar Googles CSS för frågan med en
// Chrome-identitet, laddar ner varje WOFF2-fil som CSS:en pekar på och skriver
// CSS:en med adresserna omskrivna till filerna här. Unicode-intervall, vikter,
// stilar och font-display står kvar som Google skrev dem. Frågan speglas
// ordagrant, eftersom Google ger en annan fil för samma vikt beroende på vilka
// vikter frågan innehåller. Licensfilen (SIL Open Font License 1.1) läggs
// bredvid varje familj, eftersom licensen kräver att den följer med filerna.
//
// Körs för hand från app/ när frågan ändras, inte vid bygget:
//   node scripts/hamta-typsnitt.mjs
// Resultatet committas under app/public/fonts/ och följer med bygget till
// fonts/ i repots rot.

import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HAR = path.dirname(fileURLToPath(import.meta.url));
const UT = path.resolve(HAR, '..', 'public', 'fonts');

export const FRAGOR = [
  // index.html, hela landningssidan.
  { css: 'typsnitt.css',
    fraga: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap' },
];

const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
  + '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

async function hamta(url, binar = false) {
  const svar = await fetch(url, { headers: { 'User-Agent': CHROME } });
  if (!svar.ok) throw new Error(`${url}: ${svar.status}`);
  return binar ? Buffer.from(await svar.arrayBuffer()) : svar.text();
}

// Skriver om varje url(...) mot fonts.gstatic.com till familjens mapp, som
// Google själv namnger i sökvägen (/s/<familj>/<version>/<fil>), och
// returnerar CSS:en och listan med (adress, lokal sökväg).
export function skrivOm(css) {
  const filer = [];
  const ut = css.replace(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g, (_, adress) => {
    const delar = new URL(adress).pathname.split('/');
    const lokal = `${delar[2]}/${delar[delar.length - 1]}`;
    filer.push({ adress, lokal });
    return `url(./${lokal})`;
  });
  return { css: ut, filer };
}

async function main() {
  await rm(UT, { recursive: true, force: true });
  const familjer = new Set();
  for (const { css: namn, fraga } of FRAGOR) {
    const { css, filer } = skrivOm(await hamta(fraga));
    for (const { adress, lokal } of filer) {
      await mkdir(path.join(UT, path.dirname(lokal)), { recursive: true });
      await writeFile(path.join(UT, lokal), await hamta(adress, true));
      familjer.add(path.dirname(lokal));
    }
    const huvud = `/* Genererad av scripts/hamta-typsnitt.mjs ur ${fraga}\n   Redigeras inte för hand. Licenser: <familj>/OFL.txt */\n`;
    await writeFile(path.join(UT, namn), huvud + css);
    console.log(`${namn}: ${filer.length} ytor`);
  }
  for (const familj of familjer) {
    const licens = await hamta(`https://raw.githubusercontent.com/google/fonts/main/ofl/${familj}/OFL.txt`);
    await writeFile(path.join(UT, familj, 'OFL.txt'), licens);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
