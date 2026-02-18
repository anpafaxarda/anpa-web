import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-surface-50 min-h-screen pb-20">
      <div class="bg-surface-900 py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Contacta
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-300">con nosotros</span>
          </h1>
          <p class="text-surface-400 max-w-2xl mx-auto">Estamos aquí para ayudarte. Escríbenos, llámanos o ven a visitarnos a nuestro local en el colegio.</p>
        </div>
      </div>

      <div class="container mx-auto px-4 -mt-10">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div class="lg:col-span-1 space-y-6">

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-100 group">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <h3 class="font-bold text-surface-800">Teléfono y WhatsApp</h3>
              </div>
              <p class="text-surface-600 mb-4">+34 600 000 000</p>
              <a href="https://wa.me/34600000000" target="_blank" class="inline-flex items-center justify-center w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72 0 3.675.722 5.712.722 11.892 0 11.896-11.893 11.896-11.893 0-3.174-1.234-6.159-3.475-8.401z"></path></svg>
                WhatsApp Directo
              </a>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-100">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h3 class="font-bold text-surface-800">Correo Electrónico</h3>
              </div>
              <p class="text-surface-600">hola&#64;anpa-web.com</p>
              <p class="text-xs text-surface-400 mt-1">Respondemos en menos de 48h</p>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-100">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="font-bold text-surface-800">Horarios de Atención</h3>
              </div>
              <ul class="space-y-2 text-sm text-surface-600">
                <li class="flex justify-between"><span>Lunes y Miércoles:</span> <span class="font-semibold text-surface-800">16:00 - 18:00</span></li>
                <li class="flex justify-between"><span>Viernes:</span> <span class="font-semibold text-surface-800">09:00 - 11:00</span></li>
                <li class="pt-2 border-t border-surface-50 text-xs italic">Ubicación: Local ANPA (Edificio Principal)</li>
              </ul>
            </div>

          </div>

          <div class="lg:col-span-2">
            <div class="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-surface-100">
              <h2 class="text-2xl font-bold text-surface-800 mb-6">Envíanos un mensaje</h2>
              <form class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-surface-700 mb-2">Nombre</label>
                    <input type="text" class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-surface-700 mb-2">Email</label>
                    <input type="email" class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-surface-700 mb-2">Asunto</label>
                  <select class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all">
                    <option>Consulta general</option>
                    <option>Alta de socio</option>
                    <option>Incidencia extraescolares</option>
                    <option>Sugerencia</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-surface-700 mb-2">Mensaje</label>
                  <textarea rows="5" class="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"></textarea>
                </div>
                <button type="button" class="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-200 transition-all transform active:scale-[0.98]">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
})
export default class ContactoPage {}
