import { fetchActividades } from "../domain/actividades/actividades.action";

export const load = async () => {
  const activities = await fetchActividades();

  return {
    actividades: activities
  };
};
