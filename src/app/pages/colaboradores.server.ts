import { fetchColaboradores } from "../domain/colaboradores/colaboradores.action";

export const load = async () => {
  const colaboradores = await fetchColaboradores();

  return {
    colaboradores: colaboradores
  };
};
