import { sanityClient } from '../../core/api/sanity.client';
import { Actividade } from './actividade.model';

export async function fetchActividades(): Promise<Actividade[]> {
  const query = `*[_type == "actividade"] | order(data desc) {
    "id": _id,
    titulo,
    "slug": slug.current,
    curso,
    data,
    resumo,
    "imaxePath": imaxePortada.asset->path,
    "imaxeUrl": imaxePortada.asset->url,
    organizador,
    porcentaxeSubvencion,
  }`;
  return await sanityClient.fetch(query);
}

export async function fetchActividadeBySlug(slug: string): Promise<Actividade> {
  const query = `*[_type == "actividade" && slug.current == $slug][0] {
    titulo,
    "slug": slug.current,
    curso,
    data,
    "imaxePath": imaxePortada.asset->path,
    "imaxeUrl": imaxePortada.asset->url,
    organizador,
    porcentaxeSubvencion,
    "subvencion": subvencion-> {
      titulo,
      entidadeEmisora,
      logos,
      textoLegal
    },
    contidoLongo,
    "galeria": galeria[].asset->url
  }`;
  return await sanityClient.fetch(query, { slug });
}

export async function fetchCursosDisponibles(): Promise<string[]> {
  const query = `*[_type == "actividade"] | order(curso desc).curso`;
  const cursos = await sanityClient.fetch<string[]>(query);
  return [...new Set(cursos)]; // Eliminamos duplicados
}

export async function fetchActividadesByCurso(curso: string): Promise<Actividade[]> {
  const query = `*[_type == "actividade" && curso == $curso] | order(data desc) {
    "id": _id,
    titulo,
    "slug": slug.current,
    curso,
    data,
    resumo,
    "imaxePath": imaxePortada.asset->path,
    "imaxeUrl": imaxePortada.asset->url,
    rol
  }`;
  return await sanityClient.fetch(query, { curso });
}
