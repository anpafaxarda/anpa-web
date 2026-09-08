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
    nivelEducativo,
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
    nivelEducativo,
    "subvencion": subvencion-> {
      titulo,
      entidadeEmisora,
      "logos": logos[].asset->path,
      textoLegal
    },
    contidoLongo,
    "galeria": galeria[].asset->path
  }`;
  return await sanityClient.fetch(query, { slug });
}

export async function fetchCursosDisponibles(): Promise<string[]> {
  const query = `{
    "cursosConActividades": *[_type == "actividade"].curso,
    "cursoActual": *[_type == "configuracionActividades"][0].cursoActual
  }`;
  const { cursosConActividades, cursoActual } = await sanityClient.fetch<{ cursosConActividades: string[]; cursoActual: string | null }>(query);

  const cursos = new Set(cursosConActividades || []);
  if (cursoActual) cursos.add(cursoActual);

  return [...cursos].sort((a, b) => b.localeCompare(a));
}

export async function fetchCursoActualConfigurado(): Promise<string | null> {
  const query = `*[_type == "configuracionActividades"][0].cursoActual`;
  return await sanityClient.fetch<string | null>(query);
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
    organizador,
    porcentaxeSubvencion,
    nivelEducativo,
  }`;
  return await sanityClient.fetch(query, { curso });
}
