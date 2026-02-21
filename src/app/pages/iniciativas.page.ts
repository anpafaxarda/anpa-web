import { Component, inject } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-iniciativas-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [category]="'Proxectos Reais'"
      [title]="title"
      [subTitle]="'Accións concretas que desenvolvemos para apoiar o crecemento e formación do alumnado do CEIP Gregorio Sanz.'"
    >
      <div class="max-w-5xl mx-auto px-4">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

          <div class="bg-white rounded-3xl border border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div class="h-48 bg-blue-50 flex items-center justify-center text-6xl">🧠</div>
            <div class="p-8">
              <h3 class="text-xl font-black text-surface-900 mb-3">Programa 'Coñécete'</h3>
              <p class="text-surface-600 text-sm leading-relaxed mb-4">
                Iniciativa de educación afectivo-sexual e xestión emocional dirixida ao alumnado de 4º, 5º e 6º de primaria, centrada no autocoñecemento e o respecto.
              </p>
              <span class="text-[10px] font-bold uppercase tracking-widest text-blue-600 px-2 py-1 bg-blue-50 rounded-md">Benestar</span>
            </div>
          </div>

          <div class="bg-white rounded-3xl border border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div class="h-48 bg-orange-50 flex items-center justify-center text-6xl">🧼</div>
            <div class="p-8">
              <h3 class="text-xl font-black text-surface-900 mb-3">Saúde e Hixiene</h3>
              <p class="text-surface-600 text-sm leading-relaxed mb-4">
                Campañas informativas e obradoiros sobre a importancia da hixiene persoal e os cambios corporais na etapa de desenvolvemento.
              </p>
              <span class="text-[10px] font-bold uppercase tracking-widest text-orange-600 px-2 py-1 bg-orange-50 rounded-md">Saúde</span>
            </div>
          </div>

          <div class="bg-white rounded-3xl border border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div class="h-48 bg-primary-50 flex items-center justify-center text-6xl">⏰</div>
            <div class="p-8">
              <h3 class="text-xl font-black text-surface-900 mb-3">Servizos de Conciliación</h3>
              <p class="text-surface-600 text-sm leading-relaxed mb-4">
                Xestión directa dos programas Bos Días e Boas Tardes, facilitando que as familias poidan compaxinar a vida laboral co horario escolar.
              </p>
              <span class="text-[10px] font-bold uppercase tracking-widest text-primary-600 px-2 py-1 bg-primary-50 rounded-md">Familia</span>
            </div>
          </div>

          <div class="bg-white rounded-3xl border border-surface-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div class="h-48 bg-purple-50 flex items-center justify-center text-6xl">🎭</div>
            <div class="p-8">
              <h3 class="text-xl font-black text-surface-900 mb-3">Festas e Tradicións</h3>
              <p class="text-surface-600 text-sm leading-relaxed mb-4">
                Colaboración activa na organización do Magosto, Nadal e outras festividades que forman parte da identidade da nosa vila e centro.
              </p>
              <span class="text-[10px] font-bold uppercase tracking-widest text-purple-600 px-2 py-1 bg-purple-50 rounded-md">Comunidade</span>
            </div>
          </div>

        </div>

        <div class="pt-4">
          <div class="group relative block overflow-hidden rounded-[2.5rem] bg-primary-600 p-8 md:p-12 text-center shadow-md hover:shadow-xl transition-all">
            <div class="relative z-10 max-w-3xl mx-auto">
              <h2 class="text-3xl font-black text-white mb-4">Queres participar nestas accións?</h2>
              <p class="text-primary-100 mb-8 text-lg">A túa axuda como socio/a permite que programas como 'Coñécete' sigan sendo unha realidade para os nosos fillos.</p>

              <a href="/beneficios" class="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-full font-bold group-hover:scale-105 transition-transform">
                Ver vantaxes de socio
              </a>
            </div>

            <div class="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-primary-500 opacity-50 transition-transform group-hover:scale-125"></div>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class IniciativasPage {
  title = 'Iniciativas';

  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Coñece os proxectos reais do ANPA A Faxarda: dende o programa Coñécete de educación emocional ata a xestión de servizos de conciliación.'
    );
  }
}
