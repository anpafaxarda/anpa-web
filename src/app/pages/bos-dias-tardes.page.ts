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

        <div class="space-y-6">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🕐</span>
            <h3 class="text-2xl font-black text-surface-900">Día Solto</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-6 rounded-3xl border-2 border-surface-100 flex flex-col items-center text-center group hover:border-primary-200 transition-colors shadow-sm">
              <span class="text-surface-500 text-[10px] font-black uppercase mb-2 tracking-widest">Por hora</span>
              <span class="text-3xl font-black text-surface-900 font-mono">{{ data().config.prezosSoltos.hora }}€</span>
            </div>
            <div class="bg-white p-6 rounded-3xl border-2 border-surface-100 flex flex-col items-center text-center group hover:border-primary-200 transition-colors shadow-sm">
              <span class="text-surface-500 text-[10px] font-black uppercase mb-2 tracking-widest">Por media hora</span>
              <span class="text-3xl font-black text-surface-900 font-mono">{{ data().config.prezosSoltos.mediaHora }}€</span>
            </div>
          </div>

          <p class="text-surface-500 text-sm">Válido tanto para Bos Días coma para Boas Tardes.</p>
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
          <p class="relative z-10 mt-6 text-xs text-amber-800/70 font-semibold">Descontos acumulables só para socios/as ao corrente de pagamento.</p>
          <div class="absolute -right-10 -top-10 text-9xl opacity-10 select-none rotate-12">💎</div>
        </div>

        @if (data().intro.condicionsPagamento?.length || data().intro.bonoAxuda) {
          <div class="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-surface-100 space-y-8">
            <div class="flex items-center gap-3">
              <span class="text-3xl">⚖️</span>
              <h3 class="text-2xl font-black text-surface-900">Condicións do servizo</h3>
            </div>

            @if (data().intro.condicionsPagamento?.length) {
              <div>
                <h4 class="text-sm font-black uppercase tracking-widest text-surface-400 mb-4">Condicións e pagamento</h4>
                <ul class="space-y-3">
                  @for (condicion of data().intro.condicionsPagamento; track condicion) {
                    <li class="flex items-start gap-3 text-surface-600 leading-relaxed">
                      <span class="text-primary-500 font-black mt-0.5">•</span>
                      <span>{{ condicion }}</span>
                    </li>
                  }
                </ul>
              </div>
            }

            @if (data().intro.bonoAxuda) {
              <div class="bg-primary-50 border border-primary-100 rounded-2xl p-6 flex gap-4 items-start">
                <span class="text-2xl">🎗️</span>
                <div>
                  <h4 class="font-black text-primary-800 mb-1">Bono-Axuda</h4>
                  <p class="text-primary-900/80 text-sm leading-relaxed">{{ data().intro.bonoAxuda }}</p>
                </div>
              </div>
            }
          </div>
        }

        @if (data().intro.entidadesColaboradoras?.length) {
          <div class="text-center">
            <h4 class="text-xs font-black uppercase tracking-widest text-surface-400 mb-6">Coa colaboración de</h4>
            <div class="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              @for (entidade of data().intro.entidadesColaboradoras; track entidade.nombre) {
                <div class="flex flex-col items-center gap-2">
                  <img [src]="entidade.logoUrl" [alt]="entidade.nombre" class="h-14 w-auto object-contain">
                  <span class="text-xs font-bold text-surface-500">{{ entidade.nombre }}</span>
                </div>
              }
            </div>
          </div>
        }

        <div class="bg-primary-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div class="max-w-md">
            <h4 class="text-2xl font-black mb-2 leading-none text-white italic">{{ inscripcionAberta() ? 'Inscrición aberta' : 'Inscrición pechada' }}</h4>
            <p class="text-primary-100 opacity-90">{{ data().intro.inscripcionTexto || 'Descarga o formulario de conciliación e envíao asinado ao correo do ANPA para reservar a túa praza.' }}</p>
          </div>
          @if (data().intro.inscripcionArchivoUrl) {
            <a [href]="data().intro.inscripcionArchivoUrl" target="_blank" rel="noopener" download class="w-full md:w-auto px-10 py-4 bg-white text-primary-600 rounded-full font-black hover:scale-105 transition-transform shadow-lg cursor-pointer text-center uppercase tracking-tight">
              Descargar folla de inscrición
            </a>
          } @else {
            <a (click)="navigateToContacto()" class="w-full md:w-auto px-10 py-4 bg-white text-primary-600 rounded-full font-black hover:scale-105 transition-transform shadow-lg cursor-pointer text-center uppercase tracking-tight">
              Solicitar praza
            </a>
          }
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

  // Pechado en xullo (6) e agosto (7); aberto o resto do curso (setembro a xuño)
  readonly inscripcionAberta = computed(() => {
    const mes = new Date().getMonth();
    return mes !== 6 && mes !== 7;
  });

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
