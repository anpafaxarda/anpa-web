import { Component, inject, computed } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { SeoService } from '../core/services/seo.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { PortableTextPipe } from '../shared/pipes/portable-text.pipe';
import { fetchPoliticaCookies } from '../domain/politica-cookies/politica-cookies.action';

export const cookiesResolver: ResolveFn<any> = () => fetchPoliticaCookies();

export const routeMeta = {
  resolve: { legalData: cookiesResolver }
};

@Component({
  standalone: true,
  imports: [PageComponent, CommonModule, PortableTextPipe],
  template: `
    <app-page-component [title]="data().title || 'Política de Cookies'" [category]="data().category || 'Legal'">
      <div class="container mx-auto px-4 -mt-10 mb-20">
        <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-100 max-w-4xl mx-auto">

          <div class="prose prose-slate max-w-none" [innerHTML]="data().contenido | portableText"></div>

          <div class="mt-8 p-6 bg-surface-50 rounded-2xl border border-surface-100">
            <h3 class="text-lg font-bold text-surface-900 mb-4">Xestión do seu consentimento</h3>
            <p class="text-sm text-surface-600 mb-4">Se desexa cambiar as súas preferencias ou retirar o consentimento aceptado anteriormente:</p>
            <button (click)="reset()" class="bg-white border border-surface-200 px-4 py-2 rounded-lg text-sm font-semibold text-surface-700 hover:bg-surface-100 transition-colors cursor-pointer shadow-sm">
              Borrar preferencias de cookies
            </button>
          </div>

        </div>
      </div>
    </app-page-component>
  `
})
export default class PoliticaCookiesPage {
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);

  readonly data = computed(() => this.route.snapshot.data['legalData'] || {});

  ngOnInit() {
    this.seo.setPageMeta(
      this.data().title || 'Política de Cookies',
      'Detalle do uso de cookies na nosa web: que son, para que as utilizamos e como podes configurar as túas preferencias.'
    );
  }

  reset() {
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  }
}
