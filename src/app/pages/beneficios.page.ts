import { CategoriaResumen } from './../domain/colaboradores/colaborador.model';
import { Component, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';
import { PageComponent } from '../shared/components/page.component';
import { load } from './beneficios.server';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beneficios-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component [title]="title" category="Socio">
      <div class="container mx-auto px-4 -mt-10 space-y-12">

        <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-100 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary-100 transition-colors">
          <div class="flex-1 text-left">
            <h2 class="text-2xl font-bold text-surface-900 mb-2">Actividades Extraescolares</h2>
            <p class="text-surface-500">Descuento del 50% en todas las actividades para las familias socias.</p>
          </div>
          <div class="bg-primary-50 px-8 py-4 rounded-2xl border border-primary-100 group-hover:bg-primary-100 transition-colors">
            <span class="text-4xl font-black text-primary-600">-50%</span>
          </div>
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold text-surface-900">Descuentos en comercios</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (cat of categorias(); track cat.id) {
              <div class="bg-white p-6 rounded-2xl border border-surface-100 hover:border-primary-200 transition-all group">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-surface-50 rounded-xl flex items-center justify-center text-3xl group-hover:bg-primary-50 transition-colors">
                    {{ cat.icono }}
                  </div>
                  <div class="text-left">
                    <h4 class="font-bold text-surface-800 leading-tight">{{ cat.nombre }}</h4>
                    <p class="text-primary-600 font-bold mt-1">
                      @if (cat.maxDescuento > 0) {
                        Hasta {{ cat.maxDescuento }}% dto.
                      } @else {
                        Ventajas exclusivas
                      }
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="text-center pt-4">
          <a href="/colaboradores" class="text-surface-400 hover:text-primary-500 text-sm font-medium underline underline-offset-4">
            Ver todos los locales colaboradores
          </a>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class BeneficiosPage {
  title = 'Beneficios';
  private readonly load$ = injectLoad<typeof load>();
  private readonly data = toSignal(this.load$, {
    initialValue: { categorias: [] as CategoriaResumen[] }
  });

  readonly categorias = computed(() => this.data()?.categorias ?? []);

  constructor() {
    effect(() => {
      console.debug('categorias.length', this.categorias.length);
      console.debug('categorias data:', this.data());
    });
  }
}
