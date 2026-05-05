export interface FaiteSocioFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TutorialStep {
  title: string;
  description: string;
  imageUrl: string;
}

export interface FaiteSocioData {
  title: string;
  subtitle: string;
  // Prezos
  cuotaBonificada1: number;
  cuotaBonificadaPlus: number;
  cuotaGeneral1: number;
  cuotaGeneralPlus: number;
  // Fechas (vienen como string ISO desde Sanity)
  inicioBonificacion: string;
  finBonificacion: string;
  // Enlaces
  urlAppWeb: string;
  urlIOS: string;
  urlAndroid: string;
  // Array dinámico
  features: FaiteSocioFeature[];
  tutorialSteps: TutorialStep[];
}
