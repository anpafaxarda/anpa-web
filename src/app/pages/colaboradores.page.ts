import { injectLoad } from '@analogjs/router';
import { CommonModule } from '@angular/common';
import { Component, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Colaborador } from '../domain/colaboradores/colaborador.model';
import { load } from './colaboradores.server';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="min-h-screen bg-surface-50 pb-20">
      <section class="bg-surface-900 pt-32 pb-20 px-4">
        <div class="container mx-auto text-center">
          <span class="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full border border-primary-400/20">
            Ventajas para socios
          </span>
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Comercios <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Colaboradores</span>
          </h1>
          <p class="text-surface-400 max-w-2xl mx-auto text-lg">
            Presenta tu carnet de socio del ANPA A Faxarda y disfruta de estos beneficios en Ribadeo.
          </p>
        </div>
      </section>

      <section class="container mx-auto px-4 -mt-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (item of colaboradores(); track item.name) {
            <div class="bg-white rounded-2xl shadow-xl shadow-surface-200/60 border border-surface-100 overflow-hidden flex flex-col group">

              <div class="relative h-48 bg-surface-100 flex items-center justify-center p-6">
                @if (item.imageUrl) {
                  <img [src]="item.imageUrl" [alt]="item.name" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500">
                } @else {
                  <div class="text-surface-300 text-4xl font-bold uppercase">{{ item.name.substring(0,2) }}</div>
                }

                <div class="absolute -bottom-4 right-6 bg-primary-600 text-white px-4 py-2 rounded-lg font-black shadow-lg shadow-primary-600/30 transform group-hover:-translate-y-1 transition-transform">
                  {{ item.discount }}
                </div>
              </div>

              <div class="p-8 pt-10 flex-grow flex flex-col">
                <h3 class="text-xl font-bold text-surface-900 mb-2">{{ item.name }}</h3>
                <p class="text-surface-600 text-sm mb-4 flex-grow">{{ item.description }}</p>

                @if (item.discountCondition) {
                  <div class="bg-surface-50 border-l-4 border-primary-400 p-3 mb-6">
                    <p class="text-[10px] uppercase tracking-wider font-bold text-surface-500 mb-1">Condición:</p>
                    <p class="text-xs text-surface-700 italic">{{ item.discountCondition }}</p>
                  </div>
                }

                <div class="pt-4 border-t border-surface-50 flex items-center justify-between">
                  <div class="flex gap-4">
                    @if (item.addressUrl) {
                      <a [href]="item.addressUrl" target="_blank" class="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-bold text-sm transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Mapa
                      </a>
                    }

                    @if (item.webSite) {
                      <a [href]="item.webSite" target="_blank" class="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-bold text-sm transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18"/></svg>
                        Web
                      </a>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </main>
  `,
})
export default class ColaboradoresPage {
  title = 'Locales colaboradores'

  private readonly load$ = injectLoad<typeof load>();
  private readonly data = toSignal(this.load$, {
    initialValue: { colaboradores: [] as Colaborador[] }
  });

  readonly colaboradores = computed(() => this.data()?.colaboradores ?? []);

    constructor() {
    effect(() => {
      console.debug('directiva.length', this.colaboradores.length);
      console.debug('Directiva data:', this.data());
    });
  }
}
