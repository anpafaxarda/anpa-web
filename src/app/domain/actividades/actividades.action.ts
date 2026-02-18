import { sanityClient } from '../../core/api/sanity.client';
import { Actividad } from './actividades.model';

export async function fetchActividades(): Promise<Actividad[]> {
  return await sanityClient.fetch(`*[_type == "extraescolar"] | order(name asc) {
    name,
    "imageUrl": image.asset->url,
    price,
    classDuration,
    enrollmentPeriod,
    coursePeriod,
    description
  }`);
}
