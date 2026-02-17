import { sanityClient } from '../../core/api/sanity.client';
import { Actividad } from './actividades.model';

export async function fetchActividades(): Promise<Actividad[]> {
  return await sanityClient.fetch(`*[_type == "extraescolar"]{
    nombre,
    "imagenUrl": imagen.asset->url,
    precio,
    horario,
    contactoMonitor,
    programa
  }`);
}
