import { Component, inject } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aviso-legal-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component [title]="title" category="Legal">
      <div class="container mx-auto px-4 -mt-10 mb-20">
        <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-100 max-w-4xl mx-auto prose prose-slate">

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-surface-900 mb-4">1. Datos Identificativos</h2>
            <p class="text-surface-600">
              En cumprimento co deber de información recollido no artigo 10 da Lei 34/2002, do 11 de xullo, de Servizos da Sociedade da Información e do Comercio Electrónico, a continuación reflíctense os seguintes datos:
            </p>
            <ul class="list-disc ml-6 mt-4 text-surface-600">
              <li><strong>Titular:</strong> ANPA A Faxarda</li>
              <li><strong>NIF:</strong> [GXXXXXXXX]</li>
              <li><strong>Domicilio:</strong> CEIP Gregorio Sanz, planta baixa (Ribadeo)</li>
              <li><strong>Correo electrónico:</strong> anpafaxarda&#64;gmail.com</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-surface-900 mb-4">2. Usuarios</h2>
            <p class="text-surface-600">
              O acceso e/ou uso deste portal atribúe a condición de USUARIO, que acepta, desde dito acceso e/ou uso, as Condicións Xerais de Uso aquí reflectidas.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-surface-900 mb-4">3. Propiedade Intelectual</h2>
            <p class="text-surface-600">
              O deseño do portal e os seus códigos fonte, así como os logos, marcas e demais signos distintivos que aparecen no mesmo pertencen ao ANPA e están protexidos polos correspondentes dereitos de propiedade intelectual e industrial.
            </p>
          </section>

          <div class="mt-12 pt-8 border-t border-surface-100 text-center">
            <a (click)="goHome()" class="text-primary-600 font-bold hover:underline cursor-pointer">← Volver ao inicio</a>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class AvisoLegalPage {
  title = 'Aviso Legal';
  private seo = inject(SeoService);
  private router = inject(Router);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Información detallada sobre como protexemos e xestionamos os datos persoais das familias e socios seguindo a normativa vixente do RGPD.'
    );
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
