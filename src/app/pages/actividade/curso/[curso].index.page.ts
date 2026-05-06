import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, Router, ResolveFn, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../shared/components/page.component';
import { fetchActividadesByCurso, fetchCursosDisponibles } from '../../../domain/actividade/actividade.action';
import { SeoService } from '../../../core/services/seo.service';
import { Actividade } from '../../../domain/actividade/actividade.model';

export const actividadesCursoResolver: ResolveFn<{actividades: Actividade[], cursos: string[]}> = async (route) => {
  const curso = route.paramMap.get('curso');
  const cursos = await fetchCursosDisponibles();

  const cursoFinal = curso || cursos[0];
  const actividades = await fetchActividadesByCurso(cursoFinal);

  return { actividades, cursos };
};

export const routeMeta = {
  resolve: { data: actividadesCursoResolver }
};

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, PageComponent],
  template: `
    <app-page-component
      category="Arquivo"
      [title]="'Actividades ' + cursoActual()"
      subTitle="Consulta o histórico por curso escolar."
    >
      <!-- SELECTOR DE CURSO -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-surface-50 p-6 rounded-[2rem] border border-surface-100">
        <div class="flex items-center gap-3">
          <span class="text-sm font-black uppercase tracking-widest text-surface-400">Cambiar curso:</span>
          <select
            (change)="navegarAoCurso($event)"
            class="bg-white border border-surface-200 text-surface-900 text-sm font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500"
          >
            @for (c of cursos(); track c) {
              <option [value]="c" [selected]="c === cursoActual()">{{ c }}</option>
            }
          </select>
        </div>
      </div>

      <!-- GRID DE ACTIVIDADES -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (act of actividades(); track act.id) {
          <div class="group">
            <div class="h-full bg-white rounded-[2.5rem] overflow-hidden border border-surface-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col">

              <!-- IMAXE E BADGES -->
              <div class="relative h-64 overflow-hidden">
                @if (act.imaxeUrl) {
                  <img [src]="act.imaxeUrl" [alt]="act.titulo" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                } @else {
                  <div class="w-full h-full bg-surface-100 flex items-center justify-center text-surface-400 font-bold italic text-sm">Sen imaxe</div>
                }

                <div class="absolute top-6 left-6 flex flex-col gap-2 items-start">
                  <!-- Organizador (Dinámico) -->
                  @if (act.organizador) {
                    <div class="bg-surface-900 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-lg">
                      {{ act.organizador }}
                    </div>
                  }

                  <!-- Porcentaxe Subvención -->
                  @if (act.porcentaxeSubvencion) {
                    <div class="bg-primary-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-lg border border-white/20">
                      {{ act.porcentaxeSubvencion }}% Subvencionado
                    </div>
                  }
                </div>
              </div>

              <!-- CONTIDO -->
              <div class="p-8 flex-grow flex flex-col">
                <h4 class="text-2xl font-bold text-surface-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {{ act.titulo }}
                </h4>

                <p class="text-surface-500 leading-relaxed mb-8 line-clamp-3 italic font-medium">
                  "{{ act.resumo }}"
                </p>

                <div class="mt-auto pt-6 border-t border-surface-50">
                  <a [routerLink]="['/actividade/curso/', act.curso, act.slug]"
                     class="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-[0.15em] group/btn">
                    Ler máis
                    <svg class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        }
      </div>
    </app-page-component>
  `
})
export default class ActividadesCursoPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);

  data = computed(() => this.route.snapshot.data['data']);
  actividades = computed(() => this.data().actividades as Actividade[]);
  cursos = computed(() => this.data().cursos);
  cursoActual = computed(() => this.route.snapshot.paramMap.get('curso') || this.cursos()[0]);

  ngOnInit() {
    const curso = this.cursoActual();
    this.seo.setPageMeta(
      `Actividades Curso ${curso}`,
      `Consulta todas as iniciativas e actividades do ANPA A Faxarda para o curso escolar ${curso}.`
    );
  }

  navegarAoCurso(event: Event) {
    const curso = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/actividade/curso', curso]);
  }
}
