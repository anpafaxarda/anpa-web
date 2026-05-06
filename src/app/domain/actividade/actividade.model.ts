export interface Subvencion {
  titulo: string;
  entidadeEmisora?: string;
  logos?: any[]; // Puedes tipar esto mejor con SanityImageSource si usas el helper
  textoLegal?: string;
}

export interface Actividade {
  id: string;
  titulo: string;
  slug: string; // Para a URL amigábel en Analog
  curso: string;
  data: string;
  resumo: string;
  imaxeUrl: string;
  organizador: string;
  porcentaxeSubvencion?: number;
  subvencion?: Subvencion;

  // Para a páxina de detalle (opcional se fas un fetch aparte)
  contidoLongo?: any; // Portable Text de Sanity
  galeria?: string[];
}
