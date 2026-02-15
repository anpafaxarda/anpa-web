import { Component, inject, signal } from '@angular/core';
import { SanityService } from '../sanity.service';
import { CommonModule } from '@angular/common';

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
  private sanityService = inject(SanityService);
  actividades = signal<any[]>([]);

  constructor() {
    this.loadData();
  }

  async loadData() {
    const data = await this.sanityService.getExtraescolares();
    this.actividades.set(data);
  }
}
