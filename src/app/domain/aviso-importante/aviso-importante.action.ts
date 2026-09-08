import { sanityClient } from '../../core/api/sanity.client';
import { AvisoImportante } from './aviso-importante.model';

export async function fetchAvisoImportante(): Promise<AvisoImportante | null> {
  return await sanityClient.fetch(`
    *[_type == "avisoImportante" && fechaCaducidad > now()][0] {
      titulo,
      texto,
      enlaceTexto,
      "enlaceUrl": select(
        enlaceTipo == "pagina" => enlaceUrl,
        enlaceTipo == "documento" => enlaceArchivo.asset->url
      )
    }
  `);
}
