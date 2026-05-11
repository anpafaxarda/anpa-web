import { sanityClient } from '../../core/api/sanity.client';
import { Actividad } from './extraescolares.model';

export async function fetchExtraescolares(): Promise<Actividad[]> {
  return await sanityClient.fetch(`*[_type == "extraescolar"] | order(horaInicio asc) {
      name,
      "imagePath": image.asset->path,
      "imageUrl": image.asset->url,
      price,
      memberPrice,
      discountTag,
      classDuration,
      enrollmentPeriod,
      coursePeriod,
      description,
      diaSemana,
      horaInicio,
      horaFin
  }`);
}
