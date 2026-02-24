import { sanityClient } from '../../core/api/sanity.client';
import { Bus } from './bus.model';

export async function fetchBusEscolar(): Promise<Bus> {
  const query = `{
    "rutas": *[_type == "rutaBus"] | order(nombreRuta asc),
    "tarifa": *[_type == "busPrice"][0] { prezoSocio, prezoOrdinario }
  }`;

  const { rutas, tarifa } = await sanityClient.fetch(query);

  return {
    rutas,
    tarifa
  } as Bus;
}
