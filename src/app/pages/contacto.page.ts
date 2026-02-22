import { Component, computed, inject } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { fetchContacto } from '../domain/contacto/contacto.action';

export const contactoResolver: ResolveFn<any> = () => {
  return fetchContacto();
};

export const routeMeta = {
  resolve: {
    contactoData: contactoResolver
  }
};

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [PageComponent, CommonModule],
  template: `
    <app-page-component
      [category]="'Axuda'"
      [title]="'Contacto'"
      [subTitle]="'Estamos aquí para escoitarte. Ponte en contacto con nós por calquera das nosas vías.'"
    >
      @let data = contacto();

      <div class="max-w-6xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">

          <div class="space-y-6">

            <div class="bg-white p-6 rounded-3xl border border-surface-100 shadow-sm transition-all hover:shadow-md">
              <div class="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>

              <h4 class="font-bold text-surface-900 mb-2">Teléfono e WhatsApp</h4>
              <p class="text-xl font-black text-surface-700 mb-4">{{ data.telefono }}</p>

              @if (data.tiempoRespuestaWhatsapp) {
                <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded-lg mb-6">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Resposta en {{ data.tiempoRespuestaWhatsapp }}
                </div>
              }

              <a [href]="'https://wa.me/' + data.whatsapp"
                 target="_blank"
                 class="flex items-center justify-center gap-2 w-full py-4 bg-[#4ade80] hover:bg-[#22c55e] text-white font-black rounded-2xl transition-all cursor-pointer shadow-lg shadow-green-100">
                 WhatsApp Directo
              </a>
            </div>

            <div class="bg-white p-6 rounded-3xl border border-surface-100 shadow-sm transition-all hover:shadow-md">
              <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <h4 class="font-bold text-surface-900 mb-2">Correo Electrónico</h4>
              <p class="font-bold text-surface-600 break-all mb-4">{{ data.email }}</p>

              @if (data.tiempoRespuestaEmail) {
                <div class="pt-4 border-t border-surface-50">
                   <p class="text-[10px] text-surface-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                    <span class="w-1 h-1 bg-blue-400 rounded-full"></span>
                    Atención: {{ data.tiempoRespuestaEmail }}
                  </p>
                </div>
              }
            </div>

            @if (data.horariosAtencion && data.horariosAtencion.length > 0) {
              <div class="bg-surface-900 p-6 rounded-3xl text-white shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h4 class="font-bold mb-6 flex items-center gap-2 text-primary-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Atención Telefónica
                </h4>
                <div class="space-y-4">
                  @for (h of data.horariosAtencion; track h.dias) {
                    <div class="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span class="text-surface-400 font-medium">{{ h.dias }}</span>
                      <span class="font-black text-primary-400 bg-primary-400/10 px-2 py-1 rounded-md">{{ h.horas }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <div class="lg:col-span-2">
            <div class="bg-white p-8 md:p-10 rounded-[2.5rem] border border-surface-100 shadow-sm">
              <h2 class="text-2xl font-black text-surface-900 mb-2">Envíanos unha mensaxe</h2>
              <p class="text-surface-500 mb-8 font-medium">Se o prefires, podes completar este formulario e contactaremos contigo o antes posible.</p>

              <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-surface-400 ml-1">Nome completo</label>
                    <input type="text" placeholder="Ex: María Pérez" class="w-full px-5 py-4 bg-surface-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none text-surface-900 placeholder:text-surface-300">
                  </div>
                  <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-surface-400 ml-1">Email de contacto</label>
                    <input type="email" placeholder="marperez@email.com" class="w-full px-5 py-4 bg-surface-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none text-surface-900 placeholder:text-surface-300">
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-surface-400 ml-1">Asunto da consulta</label>
                  <select class="w-full px-5 py-4 bg-surface-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none text-surface-900 appearance-none cursor-pointer">
                    <option>Consulta xeral</option>
                    <option>Actividades Extraescolares</option>
                    <option>Socio / Alta de socio</option>
                    <option>Bus Escolar</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="text-xs font-black uppercase tracking-widest text-surface-400 ml-1">Mensaxe</label>
                  <textarea rows="5" placeholder="Escribe aquí a túa mensaxe..." class="w-full px-5 py-4 bg-surface-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all outline-none text-surface-900 placeholder:text-surface-300 resize-none"></textarea>
                </div>

                <button type="submit" class="w-full py-5 bg-primary-600 hover:bg-primary-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-primary-200 cursor-pointer">
                  Enviar Mensaxe
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </app-page-component>
  `
})
export default class ContactoPage {
  private route = inject(ActivatedRoute);

  readonly contacto = computed(() => this.route.snapshot.data['contactoData'] ?? {
    telefono: '',
    whatsapp: '',
    email: '',
    tiempoRespuestaWhatsapp: '',
    tiempoRespuestaEmail: '',
    horariosAtencion: []
  });
}
