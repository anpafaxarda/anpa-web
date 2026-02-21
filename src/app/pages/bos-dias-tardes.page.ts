import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../shared/components/page.component';
import { SeoService } from '../core/services/seo.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, PageComponent],
  template: `
    <app-page-component [title]="this.title" category="Servizos">
      <div class="container mx-auto px-4 -mt-10 space-y-10 animate-in fade-in duration-500">

        <div class="bg-white p-8 rounded-3xl shadow-sm border border-surface-100">
          <h2 class="text-2xl font-bold text-surface-900 mb-4">Conciliación Familiar</h2>
          <p class="text-surface-600 leading-relaxed">
            O servizo de "Bos días" e "Tardes divertidas" está deseñado para axudar ás familias
            que necesitan ampliar o horario escolar por motivos laborais, ofrecendo unha contorna
            segura e educativa para os nenos e nenas fóra do horario lectivo.
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
                <span class="text-surface-900 font-bold">Desde as 07:30</span>
              </li>
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Inclúe</span>
                <span class="text-surface-900 font-bold">Almorzo opcional</span>
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
                <span class="text-surface-900 font-bold">Ata as 18:00</span>
              </li>
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Actividade</span>
                <span class="text-surface-900 font-bold">Lecer e reforzo</span>
              </li>
              <li class="flex justify-between items-center py-2 border-b border-surface-50">
                <span class="text-surface-500 font-medium">Frecuencia</span>
                <span class="text-surface-900 font-bold">Días soltos ou mensual</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-primary-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 class="text-xl font-bold mb-1">Necesitas inscribirte?</h4>
            <p class="text-primary-100">Descarga o formulario e envíao asinado ao correo do ANPA.</p>
          </div>
          <a (click)="navigateToContacto()" class="px-8 py-3 bg-white text-primary-600 rounded-full font-bold hover:scale-105 transition-transform shadow-lg cursor-pointer">
            Solicitar praza
          </a>
        </div>

      </div>
    </app-page-component>
  `
})
export default class BosDiasTardesPage implements OnInit {
  title = 'Bos días e Tardes';
  private seo = inject(SeoService);
  private router = inject(Router);

  ngOnInit() {
    this.seo.setPageMeta(
      this.title,
      'Servizos de conciliación familiar no CEIP Gregorio Sanz: horarios de madrugadores e actividades de tarde.'
    );
  }

  navigateToContacto() {
    this.router.navigate(['/contacto']);
  }
}
