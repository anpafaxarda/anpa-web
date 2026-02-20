import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  private readonly siteName = 'ANPA A Faxarda';
  private readonly schoolName = 'CEIP Gregorio Sanz (Ribadeo)'

  /**
   * Configura el título y las metaetiquetas principales
   * @param title Título de la página
   * @param description Descripción para Google
   * @param imagePath la ruta de la imagen sin el host
   */
  setPageMeta(title: string, description: string, imagePath?: string): void {
    let fullTitle;

    if (title === 'index') {
      fullTitle = `${this.siteName} | ${this.schoolName}`
    } else {
      fullTitle = `${title} | ${this.siteName}`;
    }

    this.titleService.setTitle(fullTitle);
    this.metaService.updateTag({ name: 'description', content: description });

    this.setMetaOg(fullTitle, description, imagePath);
    this.setMetaTwitter(fullTitle, description);
  }

  private setMetaOg(fullTitle: string, description: string, imagePath?: string): void {
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: this.getImageUrl(imagePath) });
  }

  private setMetaTwitter(fullTitle: string, description: string): void {
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }

  private getImageUrl(imagePath?: string): string {
    const baseUrl = this.document.location.origin;

    const fullImageUrl = imagePath
      ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath}`)
      : `${baseUrl}/assets/anpa-og-image.jpg`;

    return fullImageUrl;
  }
}
