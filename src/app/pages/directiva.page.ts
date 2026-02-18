import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectLoad } from '@analogjs/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { load } from './directiva.server';
import { Member } from '../domain/members/member.model';
import { PageComponent } from '../shared/components/page.component';

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [CommonModule, PageComponent],
  template: `
    <app-page-component
      [category]="'Nuestro equipo'"
      [title]="'La Junta Directiva'"
      [subTitle]="'Madres y padres voluntarios que dedicamos nuestro tiempo para mejorar el centro.'"
    >
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (miembro of directiva(); track miembro.name) {
            <div class="bg-white rounded-2xl border border-surface-100 shadow-sm p-5 flex flex-col sm:flex-row gap-5 hover:border-primary-200 hover:shadow-md transition-all duration-300">

              <div class="flex-shrink-0">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-primary-600/20">
                  {{ getInitials(miembro.name) }}
                </div>
              </div>

              <div class="flex-grow min-w-0">
                <div class="mb-3">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-primary-600 px-2 py-0.5 bg-primary-50 rounded-md">
                      {{ miembro.role }}
                    </span>
                  </div>
                  <h3 class="text-lg font-black text-surface-900 leading-tight">
                    {{ miembro.name }}
                  </h3>

                  @if (miembro.email) {
                    <a [href]="'mailto:' + miembro.email"
                       class="inline-flex items-center gap-1.5 mt-1.5 text-xs font-medium text-surface-500 hover:text-primary-600 transition-colors">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      {{ miembro.email }}
                    </a>
                  }
                </div>

                @if (miembro.bio) {
                  <p class="text-surface-600 text-sm leading-relaxed italic border-l-2 border-surface-100 pl-3">
                    {{ miembro.bio }}
                  </p>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </app-page-component>
  `,
})
export default class DirectivaPage {
  private readonly load$ = injectLoad<typeof load>();
  private readonly data = toSignal(this.load$, {
    initialValue: { directiva: [] as Member[] }
  });

  readonly directiva = computed(() => this.data()?.directiva ?? []);

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }
}
