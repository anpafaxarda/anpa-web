import { sanityClient } from '../../core/api/sanity.client';
import { Bus } from './bus.model';

export async function fetchBusEscolar(): Promise<Bus> {
  const query = `{
    "rutas": *[_type == "rutaBus"] | order(nombreRuta asc),
    "tarifaDoc": *[_type == "busPrice"][0] {
      tarifas,
      entidadesColaboradoras[]{
        nombre,
        "logoUrl": logo.asset->url
      }
    }
  }`;

  const { rutas, tarifaDoc } = await sanityClient.fetch(query);

  return {
    rutas: rutas || [],
    tarifas: tarifaDoc?.tarifas || [],
    entidadesColaboradoras: tarifaDoc?.entidadesColaboradoras || []
  };
}
