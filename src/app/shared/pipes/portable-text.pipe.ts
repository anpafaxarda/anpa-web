import { Pipe, PipeTransform } from '@angular/core';
import { toHTML } from '@portabletext/to-html';

@Pipe({
  name: 'portableText',
  standalone: true
})
export class PortableTextPipe implements PipeTransform {
  transform(value: any[] | undefined): string {
    if (!value) return '';

    return toHTML(value, {});
  }
}
