import { sanityClient } from '../../core/api/sanity.client';
import { Actividad } from './actividades.model';

export async function fetchActividades(): Promise<Actividad[]> {
  return await sanityClient.fetch(`*[_type == "extraescolar"] | order(horaInicio asc) {
      name,
      "imageUrl": image.asset->url + "?w=800&auto=format",
      price,
      classDuration,
      enrollmentPeriod,
      coursePeriod,
      description,
      diaSemana,
      horaInicio,
      horaFin
  }`);
}
