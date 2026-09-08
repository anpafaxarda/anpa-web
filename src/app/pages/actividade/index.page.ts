import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fetchCursoActualConfigurado } from '../../domain/actividade/actividade.action';

@Component({
  standalone: true,
  template: ''
})
export default class ActividadesIndexPage implements OnInit {
  private router = inject(Router);

  async ngOnInit() {
    const cursoConfigurado = await fetchCursoActualConfigurado();

    const hoxe = new Date();
    const ano = hoxe.getFullYear();
    const cursoPorData = hoxe.getMonth() >= 8 ? `${ano}-${ano + 1}` : `${ano - 1}-${ano}`;

    this.router.navigate(['/actividade/curso', cursoConfigurado || cursoPorData], { replaceUrl: true });
  }
}
