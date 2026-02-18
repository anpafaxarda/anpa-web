import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-slate-900 text-white pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 class="font-bold text-xl mb-6 text-blue-400">ANPA Colegio</h4>
            <p class="text-slate-400 text-sm leading-relaxed mb-6">
              Participando activamente en la comunidad educativa para construir
              el mejor futuro para nuestros hijos e hijas.
            </p>
            <div class="flex gap-4">
              <a href="https://www.instagram.com/anpafaxarda/" target="_blank" class="bg-slate-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/p/Anpa-A-Faxarda-100064561605320/?locale=es_ES" target="_blank" class="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-6 text-blue-400">Navegación</h4>
            <ul class="grid grid-cols-2 gap-2 text-slate-400 text-sm">
              <li><a href="/quienes-somos" class="hover:text-white transition-colors">Quiénes somos</a></li>
              <li><a href="/extraescolares" class="hover:text-white transition-colors">Extraescolares</a></li>
              <li><a href="/blog" class="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contacto" class="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-6 text-blue-400">Información</h4>
            <p class="text-slate-400 text-sm mb-2">Local ANPA - Planta Baja</p>
            <p class="text-slate-400 text-sm mb-4">anpa&#64;colegio.com</p>
            <div class="flex flex-col gap-2 text-xs text-slate-500">
              <a href="/legal" class="hover:underline">Aviso Legal</a>
              <a href="/privacidad" class="hover:underline">Privacidad</a>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 text-center">
          <p class="text-slate-500 text-xs">
            © 2026 ANPA. Hecho con ❤️ para nuestra comunidad escolar.
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
