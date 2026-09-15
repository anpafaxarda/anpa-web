import { sanityClient } from '../../core/api/sanity.client';
import { ExtraescolaresInscripcion } from './extraescolares-inscripcion.model';

export async function fetchExtraescolaresInscripcion(): Promise<ExtraescolaresInscripcion | null> {
  return await sanityClient.fetch(`
    *[_type == "extraescolaresInscripcion"][0] {
      inscripcionActiva,
      titulo,
      subtitulo,
      abacoDisponible,
      etiquetaAbaco,
      tituloAbaco,
      abacoDescripcion,
      urlAbacoIOS,
      urlAbacoAndroid,
      etiquetaFormulario,
      tituloFormulario,
      formularioDescripcion,
      textoBotonFormulario,
      "formularioArchivoUrl": formularioArchivo.asset->url,
      formularioEnlace,
      prazoInicio,
      prazoFin,
      condicionsServizo,
      informacionAdicional,
      tituloCerrada,
      mensaxeCerrada
    }
  `);
}
