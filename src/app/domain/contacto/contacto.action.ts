import { sanityClient } from './../../core/api/sanity.client';
import { Contacto } from './contacto.model';

export async function fetchContacto(): Promise<Contacto> {
  const query = `*[_type == "contacto"][0]{
    telefono,
    whatsapp,
    tiempoRespuestaWhatsapp,
    email,
    tiempoRespuestaEmail,
    horariosAtencion
  }`;

  return await sanityClient.fetch(query);
}
