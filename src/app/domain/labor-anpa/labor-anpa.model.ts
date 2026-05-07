export interface Servizo {
  name: string;
  emoji: string;
  description: string;
}

export interface MotivoSocio {
  text: string;
}

export interface SociosPageData {
  servizos: Servizo[];
  motivos: MotivoSocio[];
}

export interface PageTexts {
  badge: string;
  title: string;
  subtitle: string;
  introTitleColor1: string;
  introTitleColor2: string;
  introParrafo: string;
  esloganFaiteSocio: string;
  titleServizos: string;
  titleIniciativas: string;
  titleFaiteSocio: string;
}
