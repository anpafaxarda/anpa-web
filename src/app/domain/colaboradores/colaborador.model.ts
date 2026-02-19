export interface Colaborador {
  _id?: string;
  name: string;
  category: 'alimentacion' | 'libreria' | 'moda' | 'salud' | 'ocio' | 'otros';
  description: string;
  discount: string;
  discountValue?: number;
  discountCondition: string;
  imageUrl: string;
  addressUrl: string;
  webSite: string;
}

export interface CategoriaResumen {
  id: string;
  nombre: string;
  maxDescuento: number;
  icono: string;
}

export interface Categorias {
  categorias: CategoriaResumen[];
  total: number;
}
