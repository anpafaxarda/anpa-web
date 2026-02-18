import { injectLoad } from '@analogjs/router';
import { Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { load } from './extraescolares.server';
import { PortableTextPipe } from '../shared/pipes/portable-text.pipe';
import { CommonModule } from '@angular/common';
import { Actividad } from '../domain/actividades/actividades.model';
import { PageComponent } from '../shared/components/page.component';

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
            class="relative z-10 px-8 py-2.5 rounded-xl text-sm font-black transition-all duration-300 flex items-center gap-2">
            <span>🎴</span> Lista
          </button>
          <button (click)="view.set('calendar')"
            [class]="view() === 'calendar' ? 'bg-white shadow-md text-primary-700' : 'text-surface-500 hover:text-surface-700'"
            class="relative z-10 px-8 py-2.5 rounded-xl text-sm font-black transition-all duration-300 flex items-center gap-2">
            <span>📅</span> Horario
          </button>
        </div>
      </div>

      <div class="relative min-h-[600px]">

        @if (view() === 'cards') {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-in-left">
            @for (actividad of actividades(); track actividad.name) {
              <div class="bg-white rounded-3xl shadow-xl border border-surface-100 overflow-hidden flex flex-col md:flex-row group transition-all duration-500 hover:border-primary-200">
                <div class="md:w-1/3 relative h-48 md:h-auto bg-surface-100 overflow-hidden">
                  @if (actividad.imageUrl) {
                    <img [src]="actividad.imageUrl" [alt]="actividad.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                  }
                  <div class="absolute inset-0 bg-gradient-to-t from-surface-900/60 to-transparent"></div>
                  <div class="absolute bottom-4 left-4 text-white font-black text-lg">{{ actividad.price }}</div>
                </div>
                <div class="md:w-2/3 p-8 flex flex-col">
                  <h3 class="text-2xl font-black text-surface-900 mb-2 leading-tight">{{ actividad.name }}</h3>
                  <div class="portable-text text-surface-600 text-sm mb-6 flex-grow line-clamp-3" [innerHTML]="actividad.description | portableText"></div>
                  <div class="pt-4 border-t border-surface-50 text-xs font-bold text-surface-700 flex items-center gap-2">
                    <span class="text-primary-600">🕒</span> {{ actividad.classDuration }}
                  </div>
                </div>
              </div>
            }
          </div>
        }

        @if (view() === 'calendar') {
          <div class="animate-slide-in-right">

            <div class="lg:hidden space-y-8">
              @for (dia of dias; track dia) {
                <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 class="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary-600 mb-4">
                    <span class="h-px flex-grow bg-primary-100"></span>
                    {{ dia }}
                    <span class="h-px flex-grow bg-primary-100"></span>
                  </h3>
                  <div class="grid gap-3">
                    @for (act of getActividadesOrdenadas(dia); track act.name) {
                      <div class="bg-white p-5 rounded-3xl border border-surface-100 shadow-sm flex items-center gap-4">
                        <div class="flex-shrink-0 text-center py-2 px-3 bg-primary-50 rounded-2xl border border-primary-100 min-w-[75px]">
                          <p class="text-[9px] font-black text-primary-400 uppercase leading-none">Inicio</p>
                          <p class="text-sm font-black text-primary-700 mt-1">{{ act.horaInicio }}</p>
                        </div>
                        <div class="flex-grow">
                          <h4 class="text-base font-bold text-surface-900 leading-tight">{{ act.name }}</h4>
                          <p class="text-[10px] text-surface-400 font-bold uppercase mt-1">Remata ás {{ act.horaFin }}</p>
                        </div>
                      </div>
                    } @empty {
                      <div class="py-4 text-center border-2 border-dashed border-surface-100 rounded-3xl bg-surface-50/30 text-surface-400 text-xs italic">
                        Sen actividades
                      </div>
                    }
                  </div>
                </div>
              }
            </div>

            <div class="hidden lg:block bg-white rounded-[2.5rem] shadow-2xl border border-surface-100 overflow-hidden">
              <div class="overflow-x-auto">
                <div class="min-w-[1000px]">

                  <div class="grid grid-cols-[160px_1fr] border-b border-surface-100">
                    <div class="bg-surface-50/50 p-4 border-r border-surface-100"></div>
                    <div class="relative h-12 flex items-center">
                      @for (hora of horasDisponibles; track hora) {
                        <div class="absolute text-[10px] font-black text-surface-300 uppercase" [style.left.px]="getLeftOffset(hora)">
                          {{ hora }}
                        </div>
                      }
                    </div>
                  </div>

                  @for (dia of dias; track dia) {
                    <div class="grid grid-cols-[160px_1fr] border-b border-surface-100 last:border-0 group min-h-[100px]">
                      <div class="bg-surface-50/30 p-4 border-r border-surface-100 flex items-center justify-center sticky left-0 z-20">
                        <span class="text-xs font-black uppercase tracking-widest text-surface-900">{{ dia }}</span>
                      </div>

                      <div class="relative py-4 bg-grid-lines-horizontal">
                        @for (fila of getFilasDeActividades(dia); track $index) {
                          <div class="relative h-14 mb-2 last:mb-0">
                             @for (act of fila; track act.name) {
                              <div class="absolute h-full p-1 transition-all duration-300 z-10 hover:z-20"
                                   [style.left.px]="getLeftOffset(act.horaInicio)"
                                   [style.width.px]="getWidthDuration(act.horaInicio, act.horaFin)">
                                <div class="h-full w-full bg-primary-600 text-white rounded-xl px-3 py-2 shadow-sm border-l-4 border-primary-400 flex flex-col justify-center overflow-hidden transition-all hover:scale-[1.02]">
                                  <h4 class="text-[10px] font-black leading-tight uppercase truncate">{{ act.name }}</h4>
                                  <p class="text-[9px] font-bold opacity-80 mt-0.5">{{ act.horaInicio }} - {{ act.horaFin }}</p>
                                </div>
                              </div>
                             }
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </app-page-component>
  `,
  styles: [`
    .portable-text ::ng-deep p { margin-bottom: 0.5rem; }
    .bg-grid-lines-horizontal {
      background-size: 150px 100%;
      background-image: linear-gradient(to right, #f1f5f9 1px, transparent 1px);
    }
    .animate-slide-in-left { animation: slideInLeft 0.5s ease-out; }
    .animate-slide-in-right { animation: slideInRight 0.5s ease-out; }
    @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  `]
})
export default class ExtraescolaresPage {
  private readonly load$ = injectLoad<typeof load>();
  private readonly data = toSignal(this.load$, { initialValue: { actividades: [] as Actividad[] } });

  readonly actividades = computed(() => this.data()?.actividades ?? []);
  view = signal<'cards' | 'calendar'>('cards');

  readonly dias = ['Luns', 'Martes', 'Mércores', 'Xoves', 'Venres'];
  readonly horasDisponibles = ['16:00', '17:00', '18:00', '19:00', '20:00'];

  private readonly PIXELS_PER_HOUR = 150;
  private readonly START_HOUR = 16;

  /** Ordenación para la vista móvil */
  getActividadesOrdenadas(dia: string) {
    return this.actividades()
      .filter(a => a.diaSemana === dia)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
  }

  /** Lógica de Apilamiento para el Timeline de Escritorio */
  getFilasDeActividades(dia: string): Actividad[][] {
    const actividadesDelDia = this.actividades().filter(a => a.diaSemana === dia);
    const filas: Actividad[][] = [];

    actividadesDelDia.forEach(act => {
      let filaEncontrada = false;
      for (let fila of filas) {
        const haySolapamiento = fila.some(a => (act.horaInicio < a.horaFin && act.horaFin > a.horaInicio));
        if (!haySolapamiento) {
          fila.push(act);
          filaEncontrada = true;
          break;
        }
      }
      if (!filaEncontrada) filas.push([act]);
    });
    return filas.length > 0 ? filas : [[]];
  }

  getLeftOffset(hora: string): number {
    const [h, m] = hora.split(':').map(Number);
    return (h + m / 60 - this.START_HOUR) * this.PIXELS_PER_HOUR;
  }

  getWidthDuration(inicio: string, fin: string): number {
    const [h1, m1] = inicio.split(':').map(Number);
    const [h2, m2] = fin.split(':').map(Number);
    return ((h2 + m2 / 60) - (h1 + m1 / 60)) * this.PIXELS_PER_HOUR;
  }
}
