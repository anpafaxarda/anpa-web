import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { fetchBeneficiosPage } from '../domain/beneficios/beneficios.action';
import { BeneficiosCompleto } from '../domain/beneficios/beneficios.model';
import { GlobalDataService } from '../shared/services/global-data.service';

export const beneficiosResolver: ResolveFn<BeneficiosCompleto> = () => {
  return fetchBeneficiosPage();
};

export const routeMeta = {
  resolve: {
    beneficiosData: beneficiosResolver
  }
};

@Component({
  selector: 'app-beneficios-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component [title]="header()?.title || title" [category]="header()?.badge || 'Socio'" [subTitle]="header()?.subtitle || ''">
      <div class="container mx-auto px-4 -mt-10 space-y-12">

        <div class="grid grid-cols-1 gap-6">
          @for (item of beneficiosDirectos(); track item.titulo) {
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-100 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary-100 transition-all duration-300">

              <div class="flex-1 text-left">
                <h2 class="text-2xl font-bold text-surface-900 mb-2">{{ item.titulo }}</h2>
                <p class="text-surface-500 leading-relaxed">{{ item.descripcion }}</p>
              </div>

              <div class="px-8 py-4 rounded-2xl border transition-all duration-300 ease-in-out bg-transparent"
                   [style.color]="item.corFondo"
                   [style.borderColor]="item.corFondo + '40'">
                <span class="text-4xl font-black transition-transform duration-300 inline-block group-hover:scale-110">
                  {{ item.bonificacion }}
                </span>
              </div>

            </div>
          }
        </div>

        <div class="space-y-6">
          <h3 class="text-xl font-bold text-surface-900">Descontos en comercios</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (cat of categorias(); track cat.id) {
              <div class="bg-white p-6 rounded-2xl border border-surface-100 hover:border-primary-200 transition-all group">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-surface-50 rounded-xl flex items-center justify-center text-3xl group-hover:bg-primary-50 transition-colors">
                    {{ cat.icono }}
                  </div>
                  <div class="text-left">
                    <h4 class="font-bold text-surface-800 leading-tight">{{ cat.nombre }}</h4>
                    <p class="text-primary-600 font-bold mt-1 text-sm uppercase tracking-wide">
                      {{ cat.maxDescuento > 0 ? 'Ata un ' + cat.maxDescuento + '% dto.' : 'Vantaxes exclusivas' }}
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <div class="pt-4 pb-12">
          <a href="/colaboradores"
            class="group relative block overflow-hidden rounded-2xl bg-primary-600 p-8 text-center shadow-md hover:shadow-xl transition-all">
            <div class="relative z-10">
              <h4 class="text-xl font-bold text-white mb-2 leading-tight">Buscas un comercio específico?</h4>
              <p class="text-primary-100 mb-4 text-sm opacity-90">Explora a listaxe completa cos establecementos que colaboran co ANPA.</p>
              <span class="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-2.5 rounded-full font-bold group-hover:scale-105 transition-transform">
                Ver tódolos colaboradores
              </span>
            </div>
            <div class="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-primary-500 opacity-50 transition-transform group-hover:scale-150"></div>
          </a>
        </div>
      </div>
    </app-page-component>
  `,
  styles: [`
    /* No hover do pai (group), aplicamos o fondo pastel usando color-mix sobre o currentColor (item.corFondo) */
    .group:hover div[style*="border-color"] {
      background-color: color-mix(in srgb, currentColor 15%, transparent) !important;
    }
  `]
})
export default class BeneficiosPage implements OnInit {
  title = 'Beneficios';
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);
  private globalData = inject(GlobalDataService);
  readonly header = computed(() => this.globalData.pageHeaders()?.beneficios);

  private readonly data = computed(() => this.route.snapshot.data['beneficiosData'] as BeneficiosCompleto);

  readonly beneficiosDirectos = computed(() => this.data()?.beneficiosDirectos ?? []);
  readonly categorias = computed(() => this.data()?.categorias?.categorias ?? []);
  readonly totalComercios = computed(() => this.data()?.categorias?.total ?? 0);

  ngOnInit() {
    this.seo.setPageMeta(this.title, 'Vantaxes de ser socio do ANPA.');
  }
}
