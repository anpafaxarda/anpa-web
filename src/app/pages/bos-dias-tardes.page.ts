import { Component, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../shared/components/page.component';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, Router, ResolveFn } from '@angular/router';
import { fetchConciliacionData } from '../domain/bos-dias-tardes/bos-dias-tardes.action';
import { BosDiasTardesResponse } from '../domain/bos-dias-tardes/bos-dias-tardes.model';

export const conciliacionResolver: ResolveFn<BosDiasTardesResponse> = () => fetchConciliacionData();

export const routeMeta = {
  resolve: { conciliacionData: conciliacionResolver }
};

@Component({
  standalone: true,
  imports: [CommonModule, PageComponent],
  template: `
    <app-page-component
      [title]="data().intro.title || 'Bos días e Tardes'"
      [category]="data().intro.category || 'Servizos'">

      <div class="container mx-auto px-4 -mt-10 space-y-12 animate-in fade-in duration-500">

        <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-100">
          <h2 class="text-2xl font-black text-surface-900 mb-4">
            {{ data().intro.seccionIntro.titulo }}
          </h2>
          <p class="text-surface-600 leading-relaxed">
            {{ data().intro.seccionIntro.texto }}
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <span class="text-3xl">☀️</span>
            <h3 class="text-2xl font-black text-surface-900">Tarifas Bos Días</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (item of data().config.tramosTemprano; track item.horario) {
              <div class="bg-white p-5 rounded-2xl border-2 border-primary-50 flex justify-between items-center group hover:border-primary-200 transition-colors shadow-sm">
                <span class="text-surface-600 font-bold">{{ item.horario }}</span>
                <span class="text-2xl font-black text-primary-600 font-mono">{{ item.prezo }}€<small class="text-xs text-surface-400">/mes</small></span>
              </div>
            }

            <div class="bg-primary-50 p-5 rounded-2xl border-2 border-primary-100 flex flex-col justify-center text-center shadow-sm">
               <span class="text-primary-700 font-black text-xs uppercase mb-1 leading-none tracking-tight">Día Solto</span>
               <div class="flex justify-around items-baseline px-2 mt-1">
                 <span class="text-xl font-black text-primary-800 font-mono">{{ data().config.prezosSoltos.hora }}€<small class="text-[10px]">/h</small></span>
                 <span class="text-xl font-black text-primary-800 font-mono">{{ data().config.prezosSoltos.mediaHora }}€<small class="text-[10px]">/1/2h</small></span>
               </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🌙</span>
            <h3 class="text-2xl font-black text-surface-900">Tarifas Boas Tardes</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            @for (item of data().config.tramosTarde; track item.concepto) {
              <div class="bg-white p-6 rounded-3xl border-2 border-surface-100 flex flex-col items-center text-center group hover:border-primary-200 transition-colors shadow-sm">
                <span class="text-surface-500 text-[10px] font-black uppercase mb-2 tracking-widest">{{ item.concepto }}</span>
                <span class="text-3xl font-black text-surface-900 font-mono">{{ item.prezo }}€<small class="text-sm">/mes</small></span>
              </div>
            }
          </div>
        </div>

        <div class="bg-amber-50 border-2 border-amber-100 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
          <div class="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
            <div class="lg:w-1/3 text-center lg:text-left">
              <span class="bg-amber-200 text-amber-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Beneficios Socios</span>
              <h3 class="text-3xl font-black text-amber-900 mt-4 italic">Aforra co ANPA</h3>
            </div>

            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              @for (bono of data().config.bonificacions; track bono.titulo) {
                <div class="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-amber-200 shadow-sm">
                  <span class="text-3xl font-black text-amber-600 mb-2 block leading-none">{{ bono.titulo }}</span>
                  <p class="text-amber-900 font-bold text-sm leading-snug">{{ bono.descripcion }}</p>
                </div>
              }
            </div>
          </div>
          <div class="absolute -right-10 -top-10 text-9xl opacity-10 select-none rotate-12">💎</div>
        </div>

        <div class="bg-primary-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div class="max-w-md">
            <h4 class="text-2xl font-black mb-2 leading-none text-white italic">Inscrición aberta</h4>
            <p class="text-primary-100 opacity-90">Descarga o formulario de conciliación e envíao asinado ao correo do ANPA para reservar a túa praza.</p>
          </div>
          <a (click)="navigateToContacto()" class="w-full md:w-auto px-10 py-4 bg-white text-primary-600 rounded-full font-black hover:scale-105 transition-transform shadow-lg cursor-pointer text-center uppercase tracking-tight">
            Solicitar praza
          </a>
        </div>

      </div>
    </app-page-component>
  `
})
export default class BosDiasTardesPage implements OnInit {
  private seo = inject(SeoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Usamos el tipado fuerte aquí
  readonly data = computed(() => this.route.snapshot.data['conciliacionData'] as BosDiasTardesResponse);

  ngOnInit() {
    this.seo.setPageMeta(
      this.data().intro.title || 'Bos días e Tardes',
      'Prezos e horarios dos servizos de conciliación no CEIP Gregorio Sanz.'
    );
  }

  navigateToContacto() {
    this.router.navigate(['/contacto']);
  }
}
