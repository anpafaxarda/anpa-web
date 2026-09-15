export interface FaiteSocioFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TutorialStep {
  title: string;
  description: string;
  imagePath: string;
  imageUrl: string;
  isRegistration: boolean;
}

export interface PasoAlta {
  titulo: string;
  descricion: string;
  notaAdicional?: string;
}

export interface ProcesoAlta {
  titulo?: string;
  introducion?: string;
  pasos?: PasoAlta[];
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
  fechaAperturaInscricion?: string;
  procesoAlta?: ProcesoAlta;
  // Enlaces
  urlAppWeb: string;
  urlIOS: string;
  urlAndroid: string;
  // Array dinámico
  features: FaiteSocioFeature[];
  tutorialSteps: TutorialStep[];
}
