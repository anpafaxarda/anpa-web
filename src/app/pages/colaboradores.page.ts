import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Colaborador } from '../domain/colaboradores/colaborador.model';
import { PageComponent } from '../shared/components/page.component';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, ResolveFn } from '@angular/router'; // Importamos lo necesario
import { fetchColaboradores } from "../domain/colaboradores/colaboradores.action"; // Acción directa

// 1. Definimos el Resolver
export const colaboradoresResolver: ResolveFn<any> = () => {
  return fetchColaboradores();
};

// 2. Configuramos el Meta de la ruta
export const routeMeta = {
  resolve: {
    colaboradoresData: colaboradoresResolver
  }
};

@Component({
  selector: 'app-colaboradores-page',
  standalone: true,
  imports: [CommonModule, PageComponent],
  template: `
    <app-page-component
      [category]="'Vantaxes para socios'"
      [title]="'Comercios colaboradores'"
      [subTitle]="'Presenta o teu carné de socio do ANPA A Faxarda e desfruta destes beneficios en Ribadeo.'"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (item of colaboradores(); track item.name) {
          <div class="bg-white rounded-2xl shadow-xl shadow-surface-200/60 border border-surface-100 overflow-hidden flex flex-col group">

            <div class="relative h-48 bg-surface-100 flex items-center justify-center p-6">
              @if (item.imageUrl) {
                <img [src]="item.imageUrl" [alt]="item.name" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500">
              } @else {
                <div class="text-surface-300 text-4xl font-bold uppercase">{{ item.name.substring(0,2) }}</div>
              }

              <div class="absolute -bottom-4 right-6 bg-primary-600 text-white px-4 py-2 rounded-lg font-black shadow-lg shadow-primary-600/30 transform group-hover:-translate-y-1 transition-transform">
                {{ item.discount }}
              </div>
            </div>

            <div class="p-8 pt-10 flex-grow flex flex-col">
              <h3 class="text-xl font-bold text-surface-900 mb-2">{{ item.name }}</h3>
              <p class="text-surface-600 text-sm mb-4 flex-grow">{{ item.description }}</p>

              @if (item.discountCondition) {
                <div class="bg-surface-50 border-l-4 border-primary-400 p-3 mb-6">
                  <p class="text-[10px] uppercase tracking-wider font-bold text-surface-500 mb-1">Condición:</p>
                  <p class="text-xs text-surface-700 italic">{{ item.discountCondition }}</p>
                </div>
              }

              <div class="pt-4 border-t border-surface-50 flex items-center justify-between">
                <div class="flex gap-4">
                  @if (item.addressUrl) {
                    <a [href]="item.addressUrl" target="_blank" rel="noopener" class="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-bold text-sm transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      Mapa
                    </a>
                  }

                  @if (item.webSite) {
                    <a [href]="item.webSite" target="_blank" rel="noopener" class="flex items-center gap-1 text-primary-600 hover:text-primary-700 font-bold text-sm transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18"/></svg>
                      Web
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </app-page-component>
  `,
})
export default class ColaboradoresPage {
  title = 'Comercios colaboradores'

  // 3. Inyectamos ActivatedRoute para leer los datos del Resolver
  private route = inject(ActivatedRoute);

  // 4. Mapeamos los datos desde el objeto devuelto por el resolver
  readonly colaboradores = computed(() => this.route.snapshot.data['colaboradoresData'] as Colaborador[] ?? []);

  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Listaxe de establecementos locais que colaboran co ANPA A Faxarda ofrecendo condicións especiais aos nosos socios e socias.'
    );
  }
}
