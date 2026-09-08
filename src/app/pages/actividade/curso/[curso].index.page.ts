import { Component, inject, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, ResolveFn } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PageComponent } from '../../../shared/components/page.component';
import { ActividadeCardComponent } from '../../../shared/components/actividade-card.component';
import { fetchActividadesByCurso, fetchCursosDisponibles } from '../../../domain/actividade/actividade.action';
import { SeoService } from '../../../core/services/seo.service';
import { Actividade } from '../../../domain/actividade/actividade.model';

export const actividadesCursoResolver: ResolveFn<{actividades: Actividade[], cursos: string[], cursoFinal: string}> = async (route) => {
  const curso = route.paramMap.get('curso');
  const cursos = await fetchCursosDisponibles();

  // Se o curso pedido (ex: calculado pola data de hoxe) aínda non ten actividades,
  // caemos ao curso máis recente que si teña contido (cursos xa vén ordenado desc).
  const cursoFinal = (curso && cursos.includes(curso)) ? curso : cursos[0];
  const actividades = await fetchActividadesByCurso(cursoFinal);

  return { actividades, cursos, cursoFinal };
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
      @if (actividades().length) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (act of actividades(); track act.id; let i = $index) {
            <app-actividade-card
              [actividade]="act"
              [priority]="i < 3"
              [showDate]="true" />
          }
        </div>
      } @else {
        <div class="text-center py-20 text-surface-400 italic font-medium">
          Aínda non hai actividades rexistradas para o curso {{ cursoActual() }}.
        </div>
      }
    </app-page-component>
  `
})
export default class ActividadesCursoPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);

  // route.data (non route.snapshot.data) reacciona aínda que se reutilice o compoñente
  // ao navegar entre cursos coa mesma ruta (ex: cambiar de curso no selector)
  private routeData = toSignal(this.route.data, { initialValue: this.route.snapshot.data });
  data = computed(() => this.routeData()['data']);
  actividades = computed(() => this.data().actividades as Actividade[]);
  cursos = computed(() => this.data().cursos);
  cursoActual = computed(() => this.data().cursoFinal);

  constructor() {
    effect(() => {
      const curso = this.cursoActual();
      this.seo.setPageMeta(
        `Actividades Curso ${curso}`,
        `Consulta todas as iniciativas e actividades do ANPA A Faxarda para o curso escolar ${curso}.`
      );

      // Se caemos a un curso distinto do pedido na URL (por non ter aínda actividades), reflectímolo na URL
      if (this.route.snapshot.paramMap.get('curso') !== curso) {
        this.router.navigate(['/actividade/curso', curso], { replaceUrl: true });
      }
    });
  }

  navegarAoCurso(event: Event) {
    const curso = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/actividade/curso', curso]);
  }
}
