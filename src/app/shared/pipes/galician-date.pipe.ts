import { Pipe, PipeTransform } from '@angular/core';

const MESES: Record<number, string> = {
  1: 'Xaneiro', 2: 'Febreiro', 3: 'Marzo', 4: 'Abril',
  5: 'Maio', 6: 'Xuño', 7: 'Xullo', 8: 'Agosto',
  9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Decembro'
};

@Pipe({ name: 'galicianDate', standalone: true, pure: true })
export class GalicianDatePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    // Sanity returns ISO date: "YYYY-MM-DD"
    const [year, month, day] = value.split('-').map(Number);
    const mes = MESES[month] ?? '';
    return day ? `${day} ${mes} ${year}` : `${mes} ${year}`;
  }
}
