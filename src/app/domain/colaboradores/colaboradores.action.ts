import { sanityClient } from '../../core/api/sanity.client';
import { Colaborador } from './colaborador.model';

export async function fetchColaboradores(): Promise<Colaborador[]> {
  return await sanityClient.fetch(`*[_type == "colaborador"] {
    _id,
    name,
    category,
    description,
    discount,
    discountValue,
    discountCondition,
    "imagePath": image.asset->path,
    "imageUrl": image.asset->url,
    addressUrl,
    webSite
  }`);
}
