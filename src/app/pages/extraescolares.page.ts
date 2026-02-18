import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section class="container mx-auto py-12 px-4">
      <h1 class="text-4xl font-bold text-surface-900 mb-6">{{ title }}</h1>
      <p class="text-lg text-surface-600">Página en construcción para la sección de {{ title }}.</p>
    </section>
  `,
})
export default class ExtraescolaresPage {
  title = 'Extraescolares'
}
