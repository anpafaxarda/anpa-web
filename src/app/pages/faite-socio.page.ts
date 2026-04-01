import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, PageComponent],
template: `
    @let data = socioData();

    <app-page-component
      [category]="'Asóciate'"
      [title]="data.title"
      [subTitle]="data.subtitle"
    >
      <div class="max-w-5xl mx-auto px-4">

        <div class="bg-white rounded-[3rem] border border-surface-100 shadow-2xl p-8 md:p-12 mb-16">
          <div class="text-center mb-10">
            <h3 class="text-3xl font-black text-surface-900 mb-2 tracking-tighter">Cotas por Curso Escolar</h3>
            <p class="text-surface-500 font-medium italic">* O sistema detecta automaticamente o tramo vixente segundo a data de hoxe.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div [ngClass]="{
              'bg-primary-50 border-2 border-primary-200 relative shadow-md scale-105 z-10': isBonificado(),
              'bg-surface-50 border border-surface-100 opacity-50 scale-95': !isBonificado()
            }" class="rounded-3xl p-8 transition-all duration-700">
              @if (isBonificado()) {
                <div class="absolute top-4 right-4 bg-primary-600 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse">ACTUAL</div>
              }
              <h4 [class]="isBonificado() ? 'text-primary-700' : 'text-surface-500'" class="font-black uppercase tracking-widest text-xs mb-6 text-center">Cota Bonificada</h4>
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
              'bg-surface-50 border border-surface-100 opacity-50 scale-95': isBonificado()
            }" class="rounded-3xl p-8 transition-all duration-700">
              @if (!isBonificado()) {
                <div class="absolute top-4 right-4 bg-primary-600 text-white text-[10px] font-black px-3 py-1 rounded-full animate-pulse">ACTUAL</div>
              }
              <h4 [class]="!isBonificado() ? 'text-primary-700' : 'text-surface-500'" class="font-black uppercase tracking-widest text-xs mb-6 text-center">Cota Xeral</h4>
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

          <div class="mt-12 text-center">
            <a [href]="data.urlAppWeb" target="_blank" rel="noopener noreferrer"
               class="inline-block bg-[rgb(72,159,67)] text-white px-10 py-4 rounded-2xl font-black text-xl hover:shadow-xl hover:-translate-y-1 transition-all shadow-lg cursor-pointer">
              Acceder á plataforma de xestión ↗
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          @for (feature of data.features; track feature.title) {
            <div class="bg-white p-10 rounded-[2.5rem] border border-surface-100 shadow-xl flex flex-col items-center text-center group hover:border-primary-200 transition-all duration-500">
              <div class="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                {{ feature.icon }}
              </div>
              <h4 class="font-black text-2xl mb-4 text-surface-900 leading-tight">{{ feature.title }}</h4>
              <p class="text-surface-600 font-medium leading-relaxed italic">{{ feature.description }}</p>
            </div>
          }
        </div>

        <div class="bg-surface-900 rounded-[3rem] p-8 md:p-16 text-white mb-20 relative overflow-hidden shadow-2xl">
          <div class="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div class="flex-grow text-center lg:text-left">
              <h3 class="text-4xl font-black mb-4 tracking-tighter leading-tight text-balance">Leva o ANPA contigo</h3>
              <p class="text-surface-400 font-medium text-lg max-w-md mx-auto lg:mx-0">Xestiona pagos e comunicación desde a nosa App oficial.</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <a [href]="data.urlIOS" target="_blank" class="bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-3 w-48 hover:bg-surface-800 transition-all shadow-lg border border-surface-700">
                <svg class="w-7 h-7" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                <div class="text-left leading-tight font-sans">
                  <p class="text-[9px] font-medium uppercase leading-none mb-1">Download on the</p>
                  <p class="text-lg font-semibold -mt-1 leading-none text-white">App Store</p>
                </div>
              </a>

              <a [href]="data.urlAndroid" target="_blank" class="bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-3 w-48 hover:bg-surface-800 transition-all shadow-lg border border-surface-700">
                <svg class="w-7 h-7" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 58.9-34.1c18-10.3 18-27.3 0-37.7zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                <div class="text-left leading-tight font-sans">
                  <p class="text-[9px] font-medium uppercase leading-none mb-1">Get it on</p>
                  <p class="text-lg font-semibold -mt-1 leading-none text-white">Google Play</p>
                </div>
              </a>
            </div>
          </div>
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-primary-600/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </app-page-component>
  `
})
export default class FaiteSocioPage implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  readonly socioData = computed(() => this.route.snapshot.data['faiteSocioData'] as FaiteSocioData);

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
}
