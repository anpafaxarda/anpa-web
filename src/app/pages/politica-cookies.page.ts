import { Component, inject } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  standalone: true,
  imports: [PageComponent],
  template: `
    <app-page-component [title]="title" category="Legal">
      <div class="container mx-auto px-4 -mt-10 mb-20">
        <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-100 max-w-4xl mx-auto">
          <div class="prose prose-slate max-w-none">
            <h2 class="text-2xl font-bold text-surface-900 mb-4">Como utilizamos as cookies?</h2>
            <p>Utilizamos cookies para personalizar o contido e analizar o noso tráfico. Compartimos información sobre o uso que fai do sitio web co noso partner de análise: Google Analytics.</p>

            <div class="my-8 p-6 bg-surface-50 rounded-2xl border border-surface-100">
              <h3 class="text-lg font-bold mb-4">Xestión do seu consentimento</h3>
              <p class="text-sm mb-4">Se desexa cambiar as súas preferencias ou retirar o consentimento:</p>
              <button (click)="reset()" class="bg-white border border-surface-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-100 transition-colors cursor-pointer">
                Borrar preferencias de cookies
              </button>
            </div>

            <h3 class="font-bold">Cookies analíticas (Google Analytics)</h3>
            <p class="text-sm">Estas cookies permítennos contar as visitas e fontes de circulación para poder medir e mellorar o rendemento da nosa web.</p>
          </div>
        </div>
      </div>
    </app-page-component>
  `
})
export default class PoliticaCookiesPage {
  title = 'Política de Cookies'
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Detalle do uso de cookies na nosa web: que son, para que as utilizamos e como podes configurar as túas preferencias de navegación.'
    );
  }

  reset() {
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  }
}
