/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'public',
  build: {
    target: ['es2020'],
  },
  resolve: {},
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
          '/xunta-directiva',
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
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));
