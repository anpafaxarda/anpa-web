/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  publicDir: 'public',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      prerender: {
        routes: [
          '/',
          '/asambleas',
          '/politica-cookies',
          '/beneficios',
          '/colaboradores',
          '/contacto',
          '/directiva',
          '/extraescolares',
          '/iniciativas',
          '/labor-anpa',
          '/aviso-legal',
          '/privacidad',
          '/bos-dias-tardes',
          '/bus-escolar',
        ],
        sitemap: {
          host: 'https://anpa-web.vercel.app'
        }
      },
    }),
    tailwindcss()
  ]
}));
