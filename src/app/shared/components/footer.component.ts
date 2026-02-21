import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-surface-900 text-white pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div class="md:col-span-1">
            <h4 class="font-bold text-xl mb-6 text-primary-400">ANPA A Faxarda</h4>
            <p class="text-surface-400 text-sm leading-relaxed mb-6">
              Participando activamente na comunidade educativa do CEIP Gregorio Sanz
              para construír o mellor futuro para os nosos fillos e fillas.
            </p>
            <div class="flex gap-4">
              <a href="https://www.instagram.com/anpafaxarda/"
                 target="_blank"
                 rel="noopener"
                 aria-label="Seguir ao ANPA en Instagram"
                 class="bg-surface-800 p-2 rounded-full hover:bg-pink-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/p/Anpa-A-Faxarda-100064561605320/"
                 target="_blank"
                 rel="noopener"
                 aria-label="Seguir ao ANPA en Facebook"
                 class="bg-surface-800 p-2 rounded-full hover:bg-primary-600 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-6 text-primary-400">Servizos</h4>
            <ul class="space-y-3 text-surface-400 text-sm">
              <li><a (click)="navigateTo('/extraescolares')" class="hover:text-white transition-colors cursor-pointer">Extraescolares</a></li>
              <li><a (click)="navigateTo('/bus-escolar')" class="hover:text-white transition-colors cursor-pointer">Bus Escolar</a></li>
              <li><a (click)="navigateTo('/bos-dias-tardes')" class="hover:text-white transition-colors cursor-pointer">Bos días e Tardes</a></li>
              <li><a (click)="navigateTo('/beneficios')" class="hover:text-white transition-colors cursor-pointer">Beneficios Socios</a></li>
              <li><a href="https://afaxarda.wordpress.com/" target="_blank" rel="noopener" class="hover:text-white transition-colors">Blog do ANPA ↗</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-6 text-primary-400">O ANPA</h4>
            <ul class="space-y-3 text-surface-400 text-sm">
              <li><a (click)="navigateTo('/labor-anpa')" class="hover:text-white transition-colors cursor-pointer">O noso labor</a></li>
              <li><a (click)="navigateTo('/iniciativas')" class="hover:text-white transition-colors cursor-pointer">Iniciativas</a></li>
              <li><a (click)="navigateTo('/asambleas')" class="hover:text-white transition-colors cursor-pointer">Asembleas</a></li>
              <li><a (click)="navigateTo('/directiva')" class="hover:text-white transition-colors cursor-pointer">Xunta Directiva</a></li>
              <li><a (click)="navigateTo('/colaboradores')" class="hover:text-white transition-colors cursor-pointer">Colaboradores</a></li>
              <li><a (click)="navigateTo('/contacto')" class="hover:text-white transition-colors cursor-pointer">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-6 text-primary-400">Información</h4>
            <p class="text-surface-400 text-sm mb-2">Local ANPA - Planta Baixa</p>
            <p class="text-surface-400 text-sm mb-2">CEIP Gregorio Sanz</p>
            <p class="text-surface-300 text-sm mb-6 font-medium">anpafaxarda&#64;gmail.com</p>

            <div class="flex flex-col gap-2 pt-4 border-t border-surface-800 text-xs text-surface-500">
              <a (click)="navigateTo('/aviso-legal')" class="hover:underline cursor-pointer">Aviso Legal</a>
              <a (click)="navigateTo('/privacidade')" class="hover:underline cursor-pointer">Privacidade</a>
              <a (click)="navigateTo('/politica-cookies')" class="hover:underline cursor-pointer">Política de Cookies</a>
            </div>
          </div>

        </div>

        <div class="border-t border-surface-800 pt-8 text-center">
          <p class="text-surface-500 text-xs font-medium">
            © 2026 ANPA A Faxarda. Ribadeo. Feito con ❤️ para a nosa comunidade escolar.
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private router = inject(Router);

  navigateTo(path: string) {
    this.router.navigate([path]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
