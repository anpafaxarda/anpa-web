import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectLoad } from '@analogjs/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { load } from './directiva.server';
import { Member } from '../domain/members/member.model';

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="bg-slate-50 pb-20">
      <section class="bg-slate-900 pt-32 pb-20 px-4">
        <div class="container mx-auto text-center">
          <span class="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Nuestro equipo
          </span>
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6">
            La Junta <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Directiva</span>
          </h1>
          <p class="text-slate-400 max-w-2xl mx-auto text-lg">
            Madres y padres voluntarios que dedicamos nuestro tiempo para que el
            <strong>CEIP Gregorio Sanz</strong> sea un lugar mejor para nuestros hijos.
          </p>
        </div>
      </section>

      @if (directiva().length > 0) {
        <section class="container mx-auto px-4 -mt-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (miembro of directiva(); track miembro.name) {
              <div class="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden hover:-translate-y-2 transition-all duration-300 group">
                <div class="relative h-64 overflow-hidden bg-slate-200">
                  @if (miembro.image) {
                    <img [src]="miembro.image" [alt]="miembro.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                  } @else {
                    <div class="w-full h-full flex items-center justify-center bg-blue-50">
                      <svg class="w-20 h-20 text-blue-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                  }
                  <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900/80 to-transparent">
                    <span class="text-blue-400 text-xs font-bold uppercase tracking-widest">{{ miembro.role }}</span>
                    <h3 class="text-xl font-bold text-white">{{ miembro.name }}</h3>
                  </div>
                </div>

                <div class="p-6">
                  @if(miembro?.bio?.length && miembro.bio.length > 0) {
                    <p class="text-slate-600 text-sm leading-relaxed italic">
                      "{{ miembro.bio }}"
                    </p>
                  }
                  <div class="mt-6 pt-6 border-t border-slate-50 flex items-center gap-2 text-blue-600 font-semibold text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Miembro de la directiva
                  </div>
                </div>
              </div>
            }
          </div>
        </section>
      }
    </main>
  `,
})
export default class DirectivaPage {
  private readonly load$ = injectLoad<typeof load>();
  private readonly data = toSignal(this.load$, {
    initialValue: { directiva: [] as Member[] }
  });

  readonly directiva = computed(() => this.data()?.directiva ?? []);

    constructor() {
    effect(() => {
      console.debug('directiva.length', this.directiva.length);
      console.debug('Directiva data:', this.data());
    });
  }
}
