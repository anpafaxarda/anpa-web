import { Injectable } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';

@Injectable({
  providedIn: 'root'
})
export class SanityService {
  private client: SanityClient = createClient({
    projectId: 'o24fva91',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-01-01',
  });

  async getExtraescolares(): Promise<any[]> {
    const query = `*[_type == "extraescolar"]{
      nombre,
      precio,
      monitor,
      "imagenUrl": imagen.asset->url
    }`;
    return await this.client.fetch(query);
  }
}
