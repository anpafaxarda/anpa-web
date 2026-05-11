import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { PageComponent } from '../shared/components/page.component';
import { fetchFaiteSocioData } from '../domain/faite-socio/faite-socio.action';
import { FaiteSocioData } from '../domain/faite-socio/faite-socio.model';
import { SeoService } from '../core/services/seo.service';

export const faiteSocioResolver: ResolveFn<any> = () => {
  return fetchFaiteSocioData();
}

export const routeMeta = {
  resolve: {
    faiteSocioData: faiteSocioResolver
  }
}

@Component({
  selector: 'app-faite-socio-page',
  standalone: true,
  imports: [CommonModule, PageComponent, NgOptimizedImage],
  template: `
    @let data = socioData();

    <app-page-component
      [category]="'Asóciate'"
      [title]="data.title"
      [subTitle]="data.subtitle"
    >
      <div class="max-w-6xl mx-auto px-6">

        <!-- SECCIÓN COTAS (Sin cambios) -->
        <div class="bg-white rounded-[3rem] border border-surface-100 shadow-2xl p-8 md:p-12 mb-16">
          <div class="text-center mb-10">
            <h3 class="text-3xl font-black text-surface-900 mb-2 tracking-tighter">Cotas por Curso Escolar</h3>
            <p class="text-surface-500 font-medium italic">* O sistema detecta automaticamente o tramo vixente segundo a data de hoxe.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div [ngClass]="{
              'bg-primary-50 border-2 border-primary-200 relative shadow-md scale-105 z-10': isBonificado(),
              'bg-surface-50 border border-surface-100 opacity-60 scale-95': !isBonificado()
            }" class="rounded-3xl p-8 transition-all duration-700 mt-4 relative">
              @if (isBonificado()) {
                <div class="absolute top-0 right-6 -translate-y-1/2 bg-primary-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg z-20 uppercase tracking-widest flex items-center gap-2">
                  <span class="flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Actual
                </div>
              }
              <h4 [class]="isBonificado() ? 'text-primary-700' : 'text-surface-500'"
                  class="font-black uppercase tracking-widest text-xs mb-6 text-center pt-2">
                Cota Bonificada (Ata o {{ formatDate(data.finBonificacion) }})
              </h4>
              <div class="space-y-6">
                <div class="flex justify-between items-center border-b border-surface-200 pb-4">
                  <span class="font-bold text-surface-700 font-sans">1 Crianza</span>
                  <span class="text-4xl font-black" [class]="isBonificado() ? 'text-primary-800' : 'text-surface-400'">{{data.cuotaBonificada1}}€</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-bold text-surface-700 font-sans">+1 Crianza</span>
                  <span class="text-4xl font-black" [class]="isBonificado() ? 'text-primary-800' : 'text-surface-400'">{{data.cuotaBonificadaPlus}}€</span>
                </div>
              </div>
            </div>

            <div [ngClass]="{
              'bg-primary-50 border-2 border-primary-200 relative shadow-md scale-105 z-10': !isBonificado(),
              'bg-surface-50 border border-surface-100 opacity-60 scale-95': isBonificado()
            }" class="rounded-3xl p-8 transition-all duration-700 mt-4 relative">
              @if (!isBonificado()) {
                <div class="absolute top-0 right-6 -translate-y-1/2 bg-primary-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg z-20 uppercase tracking-widest flex items-center gap-2">
                  <span class="flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Actual
                </div>
              }
              <h4 [class]="!isBonificado() ? 'text-primary-700' : 'text-surface-500'"
                  class="font-black uppercase tracking-widest text-xs mb-6 text-center pt-2">
                Cota Xeral (Dende o {{ getNextDayFormatted(data.finBonificacion) }})
              </h4>
              <div class="space-y-6">
                <div class="flex justify-between items-center border-b border-surface-200 pb-4">
                  <span class="font-bold text-surface-700 font-sans">1 Crianza</span>
                  <span class="text-4xl font-black" [class]="!isBonificado() ? 'text-primary-800' : 'text-surface-400'">{{data.cuotaGeneral1}}€</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-bold text-surface-700 font-sans">+1 Crianza</span>
                  <span class="text-4xl font-black" [class]="!isBonificado() ? 'text-primary-800' : 'text-surface-400'">{{data.cuotaGeneralPlus}}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN DESCARGA APP -->
        <div class="bg-surface-900 rounded-[3rem] p-8 md:p-16 text-white mb-20 relative overflow-hidden shadow-2xl">
          <div class="flex flex-col lg:flex-row items-center gap-12 relative z-10">

            <!-- Columna Logotipo e Texto -->
            <div class="flex flex-col sm:flex-row items-center gap-6 lg:flex-grow text-center sm:text-left">
              <div class="w-24 h-24 bg-white rounded-[2rem] shadow-xl transform -rotate-3">
                <img src="/assets/abaco-logo.webp" alt="Ábaco Logo" class="w-full h-full object-contain">
              </div>
              <div>
                <h3 class="text-4xl font-black mb-2 tracking-tighter leading-tight text-balance">¿Listo para comezar?</h3>
                <p class="text-surface-400 font-medium text-lg max-w-sm">Descarga <b>Ábaco Familias</b> e xestiona todo desde a túa man.</p>
              </div>
            </div>

            <!-- Botóns de Tenda -->
            <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a [href]="data.urlIOS" target="_blank" class="bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-3 w-48 hover:bg-surface-800 transition-all shadow-lg border border-surface-700">
                <svg class="w-7 h-7" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <div class="text-left leading-tight font-sans">
                  <p class="text-[9px] font-medium uppercase leading-none mb-1 text-surface-400">Download on the</p>
                  <p class="text-lg font-semibold -mt-1 leading-none text-white">App Store</p>
                </div>
              </a>

              <a [href]="data.urlAndroid" target="_blank" class="bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-3 w-48 hover:bg-surface-800 transition-all shadow-lg border border-surface-700">
                <svg class="w-7 h-7" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 58.9-34.1c18-10.3 18-27.3 0-37.7zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <div class="text-left leading-tight font-sans">
                  <p class="text-[9px] font-medium uppercase leading-none mb-1 text-surface-400">Get it on</p>
                  <p class="text-lg font-semibold -mt-1 leading-none text-white">Google Play</p>
                </div>
              </a>
            </div>
          </div>
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary-600/20 rounded-full blur-3xl"></div>
        </div>

        <!-- TITORIAL DIVIDIDO POR BLOQUES -->
        @if (data.tutorialSteps && data.tutorialSteps.length > 0) {

          <!-- BLOQUE 1: REXISTRO -->
          <div class="bg-white rounded-[3rem] border border-surface-100 shadow-2xl p-8 md:p-12 mb-16">
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div class="text-left">
                <span class="text-primary-600 font-black uppercase tracking-widest text-sm">Paso 1</span>
                <h3 class="text-4xl font-black text-surface-900 tracking-tighter">Primeiros pasos: Rexistro</h3>
              </div>
              <p class="text-surface-500 font-medium italic max-w-md">Como darte de alta e configurar a túa conta por primeira vez.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              @for (step of registrationSteps(); track step.title) {
                <ng-container *ngTemplateOutlet="stepTemplate; context: { $implicit: step, index: $index + 1 }"></ng-container>
              }
            </div>
          </div>

          <!-- BLOQUE 2: USO DA APP -->
          <div class="bg-white rounded-[3rem] border border-surface-100 shadow-2xl p-8 md:p-12 mb-16">
            <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div class="text-left">
                <span class="text-primary-600 font-black uppercase tracking-widest text-sm">Paso 2</span>
                <h3 class="text-4xl font-black text-surface-900 tracking-tighter">Explora a túa App</h3>
              </div>
              <p class="text-surface-500 font-medium italic max-w-md">Saca o máximo proveito ás ferramentas que ofrece o ANPA.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              @for (step of usageSteps(); track step.title) {
                <ng-container *ngTemplateOutlet="stepTemplate; context: { $implicit: step, index: $index + 1 }"></ng-container>
              }
            </div>
          </div>
        }
      </div>
    </app-page-component>

    <!-- TEMPLATE REUTILIZABLE PARA CADA MÓVIL -->
    <ng-template #stepTemplate let-step let-index="index">
      <div class="flex flex-col items-center group">
        <div class="relative mx-auto border-surface-900 bg-surface-900 border-[8px] rounded-[2rem] h-[520px] w-[250px] shadow-2xl mb-8 overflow-hidden">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-surface-900 z-20 rounded-b-2xl mt-0"></div>
          <img [ngSrc]="step.imagePath" [alt]="step.title"
               fill
               class="h-full w-full object-cover transition-transform duration-1000"
               sizes="250px">
          <div class="absolute bottom-4 right-4 w-10 h-10 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
            {{ index }}
          </div>
        </div>
        <div class="text-center px-4">
          <h4 class="font-black text-xl mb-3 text-surface-900 leading-tight">{{ step.title }}</h4>
          <p class="text-surface-600 font-medium text-sm italic leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </ng-template>
  `
})
export default class FaiteSocioPage implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  readonly socioData = computed(() => this.route.snapshot.data['faiteSocioData'] as FaiteSocioData);

  // Filtramos los pasos de Rexistro (aquellos que tengan isRegistration: true en Sanity)
  readonly registrationSteps = computed(() =>
    this.socioData()?.tutorialSteps?.filter(s => s.isRegistration) || []
  );

  // Filtramos los pasos de Uso (aquellos que tengan isRegistration: false o no lo tengan)
  readonly usageSteps = computed(() =>
    this.socioData()?.tutorialSteps?.filter(s => !s.isRegistration) || []
  );

  readonly isBonificado = computed(() => {
    const data = this.socioData();
    if (!data?.inicioBonificacion || !data?.finBonificacion) return false;
    const hoxe = new Date();
    const inicio = new Date(data.inicioBonificacion);
    const fin = new Date(data.finBonificacion);
    fin.setHours(23, 59, 59);
    return hoxe >= inicio && hoxe <= fin;
  });

  ngOnInit() {
    const data = this.socioData();
    this.seo.setPageMeta(
      `${data.title || 'Faite socio/a'} - ANPA A Faxarda`,
      data.subtitle || 'Únete ao ANPA A Faxarda.'
    );
  }

  private meses = [
    'xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño',
    'xullo', 'agosto', 'setembro', 'outubro', 'novembro', 'decembro'
  ];

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = this.meses[date.getMonth()];
    return `${day} de ${month}`;
  }

  getNextDayFormatted(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 1);
    const day = date.getDate();
    const month = this.meses[date.getMonth()];
    return `${day} de ${month}`;
  }
}
