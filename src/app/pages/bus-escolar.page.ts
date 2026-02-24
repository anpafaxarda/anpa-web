import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { fetchBusEscolar } from "../domain/bus/bus.action";
import { Bus } from '../domain/bus/bus.model';

export const busEscolarResolver: ResolveFn<Bus> = () => {
  return fetchBusEscolar();
};

export const routeMeta = {
  resolve: {
    busData: busEscolarResolver
  }
};

@Component({
  selector: 'app-bus-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [category]="'Servizos'"
      [title]="title"
      [subTitle]="'Consulta as rutas, paradas e horarios do transporte escolar do CEIP Gregorio Sanz.'"
    >
      <div class="max-w-5xl mx-auto px-4">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div class="bg-white p-6 rounded-[2rem] border-2 border-surface-200 flex items-center justify-between shadow-sm">
            <div>
              <p class="text-surface-600 font-black text-xs uppercase tracking-widest mb-1">Cota Ordinaria</p>
              <h3 class="text-2xl font-black text-surface-900">Resto de Familias</h3>
            </div>
            <div class="text-right">
              <span class="text-4xl font-black text-surface-900">{{ tarifa.prezoOrdinario }}€</span>
              <p class="text-[10px] text-surface-400 font-bold uppercase italic">Prezo base</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-[2rem] border-2 border-primary-100 flex items-center justify-between shadow-sm">
            <div>
              <p class="text-primary-600 font-black text-xs uppercase tracking-widest mb-1">Cota Mensual Socios</p>
              <h3 class="text-2xl font-black text-surface-900">Familias do ANPA</h3>
            </div>
            <div class="text-right">
              <span class="text-4xl font-black text-primary-600">{{ tarifa.prezoSocio }}€</span>
              <p class="text-[10px] text-surface-400 font-bold uppercase italic">Bonificado</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-100 p-6 rounded-3xl mb-12 flex items-start gap-4">
          <span class="text-2xl">🚌</span>
          <div>
            <h3 class="text-blue-900 font-bold mb-1 leading-none">Información de interese</h3>
            <p class="text-blue-700 text-sm">O servizo de bus escolar está xestionado en colaboración coa Xunta e o centro. Recoméndase estar na parada 5 minutos antes da hora sinalada.</p>
          </div>
        </div>

        <div class="space-y-12 mb-20">
          @if (rutas().length > 0) {
            @for (ruta of rutas(); track ruta._id) {
              <div class="bg-white rounded-3xl border border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div class="bg-surface-900 p-6 text-white flex justify-between items-center">
                  <h3 class="text-xl font-black">{{ ruta.nombreRuta }}</h3>
                  @if (ruta.conductor) {
                    <span class="text-xs bg-white/20 px-3 py-1 rounded-full italic opacity-80">Cond.: {{ ruta.conductor }}</span>
                  }
                </div>

                <div class="overflow-x-auto">
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="bg-surface-50 border-b border-surface-100">
                        <th class="p-5 text-xs font-black uppercase text-surface-500">Parada</th>
                        <th class="p-5 text-xs font-black uppercase text-surface-500 text-center">Recollida</th>
                        <th class="p-5 text-xs font-black uppercase text-surface-500 text-center">Regreso</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (parada of ruta.paradas; track parada.nombre) {
                        <tr class="border-b border-surface-50 hover:bg-surface-50/50 transition-colors">
                          <td class="p-5 text-surface-900 font-bold">{{ parada.nombre }}</td>
                          <td class="p-5 text-center">
                            <span class="bg-green-50 text-green-700 px-4 py-1.5 rounded-xl text-sm font-mono font-bold border border-green-100/50">
                              {{ parada.horaRecogida }}
                            </span>
                          </td>
                          <td class="p-5 text-center">
                            <span class="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-xl text-sm font-mono font-bold border border-orange-100/50">
                              {{ parada.horaRegreso }}
                            </span>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }
          } @else {
            <div class="text-center py-20 bg-surface-50 rounded-3xl border border-dashed border-surface-200">
              <p class="text-surface-400 italic">Cargando rutas de transporte...</p>
            </div>
          }
        </div>

        <div class="pt-4 pb-12">
          <div class="group relative overflow-hidden rounded-[2.5rem] bg-primary-600 p-10 text-center shadow-lg">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-2xl font-black text-white mb-4 leading-tight">Avisos ou Incidencias?</h2>
              <p class="text-primary-100 mb-8 opacity-90 leading-relaxed">Se tes algunha dúbida sobre as rutas ou necesitas notificar unha incidencia no transporte, contacta coa xestión do ANPA.</p>
              <a href="/contacto" class="inline-flex bg-white text-primary-600 px-10 py-3.5 rounded-full font-black hover:scale-105 transition-transform shadow-md">
                Contactar co ANPA
              </a>
            </div>
            <div class="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-primary-500 opacity-50 transition-transform group-hover:scale-125"></div>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class BusPage implements OnInit {
  title = 'Transporte Escolar';

  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  // Acceso directo aos datos resoltos
  private readonly busData = this.route.snapshot.data['busData'] as Bus;

  // Sinais simplificadas para evitar warnings de optional chaining innecesarios
  readonly rutas = computed(() => this.busData.rutas || []);

  // Acceso directo á tarifa (xa sabemos que o obxecto Bus a inclúe)
  get tarifa() {
    return this.busData.tarifa;
  }

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Horarios, paradas e prezos do bus escolar do CEIP Gregorio Sanz.'
    );
  }
}
