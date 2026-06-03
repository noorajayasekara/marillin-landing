import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Källan bor i app/. Vite bygger till app/dist/ och npm-scriptet "build"
// kopierar sedan output till repo-roten, där GitHub Pages servar
// marillin.se från main. base '/' eftersom domänen servar från roten.
// CNAME, .nojekyll och favicon.svg ligger i app/public/ och följer med
// bygget ut till roten vid varje bygge.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
