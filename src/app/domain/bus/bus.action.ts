import { sanityClient } from '../../core/api/sanity.client';
import { RutaBus } from './bus.model';

export async function fetchBusEscolar(): Promise<RutaBus[]> {
  return await sanityClient.fetch(`*[_type == "rutaBus"] | order(nombreRuta asc) {
    _id,
    nombreRuta,
    conductor,
    paradas[] {
      nombre,
      horaRecogida,
      horaRegreso
    }
  }`);
}
