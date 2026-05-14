import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, Router, ResolveFn } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../shared/components/page.component';
import { ActividadeCardComponent } from '../../../shared/components/actividade-card.component';
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
  imports: [CommonModule, PageComponent, ActividadeCardComponent],
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
        @for (act of actividades(); track act.id; let i = $index) {
          <app-actividade-card
            [actividade]="act"
            [priority]="i < 3" />
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
