import { sanityClient } from '../../core/api/sanity.client';
import { BosDiasTardesResponse } from './bos-dias-tardes.model';

export async function fetchConciliacionData(): Promise<BosDiasTardesResponse> {
  const query = `{
    "intro": *[_type == "conciliacion"][0]{
      title,
      category,
      seccionIntro,
      plans[]{
        nombre,
        emoji,
        colorFondoIcono,
        detalles[]{
          etiqueta,
          valor
        }
      }
    },
    "config": *[_type == "bosDiasTardesConfig"][0]{
      tramosTemprano,
      tramosTarde,
      prezosSoltos,
      bonificacions
    }
  }`;

  return await sanityClient.fetch(query);
}
