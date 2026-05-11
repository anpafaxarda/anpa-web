import { sanityClient } from './../../core/api/sanity.client';

export async function fetchIniciativas() {
  const query = `*[_type == "iniciativa"] | order(orden asc) {
    titulo,
    tipoCabecera,
    emoji,
    "imagePath": imaxe.asset->path,
    "imageUrl": imaxe.asset->url,
    corFondo,
    descripcion,
    etiquetaTexto
  }`;
  return await sanityClient.fetch(query);
}
