import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { load } from './index.server';
import { injectLoad } from '@analogjs/router';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Esta es la página de index, si us
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
     <main class="container mx-auto p-8">
      <h1 class="text-3xl font-bold mb-6">Extraescolares del ANPA</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @for (actividad of actividades(); track actividad.nombre) {
          <div class="card-actividad"> <img [src]="actividad.imagenUrl" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-xl font-bold">{{ actividad.nombre }}</h3>
              <p class="text-gray-600">{{ actividad.monitor }}</p>
              <span class="badge-precio mt-2 inline-block">{{ actividad.precio }}</span>
            </div>
          </div>
        }
      </div>
    </main>
  `,
})
export default class Home {
  /**
   *  Se necesita usar injectLoad para la función load para que se recuperen los datos
   * en la generación SSG, la conversión toSignal es necesaria debido a que el framework
   * está devolviendo un observable y se requiere de un signal para usar computed para obtener el valor
   * de la promesa
   */
  private readonly data = toSignal(injectLoad<typeof load>(), {
    initialValue: { actividades: [] }
  });

  /**
   * Usamos el método computed para que el valor se obtenga una única vez en lugar de calcularlo cada vez que
   * se accede al valor de la variable
   */
  readonly actividades = computed(() => this.data().actividades);
}

