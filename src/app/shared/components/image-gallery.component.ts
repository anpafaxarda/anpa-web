import { Component, Input, signal, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    @if (images.length > 0) {
      <div class="border-t border-surface-100 pt-16">
        <h3 class="text-3xl font-black text-surface-900 mb-10 text-center uppercase tracking-tighter">
          Galería de imaxes
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (foto of images; track $index) {
            <div class="relative h-80 rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
                 (click)="openLightbox($index)">
              <img [ngSrc]="foto"
                   fill
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
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
            {{ lightboxIndex()! + 1 }} / {{ images.length }}
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
            <img [src]="sanityUrl(images[lightboxIndex()!])"
                 (load)="lightboxLoading.set(false)"
                 [class.hidden]="lightboxLoading()"
                 class="max-w-full max-h-[85vh] object-contain"
                 alt="Imaxe da galería">
          </div>

          <!-- Frecha seguinte -->
          @if (lightboxIndex()! < images.length - 1) {
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
  `
})
export class ImageGalleryComponent {
  @Input() images: string[] = [];

  private platformId = inject(PLATFORM_ID);

  readonly lightboxIndex = signal<number | null>(null);
  readonly lightboxLoading = signal(false);

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.lightboxIndex() === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight' && this.lightboxIndex()! < this.images.length - 1) this.nextImage();
    if (event.key === 'ArrowLeft' && this.lightboxIndex()! > 0) this.prevImage();
  }

  sanityUrl(path: string): string {
    return `https://cdn.sanity.io/${path}?w=1200&auto=format`;
  }

  private preloadAdjacent(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    [index - 1, index + 1].forEach(i => {
      if (i >= 0 && i < this.images.length) {
        const img = new Image();
        img.src = this.sanityUrl(this.images[i]);
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
}
