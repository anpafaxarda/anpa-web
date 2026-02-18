import { sanityClient } from '../../core/api/sanity.client';
import { Colaborador } from './colaborador.model';

export async function fetchColaboradores(): Promise<Colaborador[]> {
  return await sanityClient.fetch(`*[_type == "colaborador"] | order(name asc) {
    name,
    description,
    discount,
    discountCondition,
    "imageUrl": image.asset->url,
    addressUrl,
    webSite
  }`);
}
