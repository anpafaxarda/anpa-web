export interface BeneficiosCompleto {
  categorias: Categorias;
  beneficiosDirectos: BeneficioDirecto[];
}

export interface BeneficioDirecto {
  titulo: string;
  descripcion: string;
  bonificacion: string;
  corFondo: string;
}

export interface BeneficiosPageData {
  categorias: Categorias;
  beneficiosDirectos: BeneficioDirecto[];
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
