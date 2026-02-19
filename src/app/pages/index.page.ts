import { Component } from '@angular/core';;
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="relative h-[85vh] flex items-center justify-center overflow-hidden bg-surface-900">
      <div class="absolute inset-0 z-0">
        <img
          src="assets/colegio-image-bg.webp"
          alt="Comunidad ANPA"
          class="w-full h-full object-cover opacity-60 animate-slow-zoom"
        >
        <div class="absolute inset-0 bg-gradient-to-b from-surface-900/40 via-surface-900/60 to-surface-900"></div>
      </div>

      <div class="relative z-10 container mx-auto px-4 text-center">
        <span class="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full border border-primary-400/20 animate-fade-in-down">
          Unidos por la educación
        </span>

        <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] animate-fade-in-up">
          Construyendo juntos el <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-300">
            futuro de nuestros hijos
          </span>
        </h1>

        <p class="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delayed">
          La asociación de familias dedicada a mejorar el día a día del colegio.
          Información, actividades y comunidad en un solo lugar.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-more-delayed">
          <a routerLink="/beneficios" class="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-600/30 hover:-translate-y-1 active:scale-95">
            Hacerse Socio
          </a>
          <a href="https://afaxarda.wordpress.com/" target="_blank" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/30 transition-all backdrop-blur-sm hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
            Ver el Blog
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out 0.2s forwards; opacity: 0; }
    .animate-fade-in-up-delayed { animation: fadeInUp 0.8s ease-out 0.4s forwards; opacity: 0; }
    .animate-fade-in-up-more-delayed { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
    .animate-slow-zoom { animation: slowZoom 20s linear infinite alternate; }

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
export default class IndexPage {}
