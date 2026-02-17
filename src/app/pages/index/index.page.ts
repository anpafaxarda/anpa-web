import { Component, computed, effect, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { load } from './index.server';
import { injectLoad } from '@analogjs/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Actividad } from '../../domain/actividades/actividades.model';
import { PortableTextPipe } from "../../shared/pipes/portable-text.pipe";

/**
 * Esta es la página de index, si us
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PortableTextPipe],
  template: `
     <main class="container mx-auto p-8">
      <h1 class="text-3xl font-bold mb-6">Extraescolares del ANPA</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @for (actividad of actividades(); track $index) {
          <div class="bg-white border p-4 rounded shadow">
            <img [src]="actividad.imagenUrl" class="w-full h-48 object-cover rounded">

            <div class="p-4">
              <h3 class="text-xl font-bold text-slate-900 mb-2">{{ actividad.nombre }}</h3>

              <div class="programa-content" [innerHTML]="actividad.programa | portableText"></div>

              <span class="badge-precio mt-4 inline-block">{{ actividad.precio }}</span>
            </div>
          </div>
        }
      </div>

    </main>
  `,
})
export default class Home {
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
    // Esto es CLAVE para depurar:
    effect(() => {
      console.log('Estado de data():', this.data());
    });
  }
}
