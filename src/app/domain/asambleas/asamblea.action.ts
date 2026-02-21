import { sanityClient } from '../../core/api/sanity.client';
import { Asamblea } from './asamblea.model';

export async function fetchAsambleas(): Promise<Asamblea[]> {
  return await sanityClient.fetch(`*[_type == "asamblea"] | order(fecha desc) {
    _id,
    titulo,
    fecha,
    lugar,
    tipo,
    ordenDia
  }`);
}
