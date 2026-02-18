import { Component, computed, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-component',
  standalone: true,
  template: `
    <main class="bg-surface-50 pb-20">
      <section class="bg-surface-900 pt-32 pb-20 px-4">
        <div class="container mx-auto text-center">
          @if (category.length > 0) {
            <span class="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary-400 uppercase bg-primary-400/10 rounded-full border border-primary-400/20">
              {{ category }}
            </span>
          }
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6">
            {{ firstString }}<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-300">{{ secondString }}</span>
          </h1>
          @if (subTitle.length > 0) {
            <p class="text-surface-400 max-w-2xl mx-auto text-lg">
              {{ subTitle }}
            </p>
          }
        </div>
      </section>
      <section class="container mx-auto px-4 -mt-10">
        <ng-content></ng-content>
      </section>
    </main>
  `
})
export class PageComponent implements OnInit {
  @Input() title!: string;
  @Input() subTitle: string = '';
  @Input() category: string = '';


  firstString!: string;
  secondString!: string;

  ngOnInit(): void {
    const fullTitle = this.title;
    const cutIndex = Math.floor(this.title.length / 2);
    this.firstString = fullTitle.substring(0, cutIndex);
    this.secondString = fullTitle.substring(cutIndex);
  }
}
