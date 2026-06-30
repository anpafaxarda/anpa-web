import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { fetchIniciativas } from '../domain/iniciativas/iniciativas.action';
import { Iniciativa } from '../domain/iniciativas/iniciativas.model';
import { GlobalDataService } from '../shared/services/global-data.service';

export const iniciativasResolver = () => fetchIniciativas();

export const routeMeta: RouteMeta = {
  resolve: { iniciativasData: iniciativasResolver }
};

@Component({
  selector: 'app-iniciativas-page',
  standalone: true,
  imports: [PageComponent, CommonModule, NgOptimizedImage],
  template: `
    <app-page-component [title]="header()?.title || title" [category]="header()?.badge || 'Proxectos Reais'"
      [subTitle]="header()?.subtitle || 'Accións concretas que desenvolvemos para apoiar o crecemento e formación do alumnado do CEIP Gregorio Sanz.'">

      <div class="max-w-5xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

          @for (item of iniciativas(); track item.titulo) {
            <div class="bg-white rounded-3xl border border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">

              <div class="h-48 overflow-hidden flex items-center justify-center relative">
                @if (item.tipoCabecera === 'image' && item.imagePath) {
                  <img [ngSrc]="item.imagePath" [alt]="item.titulo"
                       fill
                       class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       sizes="(max-width: 768px) 100vw, 50vw">
                  <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                } @else {
                  <div class="w-full h-full flex items-center justify-center text-6xl shadow-inner transition-colors duration-500"
                       [style.backgroundColor]="item.corFondo || '#f8fafc'">
                    <span class="drop-shadow-xl transform group-hover:scale-125 transition-transform duration-500">
                      {{ item.emoji || '✨' }}
                    </span>
                  </div>
                }
              </div>

              <div class="p-8 flex flex-col flex-grow">
                <h3 class="text-xl font-black text-surface-900 mb-3 leading-tight">{{ item.titulo }}</h3>
                <p class="text-surface-600 text-sm leading-relaxed mb-6 flex-grow">
                  {{ item.descripcion }}
                </p>

                <div class="mt-auto">
                  <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-surface-50 text-surface-500 border border-surface-100">
                    {{ item.etiquetaTexto }}
                  </span>
                </div>
              </div>
            </div>
          }

        </div>

        <div class="pt-4">
          <div class="group relative block overflow-hidden rounded-[2.5rem] bg-primary-600 p-8 md:p-12 text-center shadow-lg hover:shadow-2xl transition-all duration-500">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-3xl font-black text-white mb-4">Queres participar nestas accións?</h2>
              <p class="text-primary-100 mb-8 text-lg opacity-90">A túa axuda como socio/a permite que estes proxectos sigan medrando.</p>
              <a href="/beneficios" class="inline-flex items-center gap-2 bg-white text-primary-600 px-10 py-4 rounded-full font-black group-hover:scale-105 transition-transform shadow-md">
                Ver vantaxes de socio
              </a>
            </div>
            <div class="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-primary-500/30 blur-3xl transition-transform group-hover:scale-150"></div>
          </div>
        </div>
      </div>
    </app-page-component>
  `
})
export default class IniciativasPage implements OnInit {
  title = 'Iniciativas';
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private globalData = inject(GlobalDataService);
  readonly header = computed(() => this.globalData.pageHeaders()?.iniciativas);

  readonly iniciativas = computed<Iniciativa[]>(() =>
    this.route.snapshot.data['iniciativasData'] ?? []
  );

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Coñece os proxectos reais do ANPA A Faxarda: dende educación emocional ata xestión de servizos de conciliación.'
    );
  }
}
