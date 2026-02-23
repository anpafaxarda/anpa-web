import { sanityClient } from '../../core/api/sanity.client';
import { AvisoLegalData } from './aviso-legal.model';

export async function fetchAvisoLegal(): Promise<AvisoLegalData> {
  const query = `*[_type == "avisoLegal"][0]`;
  return await sanityClient.fetch(query);
}
