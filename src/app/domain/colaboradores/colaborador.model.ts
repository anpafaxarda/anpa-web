export interface Colaborador {
  _id?: string;
  name: string;
  category: 'alimentacion' | 'libreria' | 'moda' | 'salud' | 'ocio' | 'otros';
  description: string;
  discount: string;
  discountValue?: number;
  discountCondition: string;
  imagePath?: string;
  imageUrl: string;
  addressUrl: string;
  webSite: string;
}
