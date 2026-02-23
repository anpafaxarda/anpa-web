import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../shared/components/page.component';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, Router, ResolveFn } from '@angular/router';
import { fetchConciliacionData } from '../domain/bos-dias-tardes/bos-dias-tardes.action';

export const conciliacionResolver: ResolveFn<any> = () => fetchConciliacionData();

export const routeMeta = {
  resolve: { conciliacionData: conciliacionResolver }
};

@Component({
  standalone: true,
  imports: [CommonModule, PageComponent],
  template: `
    <app-page-component
      [title]="data().title || 'Bos días e Tardes'"
      [category]="data().category || 'Servizos'">

      <div class="container mx-auto px-4 -mt-10 space-y-10 animate-in fade-in duration-500">

        <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-100">
          <h2 class="text-2xl font-bold text-surface-900 mb-4">
            {{ data().seccionIntro?.titulo || 'Conciliación Familiar' }}
          </h2>
          <p class="text-surface-600 leading-relaxed">
            {{ data().seccionIntro?.texto }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          @for (plan of data().plans; track plan.nombre) {
            <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:border-primary-200 transition-colors">
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  [style.background-color]="plan.colorFondoIcono || '#f8faf7'">
                  {{ plan.emoji }}
                </div>
                <h3 class="text-xl font-bold text-surface-800">{{ plan.nombre }}</h3>
              </div>

              <ul class="space-y-4">
                @for (detalle of plan.detalles; track detalle.etiqueta) {
                  <li class="flex justify-between items-center py-2 border-b border-surface-50">
                    <span class="text-surface-500 font-medium">{{ detalle.etiqueta }}</span>
                    <span class="text-surface-900 font-bold">{{ detalle.valor }}</span>
                  </li>
                }
              </ul>
            </div>
          }
        </div>

        <div class="bg-primary-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 class="text-xl font-bold mb-1">Necesitas inscribirte?</h4>
            <p class="text-primary-100">Descarga o formulario e envíao asinado ao correo do ANPA.</p>
          </div>
          <a (click)="navigateToContacto()" class="px-8 py-3 bg-white text-primary-600 rounded-full font-bold hover:scale-105 transition-transform shadow-lg cursor-pointer">
            Solicitar praza
          </a>
        </div>

      </div>
    </app-page-component>
  `
})
export default class BosDiasTardesPage implements OnInit {
  private seo = inject(SeoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly data = computed(() => this.route.snapshot.data['conciliacionData'] || {});

  ngOnInit() {
    this.seo.setPageMeta(
      this.data().title || 'Bos días e Tardes',
      'Servizos de conciliación familiar no CEIP Gregorio Sanz: horarios de madrugadores e actividades de tarde.'
    );
  }

  navigateToContacto() {
    this.router.navigate(['/contacto']);
  }
}
