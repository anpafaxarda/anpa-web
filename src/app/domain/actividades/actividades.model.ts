export interface Actividad {
  nombre: string;
  imagenUrl: string;      // La transformaremos en el "action" para que sea un string directo
  precio: string;         // Precio y Duración
  horario: string;        // Días de impartición
  contactoMonitor: string;
  programa: any[];
}
