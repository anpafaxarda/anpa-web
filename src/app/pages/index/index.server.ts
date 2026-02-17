import { fetchActividades } from "../../domain/actividades/actividades.action";

export const load = async () => {
  const lista = await fetchActividades();
  console.log('🔍 [SERVER] Datos obtenidos de Sanity:', lista.length); // Esto saldrá en tu TERMINAL, no en el navegador

  return {
    actividades: lista
  };
};
