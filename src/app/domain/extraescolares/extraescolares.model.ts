export interface Actividad {
  name: string;
  esNova?: boolean;
  imagePath?: string;
  imageUrl?: string;
  price: string;
  memberPrice: string;
  discountTag: string;
  classDuration: string;
  enrollmentPeriod: string;
  coursePeriod: string;
  observacions?: string;
  description?: any[];
  diaSemana: 'Luns' | 'Martes' | 'Mércores' | 'Xoves' | 'Venres';
  horaInicio: string;
  horaFin: string;
}
