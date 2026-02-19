import { fetchCategorias } from '../domain/colaboradores/categorias.action';

export const load = async () => {
  const categorias = await fetchCategorias();
  return {
    categorias: categorias
  };
};
