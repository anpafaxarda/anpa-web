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
  prezoSocio: number;
  prezoOrdinario: number;
}

export interface Bus {
  rutas: RutaBus[];
  tarifa: Tarifa;
}

export interface Tarifa {
  prezoSocio: number;
  prezoOrdinario: number;
}
