import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 -mt-10 space-y-12 animate-pulse">
      <div class="bg-white p-8 rounded-3xl border border-surface-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex-1 space-y-4 w-full">
          <div class="h-8 bg-surface-200 rounded-lg w-1/2"></div>
          <div class="h-4 bg-surface-100 rounded-lg w-3/4"></div>
        </div>
        <div class="w-32 h-16 bg-surface-100 rounded-2xl"></div>
      </div>
      <div class="space-y-6">
        <div class="h-7 bg-surface-200 rounded-lg w-56"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let i of [1,2,3,4,5,6]" class="bg-white p-6 rounded-2xl border border-surface-100 flex items-center gap-4">
            <div class="w-14 h-14 bg-surface-50 rounded-xl"></div> <div class="flex-1 space-y-3">
              <div class="h-5 bg-surface-200 rounded w-3/4"></div>
              <div class="h-4 bg-surface-100 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SkeletonComponent {}
