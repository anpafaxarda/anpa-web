import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GalicianDatePipe } from '../pipes/galician-date.pipe';
import { Actividade } from '../../domain/actividade/actividade.model';

@Component({
  selector: 'app-actividade-card',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, GalicianDatePipe],
  template: `
    <a [routerLink]="['/actividade/curso/', actividade.curso, actividade.slug]"
       class="group h-full bg-white rounded-[2.5rem] overflow-hidden border border-surface-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col">

      <!-- IMAXE E BADGES -->
      <div class="relative overflow-hidden" [class]="imageHeight">
        @if (actividade.imaxePath) {
          <img
            [ngSrc]="actividade.imaxePath"
            [alt]="actividade.titulo"
            fill
            class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            [sizes]="sizes"
            [priority]="priority">
        } @else {
          <div class="w-full h-full bg-surface-100 flex items-center justify-center text-surface-400 font-bold italic text-sm">
            Sen imaxe
          </div>
        }

        <div class="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 items-end">
          @if (showDate) {
            <div class="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-surface-900 shadow-sm">
              {{ actividade.data | galicianDate }}
            </div>
          }
          @if (actividade.organizador) {
            <div class="bg-cyan-100/90 backdrop-blur-md text-cyan-800 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border border-cyan-300">
              Organiza: {{ actividade.organizador }}
            </div>
          }
          @if (actividade.porcentaxeSubvencion) {
            <div class="bg-primary-100/90 backdrop-blur-md text-primary-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border border-primary-300">
              {{ actividade.porcentaxeSubvencion }}% Subvencionado
            </div>
          }
          @if (actividade.nivelEducativo && actividade.nivelEducativo.length > 0) {
            <div class="bg-orange-100/90 backdrop-blur-md text-orange-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm border border-orange-300">
              Curso: {{ actividade.nivelEducativo.join(' · ') }}
            </div>
          }
        </div>
      </div>

      <!-- CONTIDO -->
      <div class="p-8 flex-grow flex flex-col">
        <h4 class="text-2xl font-bold text-surface-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
          {{ actividade.titulo }}
        </h4>
        <p class="text-surface-500 leading-relaxed mb-8 line-clamp-3 italic font-medium">
          "{{ actividade.resumo }}"
        </p>

        <div class="mt-auto pt-6 border-t border-surface-50 flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-[0.15em]">
          Ler máis
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </a>
  `
})
export class ActividadeCardComponent {
  @Input({ required: true }) actividade!: Actividade;
  @Input() priority = false;
  @Input() showDate = false;
  @Input() imageHeight = 'h-64';
  @Input() sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
}
