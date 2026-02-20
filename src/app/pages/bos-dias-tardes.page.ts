import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../shared/components/page.component';
import { SeoService } from '../core/services/seo.service';

@Component({
  standalone: true,
  imports: [CommonModule, PageComponent],
  template: `
    <app-page-component title="Bos días y Tardes" category="Servicios">
      <div class="container mx-auto px-4 -mt-10 space-y-10 animate-in fade-in duration-500">

        <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-100">
          <h2 class="text-2xl font-bold text-surface-900 mb-4">Conciliación Familiar</h2>
          <p class="text-surface-600 leading-relaxed">
            El servicio de "Bos días" y "Tardes divertidas" está diseñado para ayudar a las familias
            que necesitan ampliar el horario escolar por motivos laborales, ofreciendo un entorno
            seguro y educativo para los niños fuera del horario lectivo.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:border-primary-200 transition-colors">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">☀️</div>
              <h3 class="text-xl font-bold text-surface-800">Plan Bos Días</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Horario</span>
                <span class="text-surface-900 font-bold">Desde las 07:30</span>
              </li>
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Incluye</span>
                <span class="text-surface-900 font-bold">Desayuno opcional</span>
              </li>
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Lugar</span>
                <span class="text-surface-900 font-bold">Comedor escolar</span>
              </li>
            </ul>
          </div>

          <div class="bg-white p-8 rounded-3xl border border-surface-100 shadow-sm hover:border-primary-200 transition-colors">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl">🌙</div>
              <h3 class="text-xl font-bold text-surface-800">Tardes Divertidas</h3>
            </div>
            <ul class="space-y-4">
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Horario</span>
                <span class="text-surface-900 font-bold">Hasta las 18:00</span>
              </li>
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Actividad</span>
                <span class="text-surface-900 font-bold">Ocio y refuerzo</span>
              </li>
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Frecuencia</span>
                <span class="text-surface-900 font-bold">Días sueltos o mensual</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-primary-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 class="text-xl font-bold mb-1">¿Necesitas inscribirte?</h4>
            <p class="text-primary-100">Descarga el formulario y envíalo firmado al correo del ANPA.</p>
          </div>
          <a href="/contacto" class="px-8 py-3 bg-white text-primary-600 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
            Solicitar plaza
          </a>
        </div>

      </div>
    </app-page-component>
  `
})
export default class BosDiasTardesPage implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setPageMeta(
      'Bos días y Tardes',
      'Servicios de conciliación familiar en el CEIP Gregorio Sanz: horarios de madrugadores y actividades de tarde.'
    );
  }
}
