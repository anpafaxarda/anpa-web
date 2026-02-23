import { Component, inject, computed } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, Router, ResolveFn } from '@angular/router';
import { PortableTextPipe } from '../shared/pipes/portable-text.pipe';
import { fetchAvisoLegal } from '../domain/aviso-legal/aviso-legal.action';

export const avisoLegalResolver: ResolveFn<any> = () => fetchAvisoLegal();

export const routeMeta = {
  resolve: { legalData: avisoLegalResolver }
};

@Component({
  selector: 'app-aviso-legal-page',
  standalone: true,
  imports: [PageComponent, CommonModule, PortableTextPipe],
  template: `
    <app-page-component [title]="this.title" category="Legal">
      <div class="container mx-auto px-4 -mt-10 mb-20">
        <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-100 max-w-4xl mx-auto prose prose-slate">

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-surface-900 mb-4">1. Datos Identificativos</h2>
            <p class="text-surface-600">
              En cumprimento co deber de información recollido no artigo 10 da Lei 34/2002, do 11 de xullo, de Servizos da Sociedade da Información e do Comercio Electrónico, a continuación reflíctense os seguintes datos:
            </p>
            <ul class="list-disc ml-6 mt-4 text-surface-600">
              <li><strong>Titular:</strong> {{ data().datosIdentificativos?.name }}</li>
              <li><strong>NIF:</strong> {{ data().datosIdentificativos?.nif }}</li>
              <li><strong>Domicilio:</strong> {{ data().datosIdentificativos?.domicilio }}</li>
              <li><strong>Correo electrónico:</strong> {{ data().datosIdentificativos?.email }}</li>
            </ul>
          </section>

          <div [innerHTML]="data().contenido | portableText"></div>

          <div class="mt-12 pt-8 border-t border-surface-100 text-center not-prose">
            <a (click)="goHome()" class="text-primary-600 font-bold hover:underline cursor-pointer">← Volver ao inicio</a>
          </div>
        </div>
      </div>
    </app-page-component>
  `
})
export default class AvisoLegalPage {
  title = 'Aviso Legal';
  private seo = inject(SeoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly data = computed(() => this.route.snapshot.data['legalData'] || {});

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
