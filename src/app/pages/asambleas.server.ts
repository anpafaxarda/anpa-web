import { fetchAsambleas } from "../domain/asambleas/asamblea.action";


export const load = async () => {
  const asambleas = await fetchAsambleas();

  return {
    asambleas: asambleas
  };
};
