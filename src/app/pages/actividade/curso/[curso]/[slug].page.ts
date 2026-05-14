import { Component, inject, computed, signal, HostListener, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { PortableTextPipe } from '../../../../shared/pipes/portable-text.pipe';
import { PageComponent } from '../../../../shared/components/page.component';
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
  imports: [CommonModule, PortableTextPipe, PageComponent, NgOptimizedImage],
  template: `
    @if (actividade(); as act) {
      <app-page-component
        [category]="act.curso"
        [title]="act.titulo"
        [subTitle]="act.data"
      >
        <div class="max-w-4xl mx-auto">

          <!-- Badges de información (Resumen rápido) -->
          <div class="flex flex-wrap gap-3 mb-8 justify-center">
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
          @if (act.galeria && act.galeria.length > 0) {
            <div class="border-t border-surface-100 pt-16">
              <h3 class="text-3xl font-black text-surface-900 mb-10 text-center uppercase tracking-tighter">
                Galería de imaxes
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @for (foto of act.galeria; track $index) {
                  <div class="relative h-80 rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
                       (click)="openLightbox($index)">
                    <img [ngSrc]="foto"
                         fill
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                         alt="Imaxe da galería">
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <svg class="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                      </svg>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Lightbox -->
            @if (lightboxIndex() !== null) {
              <div class="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
                   (click)="closeLightbox()">

                <!-- Botón pechar -->
                <button class="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
                        aria-label="Pechar galería"
                        (click)="closeLightbox()">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>

                <!-- Contador -->
                <div class="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold">
                  {{ lightboxIndex()! + 1 }} / {{ act.galeria.length }}
                </div>

                <!-- Frecha anterior -->
                @if (lightboxIndex()! > 0) {
                  <button class="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
                          aria-label="Imaxe anterior"
                          (click)="$event.stopPropagation(); prevImage()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                }

                <!-- Imaxe -->
                <div class="max-w-5xl max-h-[85vh] w-full h-full mx-16 flex items-center justify-center"
                     (click)="$event.stopPropagation()">
                  @if (lightboxLoading()) {
                    <div class="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  }
                  <img [src]="sanityUrl(act.galeria[lightboxIndex()!])"
                       (load)="lightboxLoading.set(false)"
                       [class.hidden]="lightboxLoading()"
                       class="max-w-full max-h-[85vh] object-contain"
                       alt="Imaxe da galería">
                </div>

                <!-- Frecha seguinte -->
                @if (lightboxIndex()! < act.galeria.length - 1) {
                  <button class="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
                          aria-label="Imaxe seguinte"
                          (click)="$event.stopPropagation(); nextImage()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                }
              </div>
            }
          }
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
  private platformId = inject(PLATFORM_ID);

  readonly actividade = computed(() => this.route.snapshot.data['actividade'] as Actividade);
  readonly lightboxIndex = signal<number | null>(null);
  readonly lightboxLoading = signal(false);

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.lightboxIndex() === null) return;
    const galeria = this.actividade()?.galeria ?? [];
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight' && this.lightboxIndex()! < galeria.length - 1) this.nextImage();
    if (event.key === 'ArrowLeft' && this.lightboxIndex()! > 0) this.prevImage();
  }

  sanityUrl(path: string): string {
    return `https://cdn.sanity.io/${path}?w=1200&auto=format`;
  }

  private preloadAdjacent(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const galeria = this.actividade()?.galeria ?? [];
    [index - 1, index + 1].forEach(i => {
      if (i >= 0 && i < galeria.length) {
        const img = new Image();
        img.src = this.sanityUrl(galeria[i]);
      }
    });
  }

  openLightbox(index: number) {
    this.lightboxLoading.set(true);
    this.lightboxIndex.set(index);
    this.preloadAdjacent(index);
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxIndex.set(null);
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = '';
  }

  nextImage() {
    const next = this.lightboxIndex()! + 1;
    this.lightboxLoading.set(true);
    this.lightboxIndex.set(next);
    this.preloadAdjacent(next);
  }

  prevImage() {
    const prev = this.lightboxIndex()! - 1;
    this.lightboxLoading.set(true);
    this.lightboxIndex.set(prev);
    this.preloadAdjacent(prev);
  }

  ngOnInit() {
    const act = this.actividade();
    if (act) {
      this.seo.setPageMeta(act.titulo, act.resumo, act.imaxeUrl);
    }
  }
}
