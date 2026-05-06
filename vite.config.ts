/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { fetchActividades, fetchCursosDisponibles } from './src/app/domain/actividade/actividade.action';

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
        routes: async () => {
          const [actividades, cursos] = await Promise.all([
            fetchActividades(),
            fetchCursosDisponibles()
          ]);
          const slugs = actividades.map(a => `/actividade/curso/${a.curso}/${a.slug}`);

          return [
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
            '/actividade',
            '/sitemap.xml',
            ...cursos.map(c => `/actividade/curso/${c}`),
            ...slugs
          ]
        },
        sitemap: {
          host: 'https://anpafaxarda.org',
        }
      },
      nitro: {
        preset: 'vercel',
        prerender: {
          crawlLinks: true,
          concurrency: 1
        }
      }
    }),
    tailwindcss()
  ]
}));

