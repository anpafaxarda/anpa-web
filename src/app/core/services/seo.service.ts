import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://www.anpafaxarda.org'
  private imagePath: string = '/assets/anpa-og-image.jpg'
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

    const imageUrl = this.getImageUrl(imagePath);

    this.titleService.setTitle(fullTitle);
    this.metaService.updateTag({ name: 'description', content: description });

    this.setMetaOg(fullTitle, description, imageUrl);
    this.setMetaTwitter(fullTitle, description, imageUrl);
  }

  private setMetaOg(fullTitle: string, description: string, imagePath: string): void {
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: imagePath });
    this.metaService.updateTag({ property: 'og:image:secure_url', content: imagePath });
    this.metaService.updateTag({ property: 'og:image:width', content: '800' });
    this.metaService.updateTag({ property: 'og:image:height', content: '533' });
    this.metaService.updateTag({ property: 'og:image:type', content: 'image/jpeg' });
  }

private setMetaTwitter(fullTitle: string, description: string, imagePath: string): void {
  this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
  this.metaService.updateTag({ name: 'twitter:description', content: description });
  this.metaService.updateTag({ name: 'twitter:image', content: imagePath });
}

  private getImageUrl(imagePath?: string): string {
    const imageUrl = this.baseUrl+this.imagePath;

    if (!imagePath) {
      return imageUrl;
    }

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;

    return `${this.baseUrl}/${cleanPath}`;
  }
}
