export interface Asamblea {
  _id: string;
  titulo: string;
  fecha: string; // ISO string que viene de Sanity
  lugar: string;
  tipo: 'Ordinaria' | 'Extraordinaria' | 'Informativa';
  ordenDia: string[];
}
