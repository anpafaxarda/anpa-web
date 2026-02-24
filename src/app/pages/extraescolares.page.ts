import { Component, computed, inject, signal, ChangeDetectorRef } from '@angular/core';
import { PortableTextPipe } from '../shared/pipes/portable-text.pipe';
import { CommonModule } from '@angular/common';
import { Actividad } from '../domain/extraescolares/extraescolares.model';
import { PageComponent } from '../shared/components/page.component';
import { fetchExtraescolares } from '../domain/extraescolares/extraescolares.action';
import { ActivatedRoute, ResolveFn } from '@angular/router';

export const extraescolaresResolver: ResolveFn<any> = () => {
  return fetchExtraescolares();
}

export const routeMeta = {
  resolve: {
    extraescolaresData: extraescolaresResolver
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, PortableTextPipe, PageComponent],
  template: `
    <app-page-component
        [category]="'Labor do ANPA'"
        [title]="'Actividades Extraescolares'"
        [subTitle]="'Organizadas polo ANPA A Faxarda en colaboración co colexio CEIP Gregorio Sanz.'"
    >

      <div class="flex justify-center mb-10">
        <div class="inline-flex p-1 bg-surface-100 rounded-2xl shadow-inner relative">
          <button (click)="view.set('cards')"
            [class]="view() === 'cards' ? 'bg-white shadow-md text-primary-700' : 'text-surface-500 hover:text-surface-700'"
            class="relative z-10 px-8 py-2.5 rounded-xl text-sm font-black transition-all duration-300 flex items-center gap-2 cursor-pointer">
            <span>🎴</span> Lista
          </button>
          <button (click)="view.set('calendar')"
            [class]="view() === 'calendar' ? 'bg-white shadow-md text-primary-700' : 'text-surface-500 hover:text-surface-700'"
            class="relative z-10 px-8 py-2.5 rounded-xl text-sm font-black transition-all duration-300 flex items-center gap-2 cursor-pointer">
            <span>📅</span> Horario
          </button>
        </div>
      </div>

      <div class="relative min-h-[600px]">

        @if (view() === 'cards') {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-in-left">
            @for (actividad of actividades(); track actividad.name) {
              <div class="bg-white rounded-[2.5rem] shadow-xl border border-surface-100 overflow-hidden flex flex-col md:flex-row group transition-all duration-500 hover:border-primary-200">
                <div class="md:w-1/3 relative h-56 md:h-auto bg-surface-100 overflow-hidden">
                  @if (actividad.imageUrl) {
                    <img [src]="actividad.imageUrl" [alt]="actividad.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                  }
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  <div class="absolute bottom-4 left-5 right-0 text-white pr-5">
                    <div class="text-[10px] font-black uppercase tracking-widest opacity-80">Duración</div>
                    <div class="text-sm font-bold leading-tight break-words">
                      {{ actividad.classDuration }}
                    </div>
                  </div>
                </div>

                <div class="md:w-2/3 p-8 flex flex-col">
                  <h3 class="text-2xl font-black text-surface-900 mb-4 leading-tight">{{ actividad.name }}</h3>
                  <div class="relative mb-6">
                    <div #textContainer
                         class="portable-text text-surface-600 text-sm transition-all duration-500 ease-in-out"
                         [class.line-clamp-3]="!expandedCards[actividad.name]">
                      <div [innerHTML]="actividad.description | portableText"></div>
                    </div>
                    @if (expandedCards[actividad.name] || (textContainer.scrollHeight > textContainer.clientHeight)) {
                      <button (click)="toggleCard(actividad.name)"
                              class="text-primary-600 text-[11px] font-black uppercase tracking-widest mt-2 hover:text-primary-800 transition-colors cursor-pointer">
                        {{ expandedCards[actividad.name] ? 'Ler menos ↑' : 'Ler máis ↓' }}
                      </button>
                    }
                  </div>

                  <div class="mt-auto pt-6 border-t border-surface-100 flex flex-wrap gap-y-6">
                    <div class="w-full sm:w-1/2 flex flex-col justify-end pr-2">
                      <span class="text-[10px] font-black text-surface-400 uppercase tracking-widest mb-1">P. Ordinario</span>
                      <span class="text-base font-bold text-surface-700 leading-tight">{{ actividad.price }}</span>
                    </div>

                    @if (actividad.memberPrice) {
                      <div class="w-full sm:w-1/2 flex flex-col border-t sm:border-t-0 sm:border-l border-surface-100 pt-8 sm:pt-0 sm:pl-4 relative">
                        @if (actividad.discountTag) {
                          <div class="absolute sm:-top-5 right-0 sm:-right-2 rotate-12 z-20">
                            <span class="bg-primary-500 text-[10px] text-white px-2.5 py-1 rounded-lg font-black uppercase shadow-xl border border-white/20 whitespace-nowrap">
                              {{ actividad.discountTag }}
                            </span>
                          </div>
                        }
                        <span class="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                          P. Socios <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                        </span>
                        <span class="text-xl lg:text-2xl font-black text-primary-600 tracking-tighter leading-none break-words">{{ actividad.memberPrice }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }

        @if (view() === 'calendar') {
          <div class="animate-slide-in-right">
            <div class="lg:hidden space-y-8 px-2">
              @for (dia of dias; track dia) {
                <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 class="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary-600 mb-4">
                    <span class="h-px flex-grow bg-primary-100"></span>
                    {{ dia }}
                    <span class="h-px flex-grow bg-primary-100"></span>
                  </h3>
                  <div class="grid gap-3">
                    @for (act of getActividadesOrdenadas(dia); track act.name) {
                      <div class="bg-white p-4 rounded-[2rem] border border-surface-100 shadow-sm flex items-center gap-4">
                        <div class="flex-shrink-0 text-center py-2 px-3 rounded-2xl border-2 min-w-[90px]"
                             [style.backgroundColor]="colorMap()[act.name].bg"
                             [style.borderColor]="colorMap()[act.name].border">
                          <p class="text-[8px] font-black uppercase leading-none opacity-70" [style.color]="colorMap()[act.name].text">Horario</p>
                          <p class="text-xs font-black mt-1 whitespace-nowrap" [style.color]="colorMap()[act.name].text">
                            {{ act.horaInicio }} - {{ act.horaFin }}
                          </p>
                        </div>
                        <div class="flex-grow">
                          <h4 class="text-base font-bold text-surface-900 leading-tight">{{ act.name }}</h4>
                          <div class="flex flex-wrap gap-x-3 mt-1">
                             <p class="text-[9px] text-surface-400 font-bold uppercase">Ord: {{ act.price }}</p>
                             <p class="text-[9px] text-primary-600 font-black uppercase">Socio: {{ act.memberPrice }}</p>
                          </div>
                        </div>
                      </div>
                    }
                    @if (getActividadesOrdenadas(dia).length === 0) {
                        <p class="text-center text-xs text-surface-400 italic py-2">Non hai actividades este día</p>
                    }
                  </div>
                </div>
              }
            </div>

            <div class="hidden lg:block bg-white rounded-[2.5rem] shadow-2xl border border-surface-100 overflow-hidden">
              <div class="grid grid-cols-5 divide-x divide-surface-100">
                @for (dia of dias; track dia) {
                  <div class="flex flex-col min-h-[500px]">
                    <div class="bg-surface-50/50 p-6 text-center border-b border-surface-100">
                      <span class="text-sm font-black uppercase tracking-[0.2em] text-surface-900">{{ dia }}</span>
                    </div>

                    <div class="p-4 space-y-4 flex-grow bg-grid-lines-vertical">
                      @for (act of getActividadesOrdenadas(dia); track act.name) {
                        <div class="rounded-2xl p-4 border-l-[6px] shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
                            [style.backgroundColor]="colorMap()[act.name].bg"
                            [style.borderColor]="colorMap()[act.name].border">
                          <div class="flex justify-between items-start mb-2">
                            <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/50" [style.color]="colorMap()[act.name].text">
                              {{ act.horaInicio }} - {{ act.horaFin }}
                            </span>
                          </div>
                          <h4 class="text-sm font-black leading-tight uppercase mb-1 break-words overflow-wrap-anywhere"
                              [style.color]="colorMap()[act.name].text">
                            {{ act.name }}
                          </h4>
                          <p class="text-[10px] font-bold opacity-80" [style.color]="colorMap()[act.name].text">
                            Socio: {{ act.memberPrice }}
                          </p>
                        </div>
                      }
                      @if (getActividadesOrdenadas(dia).length === 0) {
                        <div class="h-full flex items-center justify-center opacity-20 grayscale mt-10">
                          <span class="text-4xl">🍃</span>
                        </div>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </app-page-component>
  `,
  styles: [`
    .portable-text ::ng-deep p { margin-bottom: 0.5rem; }
    .bg-grid-lines-vertical { background-image: radial-gradient(#f1f5f9 1px, transparent 1px); background-size: 20px 20px; }
    .animate-slide-in-left { animation: slideInLeft 0.5s ease-out; }
    .animate-slide-in-right { animation: slideInRight 0.5s ease-out; }
    @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  `]
})
export default class ExtraescolaresPage {
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  readonly actividades = computed(() => this.route.snapshot.data['extraescolaresData'] as Actividad[] ?? []);
  view = signal<'cards' | 'calendar'>('cards');
  expandedCards: Record<string, boolean> = {};

  toggleCard(name: string) {
    this.expandedCards[name] = !this.expandedCards[name];
    this.cdr.detectChanges();
  }

  readonly dias = ['Luns', 'Martes', 'Mércores', 'Xoves', 'Venres'];

  private readonly COLORS = [
    { bg: '#d1e3ff', border: '#1967d2', text: '#0d47a1' },
    { bg: '#feeeb3', border: '#f29900', text: '#8a4b00' },
    { bg: '#c6f0d1', border: '#188038', text: '#0b5324' },
    { bg: '#fad2cf', border: '#c5221f', text: '#8c1c1c' },
    { bg: '#f3d2f9', border: '#9333ea', text: '#6b21a8' },
    { bg: '#c4f0f6', border: '#0891b2', text: '#164e63' },
    { bg: '#ffe4cc', border: '#ea580c', text: '#7c2d12' },
    { bg: '#e2e8f0', border: '#475569', text: '#1e293b' },
    { bg: '#dcfce7', border: '#16a34a', text: '#14532d' },
    { bg: '#fae8ff', border: '#c026d3', text: '#701a75' },
    { bg: '#ffedd5', border: '#f97316', text: '#7c2d12' },
    { bg: '#e0e7ff', border: '#4f46e5', text: '#312e81' },
    { bg: '#f1f8e9', border: '#7cb342', text: '#33691e' },
    { bg: '#efebe9', border: '#8d6e63', text: '#3e2723' },
    { bg: '#fff9c4', border: '#fbc02d', text: '#f57f17' }
  ];

  readonly colorMap = computed(() => {
    const nombresUnicos = Array.from(new Set(this.actividades().map(a => a.name.trim())));
    const map: Record<string, typeof this.COLORS[0]> = {};
    nombresUnicos.forEach((nombre, index) => {
      map[nombre] = this.COLORS[index % this.COLORS.length];
    });
    return map;
  });

  getActividadesOrdenadas(dia: string) {
    return this.actividades()
      .filter(a => a.diaSemana === dia)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
  }
}
