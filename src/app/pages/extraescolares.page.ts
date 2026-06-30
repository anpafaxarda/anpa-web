import { Component, computed, inject, signal, ChangeDetectorRef } from '@angular/core';
import { PortableTextPipe } from '../shared/pipes/portable-text.pipe';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Actividad } from '../domain/extraescolares/extraescolares.model';
import { ExtraescolaresInscripcion } from '../domain/extraescolares/extraescolares-inscripcion.model';
import { PageComponent } from '../shared/components/page.component';
import { fetchExtraescolares } from '../domain/extraescolares/extraescolares.action';
import { fetchExtraescolaresInscripcion } from '../domain/extraescolares/extraescolares-inscripcion.action';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { GlobalDataService } from '../shared/services/global-data.service';

export const extraescolaresResolver: ResolveFn<any> = () => {
  return Promise.all([fetchExtraescolares(), fetchExtraescolaresInscripcion()]);
}

export const routeMeta = {
  resolve: {
    extraescolaresData: extraescolaresResolver
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, PortableTextPipe, PageComponent, NgOptimizedImage],
  template: `
    <app-page-component
        [category]="header()?.badge || 'Labor do ANPA'"
        [title]="header()?.title || 'Actividades Extraescolares'"
        [subTitle]="header()?.subtitle || 'Organizadas polo ANPA A Faxarda en colaboración co colexio CEIP Gregorio Sanz.'"
    >

      @if (inscripcion()) {
        @if (mostrarInscripcion()) {
          <!-- INSCRIPCIÓN ABERTA -->
          <div class="bg-white rounded-[2.5rem] shadow-xl border border-surface-100 overflow-hidden mb-10">
            <div class="p-8 md:p-10">
              <div class="flex flex-col sm:flex-row items-center gap-6 mb-8 text-center sm:text-left">
                <div class="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-2xl font-black text-surface-900 leading-tight">{{ inscripcion()!.titulo || 'Inscrición aberta' }}</h3>
                  @if (inscripcion()!.subtitulo) {
                    <p class="text-surface-500 font-medium mt-1">{{ inscripcion()!.subtitulo }}</p>
                  }
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                @if (inscripcion()?.urlAbacoIOS || inscripcion()?.urlAbacoAndroid) {
                  <div class="bg-white rounded-[2rem] border border-surface-100 shadow-sm p-6 flex flex-col gap-5">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-white rounded-xl shadow border border-surface-100 flex-shrink-0">
                        <img src="/assets/abaco-logo.webp" alt="Ábaco" class="w-full h-full object-contain">
                      </div>
                      <div>
                        <p class="text-[10px] font-black uppercase tracking-widest text-primary-600">{{ inscripcion()!.etiquetaAbaco }}</p>
                        <h4 class="text-lg font-black text-surface-900 leading-tight">{{ inscripcion()!.tituloAbaco || 'App Ábaco Familias' }}</h4>
                      </div>
                    </div>
                    @if (inscripcion()?.abacoDescripcion) {
                      <p class="text-surface-500 text-sm leading-relaxed">{{ inscripcion()!.abacoDescripcion }}</p>
                    }
                    <div class="flex gap-2 mt-auto">
                      @if (inscripcion()?.urlAbacoIOS) {
                        <a [href]="inscripcion()!.urlAbacoIOS" target="_blank"
                           class="flex-1 bg-black text-white px-3 py-2.5 rounded-xl flex items-center gap-2 hover:bg-surface-800 transition-all shadow-md border border-surface-700">
                          <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                          <div class="text-left leading-tight font-sans">
                            <p class="text-[8px] font-medium uppercase leading-none mb-0.5 text-surface-400">Download on the</p>
                            <p class="text-sm font-semibold leading-none">App Store</p>
                          </div>
                        </a>
                      }
                      @if (inscripcion()?.urlAbacoAndroid) {
                        <a [href]="inscripcion()!.urlAbacoAndroid" target="_blank"
                           class="flex-1 bg-black text-white px-3 py-2.5 rounded-xl flex items-center gap-2 hover:bg-surface-800 transition-all shadow-md border border-surface-700">
                          <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 58.9-34.1c18-10.3 18-27.3 0-37.7zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                          <div class="text-left leading-tight font-sans">
                            <p class="text-[8px] font-medium uppercase leading-none mb-0.5 text-surface-400">Get it on</p>
                            <p class="text-sm font-semibold leading-none">Google Play</p>
                          </div>
                        </a>
                      }
                    </div>
                  </div>
                }

                @if (inscripcion()?.formularioArchivoUrl || inscripcion()?.formularioEnlace) {
                  <div class="bg-white rounded-[2rem] border border-surface-100 shadow-sm p-6 flex flex-col gap-5">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <div>
                        <p class="text-[10px] font-black uppercase tracking-widest text-primary-600">{{ inscripcion()!.etiquetaFormulario }}</p>
                        <h4 class="text-lg font-black text-surface-900 leading-tight">{{ inscripcion()!.tituloFormulario || 'Formulario' }}</h4>
                      </div>
                    </div>
                    @if (inscripcion()?.formularioDescripcion) {
                      <p class="text-surface-500 text-sm leading-relaxed">{{ inscripcion()!.formularioDescripcion }}</p>
                    }
                    <div class="mt-auto">
                      <a [href]="inscripcion()!.formularioArchivoUrl || inscripcion()!.formularioEnlace" target="_blank"
                         class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all shadow-md">
                        <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        </svg>
                        <div class="text-left leading-tight font-sans">
                          <p class="text-base font-semibold leading-none">{{ inscripcion()!.textoBotonFormulario }}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                }

              </div>
            </div>
          </div>

        } @else if (inscripcion()?.mensaxeCerrada) {
          <!-- FALLBACK INSCRIPCIÓN PECHADA -->
          <div class="bg-white rounded-[2.5rem] shadow-xl border border-surface-100 overflow-hidden mb-10">
            <div class="p-8 md:p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div class="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-black text-surface-700 leading-tight mb-1">{{ inscripcion()!.tituloCerrada }}</h3>
                <p class="text-surface-500 font-medium">{{ inscripcion()!.mensaxeCerrada }}</p>
              </div>
            </div>
          </div>
        }
      }

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
                  @if (actividad.imagePath) {
                    <img [ngSrc]="actividad.imagePath" [alt]="actividad.name"
                         fill
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         sizes="(max-width: 768px) 100vw, 33vw">
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
  private globalData = inject(GlobalDataService);
  readonly header = computed(() => this.globalData.pageHeaders()?.extraescolares);

  readonly actividades = computed(() => (this.route.snapshot.data['extraescolaresData']?.[0] ?? []) as Actividad[]);
  readonly inscripcion = computed(() => this.route.snapshot.data['extraescolaresData']?.[1] as ExtraescolaresInscripcion | null);
  readonly mostrarInscripcion = computed(() => {
    const i = this.inscripcion();
    return i?.inscripcionActiva && (!!i?.urlAbacoIOS || !!i?.urlAbacoAndroid || !!i?.formularioArchivoUrl || !!i?.formularioEnlace);
  });
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
