import { Component, inject } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-privacidad-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component [title]="title" category="Legal">
      <div class="container mx-auto px-4 -mt-10 mb-20">
        <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-100 max-w-4xl mx-auto">

          <div class="space-y-8 text-surface-600">
            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">¿Quién es el responsable del tratamiento?</h2>
              <p>El responsable es el ANPA [Nombre], con NIF [GXXXXXXXX] y contacto [email].</p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">¿Con qué finalidad tratamos sus datos?</h2>
              <p>Tratamos la información que nos facilitan los socios con el fin de gestionar la relación asociativa, organizar actividades extraescolares y enviar comunicaciones relevantes sobre la vida escolar.</p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">¿Cuánto tiempo conservaremos sus datos?</h2>
              <p>Los datos personales proporcionados se conservarán mientras se mantenga la condición de socio o durante los años necesarios para cumplir con las obligaciones legales.</p>
            </section>

            <section class="bg-primary-50 p-6 rounded-2xl border border-primary-100 text-primary-900">
              <h3 class="font-bold mb-2">Sus Derechos</h3>
              <p class="text-sm">Tiene derecho a acceder, rectificar y suprimir los datos, así como otros derechos explicados en la información adicional, contactando con nosotros por email.</p>
            </section>
          </div>

          <div class="mt-12 pt-8 border-t border-surface-100 text-center">
            <a href="/" class="text-primary-600 font-bold hover:underline">← Volver al inicio</a>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class PrivacidadPage {
  title = 'Política de Privacidad'
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Información detallada sobre cómo protegemos y gestionamos los datos personales de las familias y socios siguiendo la normativa vigente del RGPD.'
    );
  }
}
