import { sanityClient } from './../../core/api/sanity.client';
import { PoliticaPrivacidadeData } from './politica-privacidad.model';

export async function fetchPoliticaPrivacidade(): Promise<PoliticaPrivacidadeData> {
  const query = `*[_type == "politicaPrivacidade"][0]{
    title,
    category,
    contenido
  }`;
  return await sanityClient.fetch(query);
}
