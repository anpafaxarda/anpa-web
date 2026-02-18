import { injectLoad } from '@analogjs/router';
import { Component, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { load } from './extraescolares.server';
import { PortableTextPipe } from '../shared/pipes/portable-text.pipe';
import { CommonModule } from '@angular/common';
import { Actividad } from '../domain/actividades/actividades.model';
import { PageComponent } from '../shared/components/page.component';

@Component({
  standalone: true,
  imports: [CommonModule, PortableTextPipe, PageComponent],
  template: `
      <app-page-component
        [category]="'Labor del ANPA'"
        [title]="'Actividades Extraescolares'"
        [subTitle]="'Estas actividades extraescolares están organizadas por el ANPA A Faxarda en colaboración con el colegio CEIP Gregorio Sanz de Ribadeo para la cesión de espacios dónde realizarlas.'"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> @for (actividad of actividades(); track actividad.name) {
            <div class="bg-white rounded-3xl shadow-xl border border-surface-100 overflow-hidden flex flex-col md:flex-row group transition-all duration-300">

              <div class="md:w-1/3 relative h-64 md:h-auto bg-surface-100">
                @if (actividad.imageUrl) {
                  <img [src]="actividad.imageUrl" [alt]="actividad.name" class="w-full h-full object-cover">
                }
                <div class="absolute inset-0 bg-gradient-to-t from-surface-900/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 text-white">
                  <p class="text-[10px] font-bold uppercase tracking-widest opacity-80">Precio</p>
                  <p class="text-lg font-black">{{ actividad.price }}</p>
                </div>
              </div>

              <div class="md:w-2/3 p-8 flex flex-col">
                <div class="flex justify-between items-start mb-4">
                  <h3 class="text-2xl font-black text-surface-900">{{ actividad.name }}</h3>
                  <span class="bg-primary-600/10 text-primary-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {{ actividad.coursePeriod }}
                  </span>
                </div>

                <div class="portable-text text-surface-600 text-sm leading-relaxed mb-6 flex-grow"
                     [innerHTML]="actividad.description | portableText">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-surface-50">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-surface-100 flex items-center justify-center text-primary-600 text-xs">🕒</div>
                    <span class="text-xs font-bold text-surface-700">{{ actividad.classDuration }}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 text-xs">📅</div>
                    <span class="text-xs font-bold text-primary-700">Inscripción: {{ actividad.enrollmentPeriod }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
    </app-page-component>
  `,
  styles: [`
    .portable-text ::ng-deep p { margin-bottom: 1rem; }
    .portable-text ::ng-deep ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
    .portable-text ::ng-deep strong { color: var(--color-surface-900); font-weight: 700; }
  `]
})
export default class ExtraescolaresPage {
  title = 'Extraescolares';
  private readonly load$ = injectLoad<typeof load>();

  /**
   *  Se necesita usar injectLoad para la función load para que se recuperen los datos
   * en la generación SSG, la conversión toSignal es necesaria debido a que el framework
   * está devolviendo un observable y se requiere de un signal para usar computed para obtener el valor
   * de la promesa
   */
  private readonly data = toSignal(this.load$, {
    initialValue: { actividades: [] as Actividad[] }
  });

  /**
   * Usamos el método computed para que el valor se obtenga una única vez en lugar de calcularlo cada vez que
   * se accede al valor de la variable
   */
  readonly actividades = computed(() => this.data()?.actividades ?? []);

  constructor() {
    effect(() => {
      console.debug('Actividades data:', this.data());
    });
  }
}
