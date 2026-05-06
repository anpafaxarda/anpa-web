import { Component, inject, computed, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, ResolveFn } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { Actividade } from '../domain/actividade/actividade.model';
import { fetchActividades } from '../domain/actividade/actividade.action';

export const actividadesHomeResolver: ResolveFn<Actividade[]> = () => {
  return fetchActividades();
};

export const routeMeta = {
  resolve: {
    actividadesData: actividadesHomeResolver
  }
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- HEADER HERO (Manteño igual) -->
    <header class="relative h-[85vh] flex items-center justify-center overflow-hidden bg-surface-900">
      <div class="absolute inset-0 z-0">
        <img
          src="assets/colegio-image-bg.webp"
          alt="Comunidade ANPA"
          class="w-full h-full object-cover opacity-60 animate-slow-zoom"
        >
        <div class="absolute inset-0 bg-gradient-to-b from-surface-900/40 via-surface-900/60 to-surface-900"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 text-center">
        <span class="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full border border-primary-400/20 animate-fade-in-down">
          Unidos pola educación
        </span>

        <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] animate-fade-in-up">
          Construíndo xuntos o <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-300">
            futuro dos nosos fillos
          </span>
        </h1>

        <p class="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delayed">
          A asociación de familias dedicada a mellorar o día a día do colexio.
          Información, actividades e comunidade nun só lugar.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-more-delayed">
          <a routerLink="/faite-socio" class="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-600/30 hover:-translate-y-1 active:scale-95">
            Facerme Socio/a
          </a>
          <a href="https://afaxarda.wordpress.com/" target="_blank" rel="noopener" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition-all backdrop-blur-sm hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
            Ver o Blog
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>
    </header>

    <!-- SECCIÓN ACTIVIDADES DESTACADAS -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">

        <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div class="max-w-2xl">
            <h2 class="text-xs font-black uppercase tracking-[0.2em] text-primary-600 mb-3">Actividades do curso</h2>
            <h3 class="text-4xl md:text-5xl font-black text-surface-900 leading-tight tracking-tighter">
              O que estamos a facer neste <br>
              <span class="text-primary-600">curso {{ cursoActual }}</span>
            </h3>
          </div>
          <a routerLink="/actividade" class="text-sm font-bold text-surface-400 hover:text-primary-600 transition-all flex items-center gap-2 group mb-2">
            Ver todas as actividades
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>

        <div class="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto pb-10 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          @for (act of actividadesFiltradas(); track act.id) {
            <div class="min-w-[85vw] md:min-w-0 snap-center group">
              <div class="h-full bg-white rounded-[2.5rem] overflow-hidden border border-surface-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col">

                <div class="relative h-72 overflow-hidden">
                  @if (act.imaxeUrl) {
                    <img [src]="act.imaxeUrl" [alt]="act.titulo" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                  }

                  <div class="absolute top-6 left-6 flex flex-col gap-2 items-start">
                    <div class="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-surface-900 shadow-sm">
                      {{ act.data }}
                    </div>

                    @if (act.organizador) {
                      <div class="bg-surface-900 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-lg">
                        {{ act.organizador }}
                      </div>
                    }

                    @if (act.porcentaxeSubvencion) {
                      <div class="bg-primary-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-lg border border-white/20">
                        {{ act.subvencion }}% Subvencionado
                      </div>
                    }
                  </div>
                </div>

                <div class="p-8 flex-grow flex flex-col">
                  <h4 class="text-2xl font-bold text-surface-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{{ act.titulo }}</h4>
                  <p class="text-surface-500 leading-relaxed mb-8 line-clamp-3 italic font-medium">
                    "{{ act.resumo }}"
                  </p>

                  <div class="mt-auto pt-6 border-t border-surface-50">
                    <a [routerLink]="['/actividade/curso/', act.curso, act.slug]" class="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-[0.15em] group/btn">
                      Ler máis
                      <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
    .animate-fade-in-up-delayed { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
    .animate-fade-in-up-more-delayed { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
    .animate-slow-zoom { animation: slowZoom 20s linear infinite alternate; }

    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slowZoom {
      from { transform: scale(1); }
      to { transform: scale(1.1); }
    }
  `],
})
export default class IndexPage implements OnInit {
  title = 'ANPA A Faxarda - CEIP Gregorio Sanz';

  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  readonly cursoActual = this.getCursoEscolarActual();

  readonly actividadesFiltradas = computed(() => {
    const todas = this.route.snapshot.data['actividadesData'] as Actividade[] ?? [];
    return todas.filter(a => a.curso === this.cursoActual);
  });

  private getCursoEscolarActual(): string {
    const hoxe = new Date();
    const anoActual = hoxe.getFullYear();
    const mesActual = hoxe.getMonth();

    if (mesActual >= 8) {
      return `${anoActual}-${anoActual + 1}`;
    } else {
      return `${anoActual - 1}-${anoActual}`;
    }
  }

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Benvidos á web da ANPA A Faxarda. Proxectos, melloras no centro e actividades para enriquecer a experiencia escolar de todos os nenos e nenas.'
    );
  }
}
