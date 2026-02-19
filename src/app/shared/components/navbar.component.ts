import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white border-b border-surface-200 sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">

          <a routerLink="/" class="flex items-center gap-3 group">
   <div class="relative flex items-center justify-center w-12 h-12 bg-white border border-surface-100 rounded-xl shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300">

    <img
      src="/favicon.ico"
      alt="ANPA A Faxarda"
      class="w-8 h-8 object-contain"
    >

  </div>
<div class="flex flex-col">
    <span class="font-black text-xl leading-none tracking-tighter text-[rgb(72,159,67)]">
      ANPA A Faxarda
    </span>
    <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-black">
      CEIP Gregorio Sanz de Ribadeo
    </span>
  </div>
          </a>

          <div class="hidden lg:flex items-center gap-1">

            @for (item of mainItems; track item.path) {
              <a [routerLink]="item.path"
                 routerLinkActive="text-primary-600 bg-primary-50"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="px-4 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-surface-50 transition-all">
                {{ item.label }}
              </a>
            }

            <div class="relative ml-2">
              <button
                (click)="toggleDropdown()"
                (mouseenter)="isDropdownOpen.set(true)"
                class="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50 transition-all">
                Sobre el ANPA
                <svg class="w-4 h-4 transition-transform" [class.rotate-180]="isDropdownOpen()" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              @if (isDropdownOpen()) {
                <div
                  (mouseleave)="isDropdownOpen.set(false)"
                  class="absolute right-0 mt-2 w-56 bg-white border border-surface-100 rounded-xl shadow-xl py-2 animate-in fade-in zoom-in duration-150">
                  @for (sub of dropdownItems; track sub.path) {
                    <a [routerLink]="sub.path"
                       class="block px-4 py-2.5 text-sm text-surface-600 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                      {{ sub.label }}
                    </a>
                  }
                </div>
              }
            </div>

            <a href="https://afaxarda.wordpress.com/"
               target="_blank"
               rel="noopener noreferrer"
               class="ml-4 px-5 py-2.5 bg-surface-900 text-white text-sm font-bold rounded-full hover:bg-primary-600 transition-all flex items-center gap-2">
              Blog
              <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"></path></svg>
            </a>
          </div>

          <button (click)="isMobileMenuOpen.set(!isMobileMenuOpen())" class="lg:hidden p-2 text-surface-600">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path [class.hidden]="isMobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
               <path [class.hidden]="!isMobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
             </svg>
          </button>
        </div>
      </div>

      @if (isMobileMenuOpen()) {
        <div class="lg:hidden bg-white border-t border-surface-100 px-4 py-6 space-y-4 shadow-inner">
          @for (item of [...mainItems, ...dropdownItems]; track item.path) {
            <a [routerLink]="item.path" (click)="isMobileMenuOpen.set(false)" class="block text-lg font-medium text-surface-700">{{item.label}}</a>
          }
          <a href="https://afaxarda.wordpress.com/" target="_blank" class="block text-lg font-bold text-primary-600">Blog Externo ↗</a>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  isDropdownOpen = signal(false);
  isMobileMenuOpen = signal(false);

  mainItems = [
    { label: 'La labor del ANPA', path: '/labor-anpa' },
    { label: 'Iniciativas', path: '/iniciativas' },
    { label: 'Extraescolares', path: '/extraescolares' },
    { label: 'Locales colaboradores', path: '/colaboradores' },
  ];

  dropdownItems = [
    { label: 'Beneficios del socio', path: '/beneficios' },
    { label: 'La Junta Directiva', path: '/directiva' },
    { label: 'Asambleas', path: '/asambleas' },
    { label: 'Contacto', path: '/contacto' },
  ];

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }
}
