import { Component, inject } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-labor-anpa-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [category]="'O noso compromiso'"
      [title]="title"
      [subTitle]="'Traballamos día a día para facer do CEIP Gregorio Sanz un lugar mellor para os nosos fillos e fillas.'"
    >
      <div class="max-w-5xl mx-auto px-4">

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

          <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:shadow-md transition-all border-t-4 border-t-primary-500 text-left">
            <div class="text-3xl mb-4">📢</div>
            <h3 class="text-xl font-black text-surface-900 mb-3">Representación</h3>
            <p class="text-surface-600 text-sm leading-relaxed">
              Somos a voz das familias ante o Consello Escolar e a dirección, trasladando inquedanzas e propostas de mellora.
            </p>
          </div>

          <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:shadow-md transition-all border-t-4 border-t-primary-500 text-left">
            <div class="text-3xl mb-4">🚌</div>
            <h3 class="text-xl font-black text-surface-900 mb-3">Xestión de Servizos</h3>
            <p class="text-surface-600 text-sm leading-relaxed">
              Coordinamos o bus escolar, o programa Bos Días/Boas Tardes e as actividades extraescolares para facilitar a conciliación.
            </p>
          </div>

          <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:shadow-md transition-all border-t-4 border-t-primary-500 text-left">
            <div class="text-3xl mb-4">🏗️</div>
            <h3 class="text-xl font-black text-surface-900 mb-3">Mellora do Centro</h3>
            <p class="text-surface-600 text-sm leading-relaxed">
              Colaboramos na adquisición de material didáctico, tecnolóxico e na mellora das instalacións (patio, aulas, etc).
            </p>
          </div>

          <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:shadow-md transition-all border-t-4 border-t-primary-500 text-left">
            <div class="text-3xl mb-4">🎉</div>
            <h3 class="text-xl font-black text-surface-900 mb-3">Eventos e Festas</h3>
            <p class="text-surface-600 text-sm leading-relaxed">
              Organizamos o Magosto, Nadal, Entroido e a festa de fin de curso, creando momentos inesquecibles.
            </p>
          </div>

          <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:shadow-md transition-all border-t-4 border-t-primary-500 text-left">
            <div class="text-3xl mb-4">💰</div>
            <h3 class="text-xl font-black text-surface-900 mb-3">Axudas e Bolsas</h3>
            <p class="text-surface-600 text-sm leading-relaxed">
              Mantemos ás familias informadas sobre bolsas de comedor, libros de texto e outras subvencións públicas.
            </p>
          </div>

          <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:shadow-md transition-all border-t-4 border-t-primary-500 text-left">
            <div class="text-3xl mb-4">🤝</div>
            <h3 class="text-xl font-black text-surface-900 mb-3">Apoio Mutuo</h3>
            <p class="text-surface-600 text-sm leading-relaxed">
              Creamos unha rede de apoio entre familias para resolver dúbidas e compartir información relevante.
            </p>
          </div>
        </div>

        <div class="pt-4">
          <div class="group relative block overflow-hidden rounded-[2.5rem] bg-primary-600 p-8 md:p-12 text-center shadow-md hover:shadow-xl transition-all">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-3xl font-black text-white mb-6">Por que facerte socio/a?</h2>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                <div class="flex items-start gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <span class="bg-white/20 p-1 rounded-full text-white text-xs font-bold">✓</span>
                  <p class="text-sm font-medium text-white">Servizos de conciliación xestionados polo ANPA.</p>
                </div>
                <div class="flex items-start gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <span class="bg-white/20 p-1 rounded-full text-white text-xs font-bold">✓</span>
                  <p class="text-sm font-medium text-white">Descontos en extraescolares e comercios.</p>
                </div>
                <div class="flex items-start gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                  <span class="bg-white/20 p-1 rounded-full text-white text-xs font-bold">✓</span>
                  <p class="text-sm font-medium text-white">Voto directo nas asembleas e decisións.</p>
                </div>
              </div>

              <p class="text-primary-100 italic border-l-2 border-primary-400 pl-4 text-left inline-block">
                "Unha asociación forte é a base dunha escola mellor."
              </p>
            </div>

            <div class="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-primary-500 opacity-50 transition-transform group-hover:scale-125"></div>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class LaborAnpaPage {
  title = 'Labor do ANPA';

  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Descubre que facemos no ANPA A Faxarda: representamos ás familias, xestionamos servizos e traballamos pola mellora do CEIP Gregorio Sanz.'
    );
  }
}
