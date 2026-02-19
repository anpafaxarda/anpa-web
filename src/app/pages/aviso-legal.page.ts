import { Component } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aviso-legal-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component title="Aviso Legal" category="Legal">
      <div class="container mx-auto px-4 -mt-10 mb-20">
        <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-100 max-w-4xl mx-auto prose prose-slate">

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-surface-900 mb-4">1. Datos Identificativos</h2>
            <p class="text-surface-600">
              En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:
            </p>
            <ul class="list-disc ml-6 mt-4 text-surface-600">
              <li><strong>Titular:</strong> ANPA [Nombre de tu ANPA]</li>
              <li><strong>NIF:</strong> [GXXXXXXXX]</li>
              <li><strong>Domicilio:</strong> [Dirección del Colegio/Local]</li>
              <li><strong>Correo electrónico:</strong> [email@ejemplo.com]</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-surface-900 mb-4">2. Usuarios</h2>
            <p class="text-surface-600">
              El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-bold text-surface-900 mb-4">3. Propiedad Intelectual</h2>
            <p class="text-surface-600">
              El diseño del portal y sus códigos fuente, así como los logos, marcas y demás signos distintivos que aparecen en el mismo pertenecen al ANPA y están protegidos por los correspondientes derechos de propiedad intelectual e industrial.
            </p>
          </section>

          <div class="mt-12 pt-8 border-t border-surface-100 text-center">
            <a href="/" class="text-primary-600 font-bold hover:underline">← Volver al inicio</a>
          </div>
        </div>
      </div>
    </app-page-component>
  `,
})
export default class AvisoLegalPage {
  title = 'Aviso Legal'
}
