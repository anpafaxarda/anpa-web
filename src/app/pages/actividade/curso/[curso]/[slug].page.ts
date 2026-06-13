import { Component, inject, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { PortableTextPipe } from '../../../../shared/pipes/portable-text.pipe';
import { GalicianDatePipe } from '../../../../shared/pipes/galician-date.pipe';
import { PageComponent } from '../../../../shared/components/page.component';
import { ImageGalleryComponent } from '../../../../shared/components/image-gallery.component';
import { Actividade } from '../../../../domain/actividade/actividade.model';
import { fetchActividadeBySlug } from '../../../../domain/actividade/actividade.action';
import { SeoService } from '../../../../core/services/seo.service';

export const actividadeDetailResolver: ResolveFn<Actividade | undefined> = (route) => {
  const slug = route.paramMap.get('slug');
  if (!slug) return Promise.resolve(undefined);
  return fetchActividadeBySlug(slug);
};

export const routeMeta = {
  resolve: {
    actividade: actividadeDetailResolver
  }
};

@Component({
  standalone: true,
  imports: [CommonModule, PortableTextPipe, GalicianDatePipe, PageComponent, NgOptimizedImage, ImageGalleryComponent],
  template: `
    @if (actividade(); as act) {
      <app-page-component
        [category]="act.curso"
        [title]="act.titulo"
        [subTitle]="act.data | galicianDate"
      >
        <div class="max-w-4xl mx-auto">

          <!-- Badges de información (Resumen rápido) -->
          <div class="flex flex-wrap gap-3 mb-8 justify-center mt-2">
            @if (act.organizador) {
              <span class="px-4 py-1.5 bg-cyan-100 text-cyan-800 text-xs font-black uppercase tracking-widest rounded-full border border-cyan-800">
                Organiza: {{ act.organizador }}
              </span>
            }
            @if (act.porcentaxeSubvencion) {
              <span class="px-4 py-1.5 bg-primary-100 text-primary-700 text-xs font-black uppercase tracking-widest rounded-full border border-primary-200">
                Subvencionado ao {{ act.porcentaxeSubvencion }}%
              </span>
            }
            @if (act.nivelEducativo && act.nivelEducativo.length > 0) {
              @for (nivel of act.nivelEducativo; track nivel) {
                <span class="px-4 py-1.5 bg-orange-100 text-orange-900 text-xs font-black uppercase tracking-widest rounded-full border border-orange-300">
                  Curso: {{ nivel }}
                </span>
              }
            }
          </div>

          <!-- Imaxe Principal -->
          <div class="relative h-[40vh] md:h-[60vh] rounded-[3rem] overflow-hidden shadow-2xl mb-16">
            <img
              [ngSrc]="act.imaxePath"
              [alt]="act.titulo"
              fill
              priority
              class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 70vw">
          </div>

          <!-- Contido do Artigo -->
          <div class="prose prose-lg max-w-none text-surface-700 mb-12">
            <div [innerHTML]="act.contidoLongo | portableText"></div>
          </div>

          <!-- Info de Financiamento Detallada (Nueva sección) -->
          @if (act.subvencion) {
            <div class="bg-surface-50 rounded-3xl p-8 mb-20 border border-surface-100">
              <h3 class="text-sm font-bold text-surface-400 uppercase tracking-widest mb-6">Información de financiamento</h3>

              <div class="flex flex-wrap items-center gap-8">
                @if (act.subvencion.logos && act.subvencion.logos.length > 0) {
                  @for (logo of act.subvencion.logos; track $index) {
                    <div class="h-16 w-32 flex items-center">
                      <img [src]="'https://cdn.sanity.io/' + logo + '?w=128&auto=format'"
                           [alt]="act.subvencion.titulo"
                           loading="lazy"
                           class="object-contain grayscale hover:grayscale-0 transition-all max-h-16 w-auto">
                    </div>
                  }
                }

                <div class="flex-1 min-w-[200px]">
                  <p class="text-surface-900 font-bold text-lg mb-1">{{ act.subvencion.titulo }}</p>
                  @if (act.subvencion.entidadeEmisora) {
                    <p class="text-surface-500 text-sm mb-3">Concedida por: {{ act.subvencion.entidadeEmisora }}</p>
                  }
                  @if (act.subvencion.textoLegal) {
                    <p class="text-surface-400 text-xs italic leading-relaxed">{{ act.subvencion.textoLegal }}</p>
                  }
                </div>
              </div>
            </div>
          }

          <!-- Galería de fotos -->
          <app-image-gallery [images]="act.galeria ?? []" />
        </div>
      </app-page-component>
    } @else {
      <div class="h-screen flex items-center justify-center">
        <p class="text-surface-400 font-bold uppercase tracking-widest">Actividade non atopada...</p>
      </div>
    }
  `,
  styles: [`
    :host ::ng-deep .prose p { margin-bottom: 1.5rem; line-height: 1.8; }
    :host ::ng-deep .prose h2 { font-weight: 900; color: #0f172a; margin-top: 3rem; text-transform: uppercase; letter-spacing: -0.025em; }
  `]
})
export default class ActividadeDetailPage {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  readonly actividade = computed(() => this.route.snapshot.data['actividade'] as Actividade);

  ngOnInit() {
    const act = this.actividade();
    if (act) {
      this.seo.setPageMeta(act.titulo, act.resumo, act.imaxeUrl);
    }
  }
}
