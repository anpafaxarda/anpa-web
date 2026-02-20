import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../shared/components/page.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  standalone: true,
  imports: [CommonModule, PageComponent],
  template: `
    <app-page-component title="Bus Escolar" category="Servicios">
      <div class="container mx-auto px-4 -mt-10 space-y-10">
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-100">
          <h2 class="text-2xl font-bold mb-4">Rutas y Horarios</h2>
          </div>
      </div>
    </app-page-component>
  `
})
export default class BusEscolarPage {
  title = 'Bus escolar'
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Listado de establecimientos locales que colaboran con el ANPA A Faxarda ofreciendo condiciones especiales a nuestros socios.'
    );
  }
}
