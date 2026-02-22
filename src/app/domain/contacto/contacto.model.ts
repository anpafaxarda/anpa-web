export interface HorarioAtencion {
  dias: string;
  horas: string;
}

export interface Contacto {
  telefono: string;
  whatsapp: string;
  tiempoRespuestaWhatsapp?: string; // Opcional
  email: string;
  tiempoRespuestaEmail?: string;    // Opcional
  horariosAtencion?: HorarioAtencion[]; // Opcional
}
