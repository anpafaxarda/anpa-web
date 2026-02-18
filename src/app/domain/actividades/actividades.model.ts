export interface Actividad {
  name: string;
  imageUrl?: string;
  price: string;
  classDuration: string;
  enrollmentPeriod: string;
  coursePeriod: string;
  description?: any[];
  diaSemana: 'Luns' | 'Martes' | 'Mércores' | 'Xoves' | 'Venres';
  horaInicio: string;
  horaFin: string;
}
