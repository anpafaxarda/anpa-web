import { CategoriaResumen, Categorias } from './../domain/colaboradores/colaborador.model';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectLoad } from '@analogjs/router';
import { PageComponent } from '../shared/components/page.component';
import { load } from './beneficios.server';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { SkeletonComponent } from '../shared/components/skeleton.component';

@Component({
  selector: 'app-beneficios-page',
  standalone: true,
  imports: [PageComponent, CommonModule, SkeletonComponent],
  template: `
    <app-page-component [title]="title" category="Socio">
      @if (this.isLoading()) {
        <app-skeleton-component />
      } @else {
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

          <div class="pt-4">
            <a href="/colaboradores"
              class="group relative block overflow-hidden rounded-2xl bg-primary-600 p-8 text-center shadow-md hover:shadow-xl transition-all">
              <div class="relative z-10">
                <h4 class="text-xl font-bold text-white mb-2">¿Buscas un comercio específico?</h4>
                <p class="text-primary-100 mb-4 text-sm">Explora el listado completo con más de {{ totalComercios() }} establecimientos con ventajas para socios.</p>
                <span class="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-2 rounded-full font-bold group-hover:scale-105 transition-transform">
                  Ver listado completo
                </span>
              </div>
              <div class="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-primary-500 opacity-50 transition-transform group-hover:scale-150"></div>
            </a>
          </div>
        </div>
      }
    </app-page-component>
  `,
})
export default class BeneficiosPage {
  title = 'Beneficios';
  private readonly load$ = injectLoad<typeof load>();
  private readonly data = toSignal(this.load$, {
    initialValue: { categorias: [] as CategoriaResumen[], total: 0 } as Categorias
  });

  readonly categorias = computed(() => this.data()?.categorias ?? []);
  readonly totalComercios = computed(() => {
    const total = this.data()?.total ?? 0;

    return Math.floor(total * 0.75);
  });

  private seo = inject(SeoService);

  isLoading = signal(true);

  constructor() {
    effect(() => {
        if (this.data()) {
          this.isLoading.set(false);
        }
      }, { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Consulta todas las ventajas de formar parte del ANPA: descuentos exclusivos, prioridad en actividades y apoyo directo a las familias.'
    );
  }
}
