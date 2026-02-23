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

export interface ConciliacionData {
  title: string;
  category: string;
  seccionIntro: {
    titulo: string;
    texto: string;
  };
  plans: ConciliacionPlan[];
}
