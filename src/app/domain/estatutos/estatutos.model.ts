export interface SeccionEstatuto {
  titulo: string;
  contenido: any[];
}

export interface EstatutosData {
  nombreAsociacion: string;
  ultimaActualizacion: string;
  domicilio: string;
  codigoPostal: string;
  localidad: string;
  numInscripcion: string;
  pdfUrl?: string;
  secciones: SeccionEstatuto[];
}
