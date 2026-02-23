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
