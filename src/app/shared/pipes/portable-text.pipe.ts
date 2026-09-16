import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { toHTML } from '@portabletext/to-html';

@Pipe({
  name: 'portableText',
  standalone: true
})
export class PortableTextPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: any[] | undefined): SafeHtml {
    if (!value) return '';

    // O contido vén de Sanity (editado polo ANPA, non por usuarios), así que confiamos no HTML
    // xerado para conservar marcas como o subliñado, que o sanitizador de Angular eliminaría.
    return this.sanitizer.bypassSecurityTrustHtml(toHTML(value, {}));
  }
}
