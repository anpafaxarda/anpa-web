import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">

          <a routerLink="/" class="flex items-center gap-3 group">
            <div class="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="font-black text-xl leading-none tracking-tighter text-slate-800">ANPA A Faxarda</span>
              <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-600">CEIP Gregorio Sanz de Ribadeo</span>
            </div>
          </a>

          <div class="hidden lg:flex items-center gap-1">

            @for (item of mainItems; track item.path) {
              <a [routerLink]="item.path"
                 routerLinkActive="text-blue-600 bg-blue-50"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all">
                {{ item.label }}
              </a>
            }

            <div class="relative ml-2">
              <button
                (click)="toggleDropdown()"
                (mouseenter)="isDropdownOpen.set(true)"
                class="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
                Sobre el ANPA
                <svg class="w-4 h-4 transition-transform" [class.rotate-180]="isDropdownOpen()" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              @if (isDropdownOpen()) {
                <div
                  (mouseleave)="isDropdownOpen.set(false)"
                  class="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl py-2 animate-in fade-in zoom-in duration-150">
                  @for (sub of dropdownItems; track sub.path) {
                    <a [routerLink]="sub.path"
                       class="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      {{ sub.label }}
                    </a>
                  }
                </div>
              }
            </div>

            <a href="https://tu-blog.blogger.com"
               target="_blank"
               rel="noopener noreferrer"
               class="ml-4 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-blue-600 transition-all flex items-center gap-2">
              Blog
              <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"></path></svg>
            </a>
          </div>

          <button (click)="isMobileMenuOpen.set(!isMobileMenuOpen())" class="lg:hidden p-2 text-slate-600">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path [class.hidden]="isMobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
               <path [class.hidden]="!isMobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
             </svg>
          </button>
        </div>
      </div>

      @if (isMobileMenuOpen()) {
        <div class="lg:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-4 shadow-inner">
          @for (item of [...mainItems, ...dropdownItems]; track item.path) {
            <a [routerLink]="item.path" (click)="isMobileMenuOpen.set(false)" class="block text-lg font-medium text-slate-700">{{item.label}}</a>
          }
          <a href="https://blog.com" target="_blank" class="block text-lg font-bold text-blue-600">Blog Externo ↗</a>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  isDropdownOpen = signal(false);
  isMobileMenuOpen = signal(false);

  // Enlaces que siempre se ven
  mainItems = [
    { label: 'Quiénes somos', path: '/quienes-somos' },
    { label: 'Extraescolares', path: '/extraescolares' },
    { label: 'Eventos', path: '/eventos' },
    { label: 'Contacto', path: '/contacto' },
  ];

  // Enlaces agrupados en el Dropdown
  dropdownItems = [
    { label: 'La labor del ANPA', path: '/labor-anpa' },
    { label: 'Beneficios del socio', path: '/beneficios' },
    { label: 'Asambleas', path: '/asambleas' },
    { label: 'Iniciativas', path: '/iniciativas' },
    { label: 'Locales colaboradores', path: '/locales' },
  ];

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }
}
