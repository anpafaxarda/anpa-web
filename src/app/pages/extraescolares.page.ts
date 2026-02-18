import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <header class="bg-surface-900 pt-32 pb-20 px-4">
        <div class="container mx-auto text-center">
          <!-- <span class="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full border border-primary-400/20">
            Nuestro equipo
          </span> -->
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6">
            {{ title }}
          </h1>
          <!-- <p class="text-surface-400 max-w-2xl mx-auto text-lg">
            Madres y padres voluntarios que dedicamos nuestro tiempo para que el
            <strong>CEIP Gregorio Sanz</strong> sea un lugar mejor para nuestros hijos.
          </p> -->
        </div>
    </header>
    <main class="bg-surface-50 pb-20 pt-20">
      <section class="container mx-auto px-4 -mt-10">
        <p class="text-surface-400 max-w-2xl mx-auto">Página en construcción para la sección de {{ title }}.</p>
      </section>
    </main>
  `,
})
export default class ExtraescolaresPage {
  title = 'Extraescolares'
}
