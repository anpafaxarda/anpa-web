import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GlobalDataService } from '../services/global-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-surface-900 text-white pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div class="md:col-span-1">
            <h4 class="font-bold text-xl mb-6 text-primary-400">{{ generalData().shortName }}</h4>
            <p class="text-surface-400 text-sm leading-relaxed mb-6">
              {{ generalData().footerText }}
            </p>
            <p class="font-bold text-surface-400 text-xs leading-relaxed mb-6">
              {{ generalData().legalName }}
            </p>
            <div class="flex gap-4">
              <a href="https://www.instagram.com/anpafaxarda/"
                 target="_blank"
                 rel="noopener"
                 aria-label="Seguir ao ANPA en Instagram"
                 class="bg-surface-800 p-2 rounded-full hover:bg-pink-600 transition-colors cursor-pointer">
                <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.facebook.com/p/Anpa-A-Faxarda-100064561605320/"
                 target="_blank"
                 rel="noopener"
                 aria-label="Seguir ao ANPA en Facebook"
                 class="bg-surface-800 p-2 rounded-full hover:bg-primary-600 transition-colors cursor-pointer">
                <svg class="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-6 text-primary-400">Servizos</h4>
            <ul class="space-y-3 text-surface-400 text-sm">
              <li><a routerLink="/extraescolares" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Extraescolares</a></li>
              <li><a routerLink="/bus-escolar" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Bus Escolar</a></li>
              <li><a routerLink="/bos-dias-tardes" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Bos días e Tardes</a></li>
              <li><a href="https://afaxarda.wordpress.com/" target="_blank" rel="noopener" class="hover:text-white transition-colors cursor-pointer block">Blog do ANPA ↗</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-6 text-primary-400">O ANPA</h4>
            <ul class="space-y-3 text-surface-400 text-sm">
              <li><a routerLink="/labor-anpa" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">O noso labor</a></li>
              <li><a routerLink="/actividade" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Actividades</a></li>
              <li><a routerLink="/colaboradores" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Colaboradores</a></li>
              <li><a routerLink="/beneficios" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Beneficios Socios</a></li>
              <li><a routerLink="/directiva" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Xunta Directiva</a></li>
              <li><a routerLink="/estatutos" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Estatutos</a></li>
              <li><a routerLink="/asambleas" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Asembleas</a></li>
              <li><a routerLink="/contacto" (click)="scrollToTop()" class="hover:text-white transition-colors cursor-pointer block">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-lg mb-6 text-primary-400">Información</h4>
            <p class="text-surface-400 text-sm mb-2">{{ generalData().address }}</p>
            <p class="text-surface-400 text-sm mb-2">{{ generalData().schoolName }}</p>
            <p class="text-surface-300 text-sm mb-2 font-medium">
              <a [href]="'mailto:'+contacto().email">{{ contacto().email }}</a>
            </p>
            <p class="text-surface-300 text-sm mb-6 font-medium">
              <a [href]="'tel:+34'+contacto().telefono">{{ buildPhoneNumberToDisplay() }}</a>
            </p>

            <div class="flex flex-col gap-2 pt-4 border-t border-surface-800 text-xs text-surface-500">
              <a routerLink="/faite-socio" (click)="scrollToTop()" class="hover:underline cursor-pointer py-1">Faite Socio</a>
              <a routerLink="/aviso-legal" (click)="scrollToTop()" class="hover:underline cursor-pointer py-1">Aviso Legal</a>
              <a routerLink="/privacidad" (click)="scrollToTop()" class="hover:underline cursor-pointer py-1">Privacidade</a>
              <a routerLink="/politica-cookies" (click)="scrollToTop()" class="hover:underline cursor-pointer py-1">Política de Cookies</a>
            </div>
          </div>

        </div>

        <div class="border-t border-surface-800 pt-8 text-center">
          <p class="text-surface-500 text-xs font-medium">
            {{ generalData().footerCopyright }}
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private globalDataService = inject(GlobalDataService);

  readonly generalData = this.globalDataService.generalData;
  readonly contacto = this.globalDataService.contacto;

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  buildPhoneNumberToDisplay(): string {
    return [
      '+34',
      this.contacto().telefono.substring(0, 3),
      this.contacto().telefono.substring(3, 6),
      this.contacto().telefono.substring(6, 9)
    ].join(' ');
  }
}
