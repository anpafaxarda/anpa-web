import { Component, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-white border-b border-surface-200 sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">

          <a (click)="navigateTo('/')" class="flex items-center gap-3 group cursor-pointer">
            <div class="relative flex items-center justify-center w-12 h-12 bg-white border border-surface-100 rounded-xl shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300">
              <img src="/favicon.ico" alt="ANPA A Faxarda" class="w-8 h-8 object-contain">
            </div>
            <div class="flex flex-col">
              <span class="font-black text-xl leading-none tracking-tighter text-[rgb(72,159,67)]">ANPA A Faxarda</span>
              <span class="text-[10px] uppercase tracking-[0.2em] font-bold text-black">CEIP Gregorio Sanz de Ribadeo</span>
            </div>
          </a>

          <div class="hidden lg:flex items-center gap-1">
            @for (item of mainItems; track item.path) {
              <a (click)="navigateTo(item.path)"
                 [class.text-primary-600]="currentPath() === item.path"
                 [class.bg-primary-50]="currentPath() === item.path"
                 class="px-4 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-primary-600 hover:bg-surface-50 transition-all cursor-pointer">
                {{ item.label }}
              </a>
            }

            <div class="relative ml-2" (mouseenter)="openDropdown('servicios')" (mouseleave)="closeDropdownWithDelay()">
              <button class="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50 transition-all"
                      [class.text-primary-600]="activeDropdown() === 'servicios'">
                Servicios
                <svg class="w-4 h-4 transition-transform" [class.rotate-180]="activeDropdown() === 'servicios'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              @if (activeDropdown() === 'servicios') {
                <div class="absolute right-0 pt-2 w-56 z-[60] animate-in fade-in zoom-in-95 duration-150">
                  <div class="bg-white border border-surface-100 rounded-xl shadow-xl py-2">
                    @for (sub of serviciosItems; track sub.path) {
                      <a (click)="navigateTo(sub.path)"
                         [class.text-primary-600]="currentPath() === sub.path"
                         class="block px-4 py-2.5 text-sm text-surface-600 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer">
                        {{ sub.label }}
                      </a>
                    }
                  </div>
                </div>
              }
            </div>

            <div class="relative ml-2" (mouseenter)="openDropdown('anpa')" (mouseleave)="closeDropdownWithDelay()">
              <button class="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50 transition-all"
                      [class.text-primary-600]="activeDropdown() === 'anpa'">
                Sobre el ANPA
                <svg class="w-4 h-4 transition-transform" [class.rotate-180]="activeDropdown() === 'anpa'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              @if (activeDropdown() === 'anpa') {
                <div class="absolute right-0 pt-2 w-56 z-[60] animate-in fade-in zoom-in-95 duration-150">
                  <div class="bg-white border border-surface-100 rounded-xl shadow-xl py-2">
                    @for (sub of anpaItems; track sub.path) {
                      <a (click)="navigateTo(sub.path)"
                         [class.text-primary-600]="currentPath() === sub.path"
                         class="block px-4 py-2.5 text-sm text-surface-600 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer">
                        {{ sub.label }}
                      </a>
                    }
                  </div>
                </div>
              }
            </div>

            <a href="https://afaxarda.wordpress.com/" target="_blank" rel="noopener noreferrer"
               class="ml-4 px-5 py-2.5 bg-surface-900 text-white text-sm font-bold rounded-full hover:bg-primary-600 transition-all flex items-center gap-2">
              Blog <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"></path></svg>
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
        <div class="lg:hidden bg-white border-t border-surface-100 px-4 py-6 space-y-2 shadow-inner overflow-y-auto max-h-[80vh]">
          @for (item of mainItems; track item.path) {
            <a (click)="navigateTo(item.path)"
               [class.text-primary-600]="currentPath() === item.path"
               class="block py-3 px-4 text-lg font-medium text-surface-700 cursor-pointer">{{item.label}}</a>
          }
          </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  private router = inject(Router);

  currentPath = signal(this.router.url);
  activeDropdown = signal<string | null>(null);
  mobileGroupOpen = signal<string | null>(null);
  isMobileMenuOpen = signal(false);
  private closeTimeout: any;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentPath.set(this.router.url);
    });
  }

  mainItems = [
    { label: 'Labor ANPA', path: '/labor-anpa' },
    { label: 'Iniciativas', path: '/iniciativas' },
    { label: 'Colaboradores', path: '/colaboradores' },
  ];

  serviciosItems = [
    { label: 'Extraescolares', path: '/extraescolares' },
    { label: 'Bus Escolar', path: '/bus-escolar' },
    { label: 'Bos días / Tardes', path: '/bos-dias-tardes' },
  ];

  anpaItems = [
    { label: 'Beneficios', path: '/beneficios' },
    { label: 'A Xunta Directiva', path: '/xunta-directiva' },
    { label: 'Asambleas', path: '/asambleas' },
    { label: 'Contacto', path: '/contacto' },
  ];

  navigateTo(path: string) {
    this.forceClose();
    this.router.navigate([path]);
  }

  openDropdown(name: string) {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    this.activeDropdown.set(name);
  }

  closeDropdownWithDelay() {
    this.closeTimeout = setTimeout(() => {
      this.activeDropdown.set(null);
    }, 150);
  }

  forceClose() {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    this.activeDropdown.set(null);
    this.isMobileMenuOpen.set(false);
  }

  toggleMobileGroup(group: string) {
    this.mobileGroupOpen.update(current => current === group ? null : group);
  }
}
