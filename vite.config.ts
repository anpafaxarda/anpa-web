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
      static: true,
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
      nitro: {
        preset: 'vercel',
        // Esto asegura que Nitro trate las rutas como "fetchables" para la SPA
        prerender: {
          crawlLinks: true,
          concurrency: 1
        }
      }
    }),
    tailwindcss()
  ]
}));
