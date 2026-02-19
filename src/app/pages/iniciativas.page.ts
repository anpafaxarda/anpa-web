import { Component } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciativas-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [title]="title"
    >
      <div class="container mx-auto px-4 -mt-10">
        <div class="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-100 group">
              <div class="flex items-center gap-4 mb-4">
                <p class="text-surface-400 mx-auto">Página en construcción para la sección de {{ title }}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class IniciativasPage {
  title = 'Iniciativas'
}
