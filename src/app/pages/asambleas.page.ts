import { Component, computed, inject } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';
import { ActivatedRoute, ResolveFn } from '@angular/router'; // Importamos lo necesario
import { fetchAsambleas } from "../domain/asambleas/asamblea.action"; // Importamos la acción directamente
import { Asamblea } from '../domain/asambleas/asamblea.model';

export const asambleasResolver: ResolveFn<any> = () => {
  return fetchAsambleas();
};

export const routeMeta = {
  resolve: {
    asambleasData: asambleasResolver
  }
};

@Component({
  selector: 'app-asambleas-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [category]="'Transparencia'"
      [title]="title"
      [subTitle]="'Consulta as convocatorias e decisións tomadas nas nosas asembleas.'"
    >
      <div class="max-w-5xl mx-auto px-4">

        <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm mb-12">
          <div class="flex flex-col md:flex-row gap-8 items-center">
            <div class="flex-grow text-left">
              <h2 class="text-2xl font-black text-surface-900 mb-4">A túa voz conta</h2>
              <p class="text-surface-600 leading-relaxed">
                Como asociación democrática, o ANPA A Faxarda convoca periodicamente a todos os seus socios e socias. Aquí podes ver o histórico de reunións e os temas tratados, reafirmando o noso compromiso coa transparencia absoluta na xestión.
              </p>
            </div>
            <div class="shrink-0">
               <div class="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner">🗳️</div>
            </div>
          </div>
        </div>

        <div class="space-y-8 mb-20">
          <h3 class="text-xl font-bold text-surface-900 flex items-center gap-2">
            <span class="w-8 h-1 bg-primary-500 rounded-full"></span>
            Próximas e recentes
          </h3>
          @if (asambleas() && asambleas().length > 0) {
            @for (asamblea of asambleas(); track asamblea._id) {
              <div class="group relative bg-white rounded-3xl border border-surface-100 p-6 md:p-8 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">

                  <div class="space-y-2 text-left">
                    <div class="flex items-center gap-3">
                      <span class="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-black uppercase tracking-wider rounded-lg">
                        {{ asamblea.tipo || 'Asemblea' }}
                      </span>
                      <span class="text-surface-400 text-sm font-medium italic">
                        {{ asamblea.fecha | date:'dd/MM/yyyy' }}
                      </span>
                    </div>
                    <h4 class="text-xl font-black text-surface-900 group-hover:text-primary-600 transition-colors">
                      {{ asamblea.titulo }}
                    </h4>
                    <p class="text-surface-500 text-sm flex items-center gap-1">
                      📍 {{ asamblea.lugar || 'Biblioteca do Centro' }}
                    </p>
                  </div>

                  <div class="flex flex-wrap gap-2 md:justify-end">
                    <button (click)="avisoSocio()"
                      class="flex items-center gap-2 px-5 py-2.5 bg-surface-900 text-white text-sm font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-surface-900/10 cursor-pointer">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                      Solicitar Acta
                    </button>
                  </div>
                                </div>

                @if (asamblea.ordenDia && asamblea.ordenDia.length > 0) {
                  <div class="mt-6 pt-6 border-t border-dashed border-surface-100 text-left">
                    <p class="text-[10px] font-black uppercase tracking-widest text-surface-400 mb-3">Orde do día:</p>
                    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      @for (item of asamblea.ordenDia; track item) {
                        <li class="text-sm text-surface-600 flex items-start gap-2">
                          <span class="text-primary-400 font-bold">•</span> {{ item }}
                        </li>
                      }
                    </ul>
                  </div>
                }
              </div>
            }
          } @else if (asambleas() && asambleas().length === 0) {
            <div class="text-center py-20 bg-surface-50 rounded-3xl border border-dashed border-surface-200">
              <p class="text-surface-400 italic">Non hai asembleas publicadas polo momento.</p>
            </div>
          }
        </div>

        <div class="pt-4">
          <div class="group relative block overflow-hidden rounded-[2.5rem] bg-primary-600 p-8 md:p-12 text-center shadow-md hover:shadow-xl transition-all">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-2xl font-black text-white mb-4">Tes algunha dúbida ou proposta?</h2>
              <p class="text-primary-100 mb-8">Se non puideches asistir ou queres trasladar un punto para a próxima orde do día, ponte en contacto con nós.</p>

              <a href="/contacto" class="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-full font-bold group-hover:scale-105 transition-transform">
                Enviar mensaxe
              </a>
            </div>
            <div class="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-primary-500 opacity-50 transition-transform group-hover:scale-125"></div>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class AsambleasPage {
  title = 'Asembleas e Transparencia';

  private route = inject(ActivatedRoute);

  readonly asambleas = computed(() => this.route.snapshot.data['asambleasData'] as Asamblea[] ?? []);

  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Histórico de asembleas do ANPA A Faxarda. Consulta convocatorias, ordes do día e actas para estar ao tanto da xestión do colexio.'
    );
  }

  avisoSocio() {
    alert('As actas detalladas están dispoñibles exclusivamente para os socios e socias do ANPA. Se es socio/a e non a recibiches por correo, por favor, contacta con nós.');
  }
}
