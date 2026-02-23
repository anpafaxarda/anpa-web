
import { sanityClient } from '../../core/api/sanity.client';
import { ConciliacionData } from './bos-dias-tardes.model';

export async function fetchConciliacionData(): Promise<ConciliacionData> {
  // Buscamos el documento por el tipo 'conciliacion'
  // Usamos [0] porque solo gestionamos un documento único para esta página
  const query = `*[_type == "conciliacion"][0]{
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
  }`;

  return await sanityClient.fetch(query);
}
