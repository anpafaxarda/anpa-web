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
              <h2 class="text-2xl font-bold text-surface-900 mb-4">Quen é o responsable do tratamento?</h2>
              <p>O responsable é o ANPA A Faxarda, con NIF [GXXXXXXXX] e contacto anpafaxarda&#64;gmail.com.</p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">Con que finalidade tratamos os seus datos?</h2>
              <p>Tratamos a información que nos facilitan os socios e socias co fin de xestionar a relación asociativa, organizar actividades extraescolares e enviar comunicacións relevantes sobre a vida escolar.</p>
            </section>

            <section>
              <h2 class="text-2xl font-bold text-surface-900 mb-4">Canto tempo conservaremos os seus datos?</h2>
              <p>Os datos persoais proporcionados conservaranse mentres se manteña a condición de socio/a ou durante os anos necesarios para cumprir coas obrigas legais.</p>
            </section>

            <section class="bg-primary-50 p-6 rounded-2xl border border-primary-100 text-primary-900">
              <h3 class="font-bold mb-2">Os seus Dereitos</h3>
              <p class="text-sm">Ten dereito a acceder, rectificar e suprimir os datos, así como outros dereitos explicados na información adicional, contactando con nós por correo electrónico.</p>
            </section>
          </div>

          <div class="mt-12 pt-8 border-t border-surface-100 text-center">
            <a href="/" class="text-primary-600 font-bold hover:underline">← Volver ao inicio</a>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class PrivacidadPage {
  title = 'Política de Privacidade'
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Información detallada sobre como protexemos e xestionamos os datos persoais das familias e socios seguindo a normativa vixente do RGPD.'
    );
  }
}
