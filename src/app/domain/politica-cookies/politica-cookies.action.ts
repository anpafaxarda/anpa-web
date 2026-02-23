import { sanityClient } from './../../core/api/sanity.client';
import { PoliticaCookiesData } from './politica-cookies.model';

export async function fetchPoliticaCookies(): Promise<PoliticaCookiesData> {
  const query = `*[_type == "politicaCookies"][0]`;
  return await sanityClient.fetch(query);
}
