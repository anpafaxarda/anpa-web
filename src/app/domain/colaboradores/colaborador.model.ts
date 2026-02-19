export interface Colaborador {
  _id?: string;             // ID único de Sanity
  name: string;
  category: 'alimentacion' | 'libreria' | 'moda' | 'salud' | 'ocio' | 'otros';
  description: string;
  discount: string;         // El texto descriptivo (ej: "10% dto")
  discountValue?: number;   // El número para el cálculo (ej: 10)
  discountCondition: string;
  imageUrl: string;
  addressUrl: string;
  webSite: string;
}

// Interfaz auxiliar para la sección de Beneficios que mencionamos
export interface CategoriaResumen {
  id: string;
  nombre: string;
  maxDescuento: number;
  icono: string;
}
