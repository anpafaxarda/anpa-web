import { fetchBusEscolar } from "../domain/bus/bus.action";

export const load = async () => {
  const rutas = (await fetchBusEscolar());

  return {
    rutas: rutas
  };
};
