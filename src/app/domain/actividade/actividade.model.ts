export interface Subvencion {
  titulo: string;
  entidadeEmisora?: string;
  logos?: any[];
  textoLegal?: string;
}

export interface Actividade {
  id: string;
  titulo: string;
  slug: string; // Para a URL amigábel en Analog
  curso: string;
  data: string;
  resumo: string;
  imaxePath: string;
  imaxeUrl: string;
  organizador: string;
  porcentaxeSubvencion?: number;
  subvencion?: Subvencion;

  // Para a páxina de detalle (opcional se fas un fetch aparte)
  contidoLongo?: any;
  galeria?: string[];
}
