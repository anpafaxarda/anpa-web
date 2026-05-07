import { Component, computed, inject, OnInit } from '@angular/core';
import { PageComponent } from '../shared/components/page.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ResolveFn } from '@angular/router';
import { fetchContacto } from '../domain/contacto/contacto.action';
import { SeoService } from '../core/services/seo.service';

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
      [title]="title"
      [subTitle]="'Estamos aquí para escoitarte. Ponte en contacto con nós por calquera das nosas vías.'"
    >
      @let data = contacto();

      <div class="max-w-6xl mx-auto px-4">
        <!-- BLOQUE PRIORITARIO: APP ÁBACO (Sen enlace, informativo) -->
        <div class="mb-12 bg-surface-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-surface-800">
          <div class="flex flex-col lg:flex-row items-center gap-8 relative z-10">
            <div class="flex-shrink-0">
              <div class="w-20 h-20 bg-white rounded-3xl shadow-xl transform rotate-3">
                <img src="/assets/abaco-logo.webp" alt="Ábaco Logo" class="w-full h-full object-contain">
              </div>
            </div>

            <div class="flex-grow text-center lg:text-left">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-600/20 text-primary-400 text-[10px] font-black uppercase rounded-full mb-4 border border-primary-600/30">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                </span>
                Vía recomendada para socios/as
              </div>
              <h3 class="text-3xl font-black mb-2 tracking-tighter">Atención directa na túa App</h3>
              <p class="text-surface-400 font-medium text-lg max-w-3xl">
                Se xa eres socio/a, abre a túa App <b>Ábaco Familias</b> e escríbenos polo chat. É a canle máis rápida e eficiente xa que contamos con máis persoas pendentes para responderte.
              </p>
            </div>
          </div>
          <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">

          <div class="space-y-6">
            <h4 class="text-xs font-black uppercase tracking-widest text-surface-400 ml-1">Vías alternativas</h4>
            <div class="bg-white p-6 rounded-3xl border border-surface-100 shadow-sm transition-all hover:shadow-md">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <h4 class="font-bold text-surface-900">Teléfono e WhatsApp</h4>
              </div>

              <p class="text-xl font-black text-surface-700 mb-4">
                <a [href]="'tel:+34'+data.telefono">{{ buildPhoneNumberToDisplay() }}</a>
              </p>

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
                 class="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-black rounded-2xl transition-all cursor-pointer shadow-lg shadow-green-100">
                 WhatsApp Directo
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.446 1.698 5.392l-.999 3.647 3.79-.993zm11.366-4.627c-.3-.15-1.771-.875-2.046-.975-.275-.1-.475-.15-.675.15s-.775.975-.95 1.175-.35.225-.65.075c-.3-.15-1.265-.467-2.41-1.485-.89-.793-1.49-1.772-1.665-2.072-.175-.3-.019-.462.13-.611.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525-.675-1.625-.925-2.225c-.244-.589-.491-.51-.675-.519-.175-.009-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.116 3.231 5.127 4.531.716.311 1.275.496 1.71.635.722.229 1.378.197 1.897.12.579-.085 1.771-.725 2.021-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
              </a>
            </div>

            <div class="bg-white p-6 rounded-3xl border border-surface-100 shadow-sm transition-all hover:shadow-md">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <h4 class="font-bold text-surface-900">Correo Electrónico</h4>
              </div>

              <p class="font-bold text-surface-600 break-all mb-4">{{ data.email }}</p>

              @if (data.tiempoRespuestaEmail) {
                <div class="pt-4 border-t border-surface-50">
                   <p class="text-[10px] text-surface-400 uppercase tracking-widest font-black flex items-center gap-1.5">
                    <span class="w-1 h-1 bg-blue-400 rounded-full"></span>
                    Tempo máx. resposta: {{ data.tiempoRespuestaEmail }}
                  </p>
                </div>
              }
            </div>

            @if (data.horariosAtencion && data.horariosAtencion.length > 0) {
              <div class="bg-primary-50 p-6 rounded-3xl border border-primary-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 class="font-black text-primary-900 uppercase text-xs tracking-widest">Atención Telefónica</h4>
                </div>

                <div class="space-y-4">
                  @for (h of data.horariosAtencion; track h.dias) {
                    <div class="flex justify-between items-center text-sm border-b border-primary-200/50 pb-3 last:border-0 last:pb-0">
                      <span class="text-surface-600 font-bold">{{ h.dias }}</span>
                      <span class="font-black text-amber-600 bg-white px-3 py-1 rounded-full shadow-sm">{{ h.horas }}</span>
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
export default class ContactoPage implements OnInit {
  title = 'Contacta con nós'
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  readonly contacto = computed(() => this.route.snapshot.data['contactoData'] ?? {
    telefono: '',
    whatsapp: '',
    email: '',
    tiempoRespuestaWhatsapp: '',
    tiempoRespuestaEmail: '',
    horariosAtencion: []
  });

  ngOnInit() {
    this.seo.setPageMeta(
      `${this.title} - ANPA A Faxarda`,
      'Ponte en contacto co ANPA A Faxarda do CEIP Gregorio Sanz. Estamos dispoñibles por WhatsApp, teléfono, email ou a través do noso formulario para axudarte.'
    );
  }

    buildPhoneNumberToDisplay(): string {
    return [
      '+34',
      this.contacto().telefono.substring(0, 3),
      this.contacto().telefono.substring(3, 6),
      this.contacto().telefono.substring(6, 9)
    ].join(' ');
  }
}
