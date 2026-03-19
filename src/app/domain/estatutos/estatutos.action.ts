import { sanityClient } from '../../core/api/sanity.client';
import { EstatutosData } from './estatutos.model';

export async function fetchEstatutos(): Promise<EstatutosData> {
  return await sanityClient.fetch(`*[_type == "estatutos"][0] {
      nombreAsociacion,
      ultimaActualizacion,
      domicilio,
      codigoPostal,
      localidad,
      numInscripcion,
      "pdfUrl": archivoPdf.asset->url,
      "secciones": secciones[] {
        titulo,
        contenido
      }
  }`);
}
