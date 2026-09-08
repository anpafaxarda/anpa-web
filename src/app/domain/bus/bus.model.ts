export interface TarifaEscalada {
  concepto: string;
  prezoSocio?: number;
  prezoOrdinario: number;
  desconto?: string; // Nuevo
}

export interface Parada {
  nombre: string;
  horaRecogida: string;
  horaRegreso: string;
  linkMapa?: string;
}

export interface RutaBus {
  _id: string;
  nombreRuta: string;
  paradas: Parada[];
}

export interface EntidadColaboradora {
  nombre: string;
  logoUrl: string;
}

export interface Bus {
  rutas: RutaBus[];
  tarifas: TarifaEscalada[];
  entidadesColaboradoras: EntidadColaboradora[];
}
