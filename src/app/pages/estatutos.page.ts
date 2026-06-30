import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { PortableTextPipe } from '../shared/pipes/portable-text.pipe';
import { PageComponent } from '../shared/components/page.component';
import { EstatutosData } from '../domain/estatutos/estatutos.model';
import { fetchEstatutos } from '../domain/estatutos/estatutos.action';
import { GlobalDataService } from '../shared/services/global-data.service';

export const estatutosResolver: ResolveFn<EstatutosData> = () => fetchEstatutos();

export const routeMeta = {
  resolve: {
    estatutosData: estatutosResolver
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, PortableTextPipe, PageComponent],
  template: `
    <app-page-component
        [category]="header()?.badge || 'Transparencia'"
        [title]="header()?.title || 'Estatutos da Asociación'"
        [subTitle]="header()?.subtitle || 'Consulta o marco normativo que rexe o funcionamento do ANPA A Faxarda do CEIP Gregorio Sanz.'"
    >
      <div class="max-w-4xl mx-auto px-4 md:px-0">

        <div class="mb-12 p-8 bg-surface-50 rounded-[2.5rem] border border-surface-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
           <div class="text-center md:text-left">
             <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 block mb-1">Última Adaptación</span>
             <span class="text-lg font-bold text-surface-900 leading-none">{{ data().ultimaActualizacion }}</span>
           </div>

           @if (data().pdfUrl) {
             <a [href]="data().pdfUrl"
                target="_blank"
                class="flex items-center gap-3 bg-white border-2 border-primary-500 text-primary-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-sm">
                <span>📄</span> DESCARGAR PDF OFICIAL
             </a>
           }
        </div>

        <div class="space-y-20">
          @for (seccion of data().secciones; track seccion.titulo) {
            <article class="animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div class="flex items-center gap-6 mb-8">
                <span class="flex-none w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm">
                   §
                </span>
                <h2 class="text-2xl md:text-3xl font-black text-surface-900 tracking-tight leading-tight">
                  {{ seccion.titulo }}
                </h2>
                <div class="flex-grow h-px bg-surface-100 hidden md:block"></div>
              </div>

              <div class="portable-text bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-surface-100 text-surface-700 leading-relaxed relative overflow-hidden">
                <div class="absolute -right-8 -bottom-8 text-surface-50 opacity-10 select-none pointer-events-none transform -rotate-12">
                   <span class="text-[120px] font-black uppercase tracking-tighter">ANPA</span>
                </div>

                <div [innerHTML]="seccion.contenido | portableText"></div>
              </div>
            </article>
          }
        </div>

        <div class="mt-24 pt-12 border-t border-surface-100 text-center">
            <h3 class="text-sm font-black text-surface-400 uppercase tracking-widest mb-6">Datos de Rexistro</h3>
            <div class="inline-grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
              <div class="p-4">
                <p class="text-[10px] font-black text-primary-500 uppercase mb-1">Domicilio Social</p>
                <p class="text-xs font-bold text-surface-600 leading-snug">
                  {{ data().domicilio }}<br>
                  {{ data().codigoPostal }} {{ data().localidad }}
                </p>
              </div>
              <div class="p-4 border-l border-surface-100">
                <p class="text-[10px] font-black text-primary-500 uppercase mb-1">Identificación</p>
                <p class="text-xs font-bold text-surface-600 leading-snug">
                  {{ data().nombreAsociacion }}<br>
                  Registro provincial de asociaciones inscrición nº {{ data().numInscripcion }}
                </p>
              </div>
            </div>
        </div>
      </div>
    </app-page-component>
  `,
  styles: [`
    .portable-text ::ng-deep p {
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
    }
    .portable-text ::ng-deep strong {
      color: #0f172a;
      font-weight: 900;
      background: linear-gradient(120deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
    }
    .portable-text ::ng-deep ul {
      margin-left: 1.5rem;
      margin-bottom: 1.5rem;
      list-style-type: none;
    }
    .portable-text ::ng-deep li {
      position: relative;
      margin-bottom: 0.75rem;
      padding-left: 1.5rem;
    }
    .portable-text ::ng-deep li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #3b82f6;
      font-weight: bold;
    }
  `]
})
export default class EstatutosPage {
  private route = inject(ActivatedRoute);
  private globalData = inject(GlobalDataService);
  readonly header = computed(() => this.globalData.pageHeaders()?.estatutos);

  readonly data = computed(() => this.route.snapshot.data['estatutosData'] as EstatutosData);
}
