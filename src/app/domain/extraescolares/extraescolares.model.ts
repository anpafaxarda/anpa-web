export interface Actividad {
  name: string;
  imagePath?: string;
  imageUrl?: string;
  price: string;
  memberPrice: string;
  discountTag: string;
  classDuration: string;
  enrollmentPeriod: string;
  coursePeriod: string;
  description?: any[];
  diaSemana: 'Luns' | 'Martes' | 'Mércores' | 'Xoves' | 'Venres';
  horaInicio: string;
  horaFin: string;
}
