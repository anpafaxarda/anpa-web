import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { fetchLaborAnpaPageData, fetchLaborAnpaPageTextsData } from '../domain/labor-anpa/labor-anpa.action';
import { PageTexts, SociosPageData } from '../domain/labor-anpa/labor-anpa.model';
import { fetchIniciativas } from '../domain/iniciativas/iniciativas.action';

export const laborAnpaResolver = async () => {
  const [laborData, iniciativas, laborPageTexts] = await Promise.all([
    fetchLaborAnpaPageData(),
    fetchIniciativas(),
    fetchLaborAnpaPageTextsData()
  ]);
  return { laborData, iniciativas, laborPageTexts };
};

export const routeMeta: RouteMeta = {
  resolve: { data: laborAnpaResolver }
};

@Component({
  selector: 'app-labor-anpa-page',
  standalone: true,
  imports: [PageComponent, CommonModule, NgOptimizedImage],
  template: `
    <app-page-component
      [category]="laborAnpaPageTexts().badge"
      [title]="title"
      [subTitle]="laborAnpaPageTexts().subtitle"
    >
      <!-- CONTEDOR CON OVERLAP (Axustado a max-w-5xl como en Asambleas) -->
      <div class="max-w-5xl mx-auto px-4 -mt-10 md:-mt-10 relative z-10 pb-20">

        <!-- 1. CAIXA DE INTRODUCIÓN -->
        <div class="bg-white p-8 md:p-10 rounded-3xl border border-surface-100 shadow-sm mb-12">
          <div class="flex flex-col md:flex-row gap-8 items-center text-left">
            <div class="flex-grow">
              <h2 class="text-2xl md:text-3xl font-black text-surface-900 mb-4">
                {{ laborAnpaPageTexts().introTitleColor1 }}&nbsp;<span class="text-primary-600">{{ laborAnpaPageTexts().introTitleColor2 }}</span>
              </h2>
              <p class="text-surface-600 leading-relaxed text-lg font-medium">
                {{ laborAnpaPageTexts().introParrafo }}
              </p>
            </div>
            <div class="shrink-0">
               <div class="w-24 h-24 bg-primary-50 rounded-2xl flex items-center justify-center text-5xl shadow-inner">🤝</div>
            </div>
          </div>
        </div>

        <!-- 2. SECCIÓN DE LABOR (Filas verticais sen frechas) -->
        <div class="space-y-6 mb-20">
          <h3 class="text-xl font-bold text-surface-900 flex items-center gap-2 mb-8">
            <span class="w-8 h-1 bg-primary-500 rounded-full"></span>
            {{ laborAnpaPageTexts().titleServizos }}
          </h3>

          @for (item of labor().servizos; track item.name) {
            <div class="bg-white rounded-3xl border border-surface-100 p-6 md:p-8 shadow-sm">
              <div class="flex flex-col md:flex-row md:items-center gap-6">
                <div class="w-16 h-16 shrink-0 bg-surface-50 rounded-2xl flex items-center justify-center text-3xl">
                  {{ item.emoji }}
                </div>
                <div class="space-y-1 text-left">
                  <h4 class="text-xl font-black text-surface-900">{{ item.name }}</h4>
                  <p class="text-surface-500 leading-relaxed font-medium">{{ item.description }}</p>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- 3. SECCIÓN DE INICIATIVAS (Transformadas tamén a filas verticais) -->
        <div class="space-y-6 mb-20">
          <h3 class="text-xl font-bold text-surface-900 flex items-center gap-2 mb-8">
            <span class="w-8 h-1 bg-primary-500 rounded-full"></span>
            {{ laborAnpaPageTexts().titleIniciativas }}
          </h3>

          @for (item of iniciativas(); track item.titulo) {
            <div class="bg-white rounded-3xl border border-surface-100 p-6 md:p-8 shadow-sm group">
              <div class="flex flex-col md:flex-row gap-8 items-start md:items-center">

                <!-- Miniatura ou Icona á esquerda (Estilo horizontal) -->
                <div class="w-full md:w-40 h-32 shrink-0 rounded-2xl overflow-hidden bg-surface-50 relative">
                  @if (item.tipoCabecera === 'image' && item.imagePath) {
                    <img [ngSrc]="item.imagePath" [alt]="item.titulo"
                         fill
                         class="w-full h-full object-cover"
                         sizes="(max-width: 768px) 100vw, 15vw">
                  } @else {
                    <div class="w-full h-full flex items-center justify-center text-4xl" [style.backgroundColor]="item.corFondo || '#f8fafc'">
                      {{ item.emoji || '✨' }}
                    </div>
                  }
                  <div class="absolute top-2 right-2">
                    <span class="text-[9px] font-black uppercase tracking-tighter px-2 py-1 bg-white/90 rounded-md text-surface-900">
                      {{ item.etiquetaTexto }}
                    </span>
                  </div>
                </div>

                <div class="space-y-2 text-left flex-grow">
                  <h4 class="text-xl font-black text-surface-900 group-hover:text-primary-600 transition-colors">
                    {{ item.titulo }}
                  </h4>
                  <p class="text-surface-500 leading-relaxed font-medium text-sm">
                    {{ item.descripcion }}
                  </p>
                </div>
              </div>
            </div>
          }
        </div>

          <!-- 4. BANNER FINAL (Estilo escuro para contrastar) -->
          <div class="pt-4">
          <div class="group relative block overflow-hidden rounded-[2.5rem] bg-primary-600 p-8 md:p-12 text-center shadow-md hover:shadow-xl transition-all">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-3xl font-black text-white mb-6">{{ laborAnpaPageTexts().titleFaiteSocio }}</h2>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                @for (motivo of labor().motivos; track motivo.text) {
                  <div class="flex items-start gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                    <span class="bg-white/20 p-1 rounded-full text-white text-xs font-bold shrink-0">✓</span>
                    <p class="text-sm font-medium text-white">{{ motivo.text }}</p>
                  </div>
                }
              </div>

              <p class="text-primary-100 italic text-xl border-l-2 border-primary-400 pl-4 text-left inline-block">
                {{ laborAnpaPageTexts().esloganFaiteSocio }}
              </p>
            </div>

            <div class="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-primary-500 opacity-50 transition-transform group-hover:scale-125"></div>
          </div>
        </div>

      </div>
    </app-page-component>
  `,
})
export default class LaborAnpaPage implements OnInit {
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);

  readonly rawData = computed(() => this.route.snapshot.data['data']);
  readonly labor = computed(() => this.rawData()?.laborData ?? { servizos: [], motivos: [] });
  readonly iniciativas = computed(() => this.rawData()?.iniciativas ?? []);
  readonly laborAnpaPageTexts = computed(() => this.rawData()?.laborPageTexts as PageTexts);

  title = this.laborAnpaPageTexts().title;

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Coñece o labor e as iniciativas reais do ANPA A Faxarda para mellorar o CEIP Gregorio Sanz.'
    );
  }
}
