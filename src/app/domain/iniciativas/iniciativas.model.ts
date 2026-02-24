export interface Iniciativa {
  titulo: string;
  tipoCabecera: 'emoji' | 'image';
  emoji?: string;
  imageUrl?: string;
  corFondo?: string;
  descripcion: string;
  etiquetaTexto: string;
}
