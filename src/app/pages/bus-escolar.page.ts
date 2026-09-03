import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { fetchBusEscolar } from "../domain/bus/bus.action";
import { Bus, Parada } from '../domain/bus/bus.model';
import { GlobalDataService } from '../shared/services/global-data.service';

export const busEscolarResolver: ResolveFn<Bus> = () => fetchBusEscolar();
export const routeMeta = { resolve: { busData: busEscolarResolver } };

@Component({
  selector: 'app-bus-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [category]="header()?.badge || 'Servizos'"
      [title]="header()?.title || 'Transporte Escolar'"
      [subTitle]="header()?.subtitle || 'Rutas, horarios e tarifas para o presente curso escolar.'"
    >
      <div class="max-w-6xl mx-auto px-4">

        <div class="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (t of tarifas(); track t.concepto) {
            <div class="bg-white rounded-[2.5rem] border-2 border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
               <div class="p-6 text-center bg-surface-50 border-b border-surface-100">
                 <h3 class="text-xl font-black text-surface-900">{{ t.concepto }}</h3>
               </div>

               <div class="p-2 space-y-2">
                 <div class="flex justify-between items-center p-5 rounded-[1.8rem] bg-surface-50 border border-surface-100">
                    <div class="flex flex-col">
                      <span class="text-[10px] font-black uppercase text-surface-400 tracking-widest">Prezo Base</span>
                      <span class="font-bold text-surface-900">Non Socios</span>
                    </div>
                    <span class="text-2xl font-black text-surface-900">{{ t.prezoOrdinario }}€/mes</span>
                 </div>

                 @if (t.prezoSocio) {
                   <div class="flex justify-between items-center p-5 rounded-[1.8rem] bg-primary-600 text-white shadow-lg shadow-primary-200">
                      <div class="flex flex-col">
                        <span class="text-[10px] font-black uppercase text-primary-200 tracking-widest leading-none mb-1">Cota Bonificada</span>
                        <span class="font-bold">Socios ANPA</span>
                      </div>
                      <div class="flex flex-col items-end">
                        <span class="text-2xl font-black">{{ t.prezoSocio }}€/mes</span>
                        @if (t.desconto) {
                          <span class="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full mt-1">Aforra un {{ t.desconto }}</span>
                        }
                      </div>
                   </div>
                 }
               </div>
            </div>
          }
        </div>

        <div class="space-y-24 mb-20">
          @for (ruta of rutas(); track ruta._id) {
            <div class="space-y-12">
              <div class="flex flex-col items-center">
                <h3 class="text-4xl font-black text-surface-900 italic tracking-tight mb-2">{{ ruta.nombreRuta }}</h3>
                <div class="h-1.5 w-24 bg-primary-600 rounded-full"></div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                <div class="space-y-8">
                  <div class="flex items-center justify-between px-5 py-2 bg-green-50 text-green-700 rounded-2xl border border-green-100">
                    <span class="font-black uppercase text-xs tracking-widest">☀️ Ida: Cara o Colexio</span>
                    <span class="text-[10px] font-bold italic bg-white/50 px-2 py-1 rounded-lg">🕒 Horarios orientativos</span>
                  </div>

                  <div class="relative pl-10 space-y-6 before:content-[''] before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-1 before:bg-green-100">
                    @for (parada of ruta.paradas; track parada.nombre) {
                      <div class="relative flex items-center justify-between bg-white p-5 rounded-3xl border border-surface-100 shadow-sm hover:border-green-300 transition-all group">
                        <div class="absolute -left-[32px] w-5 h-5 rounded-full border-4 border-white shadow-sm bg-green-500 z-10"></div>

                        <div class="flex flex-col">
                          <span class="font-black text-surface-900">{{ parada.nombre }}</span>
                          @if (parada.linkMapa) {
                            <a [href]="parada.linkMapa" target="_blank" class="text-[10px] font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 mt-1">
                              📍 Google Maps
                            </a>
                          }
                        </div>
                        <span class="bg-green-600 text-white px-4 py-2 rounded-2xl font-mono font-black shadow-md">{{ parada.horaRecogida }}</span>
                      </div>
                    }
                  </div>
                </div>

                <div class="space-y-8">
                  <div class="flex items-center justify-between px-5 py-2 bg-orange-50 text-orange-700 rounded-2xl border border-orange-100 lg:ml-auto">
                    <span class="font-black uppercase text-xs tracking-widest">🌙 Volta: Regreso a casa</span>
                    <span class="text-[10px] font-bold italic bg-white/50 px-2 py-1 rounded-lg ml-4">🕒 Horarios orientativos</span>
                  </div>

                  <div class="relative pl-10 space-y-6 before:content-[''] before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-1 before:bg-orange-100">
                    @for (parada of (ruta.nombreRuta === 'Ruta 1' ? getVoltaRuta1(ruta.paradas) : ruta.paradas); track parada.nombre) {
                      <div class="relative flex items-center justify-between bg-white p-5 rounded-3xl border border-surface-100 shadow-sm hover:border-orange-300 transition-all group">
                        <div class="absolute -left-[32px] w-5 h-5 rounded-full border-4 border-white shadow-sm bg-orange-500 z-10"></div>

                        <div class="flex flex-col">
                          <span class="font-black text-surface-900">{{ parada.nombre }}</span>
                          @if (parada.linkMapa) {
                            <a [href]="parada.linkMapa" target="_blank" class="text-[10px] font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 mt-1">
                              📍 Google Maps
                            </a>
                          }
                        </div>
                        <span class="bg-orange-600 text-white px-4 py-2 rounded-2xl font-mono font-black shadow-md">{{ parada.horaRegreso }}</span>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div class="bg-amber-50 border border-amber-100 p-4 rounded-3xl flex items-center gap-4">
                <span class="text-xl">⚠️</span>
                <p class="text-[11px] md:text-xs text-amber-800 leading-tight">
                  <span class="font-black uppercase text-amber-900">Aviso:</span>
                  As horas son estimadas e poden variar polo tráfico ou o tempo de embarque.
                  Recoméndase estar na parada <span class="font-bold text-amber-950 underline">5 minutos antes</span>.
                  Servizo operado por <span class="font-bold text-primary-700">EOCAR</span> (♿ Flota adaptada).
                </p>
              </div>
            </div>
          }
        </div>

        <div class="mb-20 bg-white border-2 border-surface-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden">

          <div class="flex flex-col md:flex-row items-center gap-10 relative z-10">

            <div class="flex flex-col items-center space-y-6 min-w-[200px]">
              <div class="w-32 h-32 md:w-40 md:h-40 bg-surface-50 rounded-3xl flex items-center justify-center p-6 border border-surface-100 shadow-inner">
                <img src="assets/logo-EOCAR.png" alt="Logotipo EOCAR" class="max-w-full h-auto object-contain">
              </div>

              <a href="https://eocar.es" target="_blank"
                class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-600 hover:text-primary-800 transition-colors">
                🌐 Visitar web eocar
                <span class="text-lg">→</span>
              </a>
            </div>

            <div class="flex-1 space-y-6 text-center md:text-left">
              <div class="space-y-2">
                <div class="flex flex-wrap justify-center md:justify-start gap-2">
                  <span class="text-[10px] font-black uppercase text-primary-600 tracking-[0.2em]">Proveedor Oficial</span>
                  <span class="text-[10px] font-black uppercase text-blue-600 tracking-[0.2em] flex items-center gap-1">
                    <span class="text-xs">♿</span> Accesibilidade Total
                  </span>
                </div>
                <h3 class="text-3xl font-black text-surface-900 italic tracking-tight">Servizo operado por EOCAR</h3>
              </div>

              <p class="text-surface-600 font-medium leading-relaxed">
                O CEIP Gregorio Sanz conta coa colaboración de <span class="text-surface-900 font-bold">EOCAR</span> para un transporte seguro e inclusivo.
                Toda a nosa flota está <span class="text-blue-700 font-bold">completamente adaptada</span> para alumnos con mobilidade reducida, contando con sistemas de rampla e ancoraxes homologadas para cadeiras de rodas.
              </p>

              <p class="text-surface-600 font-medium leading-relaxed italic border-l-4 border-primary-200 pl-4 bg-primary-50/50 py-2 rounded-r-xl">
                O servizo permite <span class="text-primary-700 font-bold">combinar rutas</span> de ida e volta segundo as necesidades semanais de cada familia, previa comunicación á ANPA ou á empresa.
              </p>

              <div class="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                <div class="bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100 text-[10px] font-black text-blue-700 uppercase tracking-wider flex items-center gap-2">
                  ♿ Flota Adaptada PMR
                </div>
                <div class="bg-primary-50 px-4 py-2 rounded-2xl border border-primary-100 text-[10px] font-black text-primary-700 uppercase tracking-wider">
                  🔄 Combinación de Rutas
                </div>
                <div class="bg-surface-50 px-4 py-2 rounded-2xl border border-surface-100 text-[10px] font-black text-surface-500 italic lowercase">
                  * Horarios suxeitos ao tráfico
                </div>
              </div>
            </div>

          </div>

          <div class="absolute right-[-20px] bottom-[-20px] opacity-[0.04] pointer-events-none rotate-12">
            <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        </div>

      </div>
    </app-page-component>
  `,
})
export default class BusPage implements OnInit {
  private globalData = inject(GlobalDataService);
  readonly header = computed(() => this.globalData.pageHeaders()?.busEscolar);
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  private readonly busData = this.route.snapshot.data['busData'] as Bus;
  readonly rutas = computed(() => this.busData?.rutas || []);
  readonly tarifas = computed(() => this.busData?.tarifas || []);

  ngOnInit() {
    this.seo.setPageMeta('Transporte Escolar', 'Rutas e tarifas de bus do CEIP Gregorio Sanz.');
  }

  getVoltaRuta1(paradas: Parada[]) {
    if (!paradas || paradas.length === 0) return [];
    const copy = [...paradas];
    const colegio = copy.pop();
    if (colegio) copy.unshift(colegio);
    return copy;
  }

  getReverseParadas(paradas: Parada[]) {
    return [...paradas].reverse();
  }
}
