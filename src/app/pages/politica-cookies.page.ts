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
            <h2 class="text-2xl font-bold text-surface-900 mb-4">¿Cómo utilizamos las cookies?</h2>
            <p>Utilizamos cookies para personalizar el contenido y analizar nuestro tráfico. Compartimos información sobre el uso que hace del sitio web con nuestro partner de análisis: Google Analytics.</p>

            <div class="my-8 p-6 bg-surface-50 rounded-2xl border border-surface-100">
              <h3 class="text-lg font-bold mb-4">Gestión de su consentimiento</h3>
              <p class="text-sm mb-4">Si desea cambiar sus preferencias o retirar el consentimiento:</p>
              <button (click)="reset()" class="bg-white border border-surface-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-100 transition-colors">
                Borrar preferencias de cookies
              </button>
            </div>

            <h3 class="font-bold">Cookies analíticas (Google Analytics)</h3>
            <p class="text-sm">Estas cookies nos permiten contar las visitas y fuentes de circulación para poder medir y mejorar el desempeño de nuestra web.</p>
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
      'Detalle del uso de cookies en nuestra web: qué son, para qué las utilizamos y cómo puedes configurar tus preferencias de navegación.'
    );
  }

  reset() {
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  }
}
