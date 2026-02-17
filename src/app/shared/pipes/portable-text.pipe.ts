import { Pipe, PipeTransform } from '@angular/core';
import { toHTML } from '@portabletext/to-html';

@Pipe({
  name: 'portableText',
  standalone: true
})
export class PortableTextPipe implements PipeTransform {
  transform(value: any[] | undefined): string {
    if (!value) return '';

    // toHTML convierte el JSON estructurado en etiquetas HTML reales
    return toHTML(value, {
      /* Aquí podrías añadir configuraciones para imágenes personalizadas */
    });
  }
}
