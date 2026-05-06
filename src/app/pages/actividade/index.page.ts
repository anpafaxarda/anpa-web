import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  template: ''
})
export default class ActividadesIndexPage implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    const hoxe = new Date();
    const ano = hoxe.getFullYear();
    const curso = hoxe.getMonth() >= 8 ? `${ano}-${ano + 1}` : `${ano - 1}-${ano}`;

    this.router.navigate(['/actividade/curso', curso], { replaceUrl: true });
  }
}
