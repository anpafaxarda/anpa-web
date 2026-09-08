export interface ConciliacionDetalle {
  etiqueta: string;
  valor: string;
}

export interface ConciliacionPlan {
  nombre: string;
  emoji: string;
  colorFondoIcono: string;
  detalles: ConciliacionDetalle[];
}

export interface EntidadColaboradora {
  nombre: string;
  logoUrl: string;
}

export interface IntroData {
  title: string;
  category: string;
  seccionIntro: {
    titulo: string;
    texto: string;
  };
  plans: ConciliacionPlan[];
  condicionsPagamento: string[];
  bonoAxuda: string;
  inscripcionTexto: string;
  inscripcionArchivoUrl?: string;
  entidadesColaboradoras: EntidadColaboradora[];
}

export interface TramosTemprano {
  horario: string;
  prezo: number;
}

export interface TramoTarde {
  concepto: string;
  prezo: number;
}

export interface PrezosSoltos {
  hora: number;
  mediaHora: number;
}

export interface Bonificacion {
  titulo: string;
  descripcion: string;
}

export interface BosDiasTardesConfig {
  tramosTemprano: TramosTemprano[];
  tramosTarde: TramoTarde[];
  prezosSoltos: PrezosSoltos;
  bonificacions: Bonificacion[];
}

export interface BosDiasTardesResponse {
  intro: IntroData;
  config: BosDiasTardesConfig;
}
