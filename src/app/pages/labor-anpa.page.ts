import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { fetchLaborAnpaPageData } from '../domain/labor-anpa/labor-anpa.action';
import { SociosPageData } from '../domain/labor-anpa/labor-anpa.model';

export const informacionSociosResolver = () => {
  return fetchLaborAnpaPageData();
}

export const routeMeta: RouteMeta = {
  resolve: {
    informacionSociosData: informacionSociosResolver
  }
}

@Component({
  selector: 'app-labor-anpa-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [category]="'O noso compromiso'"
      [title]="title"
      [subTitle]="'Traballamos día a día para facer do CEIP Gregorio Sanz un lugar mellor para os nosos fillos e fillas.'"
    >
      <div class="max-w-5xl mx-auto px-4">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          @for (item of data().servizos; track item.name) {
            <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:shadow-md transition-all border-t-4 border-t-primary-500 text-left">
              <div class="text-3xl mb-4">{{ item.emoji }}</div>
              <h3 class="text-xl font-black text-surface-900 mb-3">{{ item.name }}</h3>
              <p class="text-surface-600 text-sm leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          }
        </div>

        <div class="pt-4">
          <div class="group relative block overflow-hidden rounded-[2.5rem] bg-primary-600 p-8 md:p-12 text-center shadow-md hover:shadow-xl transition-all">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-3xl font-black text-white mb-6">Por que facerte socio/a?</h2>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                @for (motivo of data().motivos; track motivo.text) {
                  <div class="flex items-start gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                    <span class="bg-white/20 p-1 rounded-full text-white text-xs font-bold shrink-0">✓</span>
                    <p class="text-sm font-medium text-white">{{ motivo.text }}</p>
                  </div>
                }
              </div>

              <p class="text-primary-100 italic border-l-2 border-primary-400 pl-4 text-left inline-block">
                "Unha asociación forte é a base dunha escola mellor."
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
  title = 'Labor do ANPA';

  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);

  readonly data = computed<SociosPageData>(() =>
    this.route.snapshot.data['informacionSociosData'] ?? { servizos: [], motivos: [] }
  );

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Descubre que facemos no ANPA A Faxarda: representamos ás familias, xestionamos servizos e traballamos pola mellora do CEIP Gregorio Sanz.'
    );
  }
}
