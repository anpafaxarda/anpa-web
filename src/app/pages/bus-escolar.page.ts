import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { fetchBusEscolar } from "../domain/bus/bus.action";
import { Bus, Parada } from '../domain/bus/bus.model';

export const busEscolarResolver: ResolveFn<Bus> = () => fetchBusEscolar();
export const routeMeta = { resolve: { busData: busEscolarResolver } };

@Component({
  selector: 'app-bus-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [category]="'Servizos'"
      [title]="'Transporte Escolar'"
      [subTitle]="'Rutas, horarios e tarifas para o presente curso escolar.'"
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
                    <span class="text-2xl font-black text-surface-900">{{ t.prezoOrdinario }}€</span>
                 </div>

                 <div class="flex justify-between items-center p-5 rounded-[1.8rem] bg-primary-600 text-white shadow-lg shadow-primary-200">
                    <div class="flex flex-col">
                      <span class="text-[10px] font-black uppercase text-primary-200 tracking-widest leading-none mb-1">Cota Bonificada</span>
                      <span class="font-bold">Socios ANPA</span>
                    </div>
                    <div class="flex flex-col items-end">
                      <span class="text-2xl font-black">{{ t.prezoSocio }}€</span>
                      <span class="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full mt-1">Aforra un {{ t.desconto }}</span>
                    </div>
                 </div>
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
                  <div class="flex items-center gap-3 px-5 py-2 bg-green-50 text-green-700 rounded-2xl w-fit font-black uppercase text-xs tracking-widest border border-green-100">
                    ☀️ Ida: Cara o Colexio
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
                  <div class="flex items-center gap-3 px-5 py-2 bg-orange-50 text-orange-700 rounded-2xl w-fit font-black uppercase text-xs tracking-widest border border-orange-100 lg:ml-auto">
                    🌙 Volta: Regreso a casa
                  </div>

                  <div class="relative pl-10 space-y-6 before:content-[''] before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-1 before:bg-orange-100">
                    @for (parada of (ruta.nombreRuta === 'Ruta 2' ? getReverseParadas(ruta.paradas) : ruta.paradas); track parada.nombre) {
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
            </div>
          }
        </div>
      </div>
    </app-page-component>
  `,
})
export default class BusPage implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  private readonly busData = this.route.snapshot.data['busData'] as Bus;
  readonly rutas = computed(() => this.busData?.rutas || []);
  readonly tarifas = computed(() => this.busData?.tarifas || []);

  ngOnInit() {
    this.seo.setPageMeta('Transporte Escolar', 'Rutas e tarifas de bus do CEIP Gregorio Sanz.');
  }

  getReverseParadas(paradas: Parada[]) {
    return [...paradas].reverse();
  }
}
