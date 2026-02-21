export interface Parada {
  nombre: string;
  horaRecogida: string;
  horaRegreso: string;
}

export interface RutaBus {
  _id: string;
  nombreRuta: string;
  conductor?: string;
  paradas: Parada[];
}
