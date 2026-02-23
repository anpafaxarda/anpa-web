import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteMeta } from '@analogjs/router';
import { PortableTextPipe } from '../shared/pipes/portable-text.pipe';
import { fetchPoliticaPrivacidade } from '../domain/politica-privacidad/politica-privacidad.action';
import { PoliticaPrivacidadeData } from '../domain/politica-privacidad/politica-privacidad.model';

export const privacidadeResolver = () => {
  return fetchPoliticaPrivacidade();
};

export const routeMeta: RouteMeta = {
  resolve: {
    privacidadeData: privacidadeResolver
  }
};

@Component({
  selector: 'app-privacidad-page',
  standalone: true,
  imports: [PageComponent, CommonModule, PortableTextPipe],
  template: `
    <app-page-component
      [title]="data().title || 'Política de Privacidade'"
      [category]="data().category || 'Legal'">

      <div class="container mx-auto px-4 -mt-10 mb-20">
        <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-100 max-w-4xl mx-auto">

          <div class="prose prose-slate max-w-none" [innerHTML]="data().contenido | portableText"></div>

          <div class="mt-12 pt-8 border-t border-surface-100 text-center">
            <button (click)="goHome()" class="text-primary-600 font-bold hover:underline cursor-pointer bg-transparent border-none">
              ← Volver ao inicio
            </button>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class PrivacidadPage implements OnInit {
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Computed para extraer los datos del resolve siguiendo tu patrón
  readonly data = computed<PoliticaPrivacidadeData>(() =>
    this.route.snapshot.data['privacidadeData'] ?? { title: '', category: '', contenido: [] }
  );

  ngOnInit() {
    this.seo.setPageMeta(
      this.data().title || 'Política de Privacidade',
      'Información detallada sobre como protexemos e xestionamos os datos persoais das familias e socios seguindo o RGPD.'
    );
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
