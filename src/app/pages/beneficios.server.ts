import { fetchCategorias } from '../domain/colaboradores/categorias.action';
import { Categorias } from '../domain/colaboradores/colaborador.model';

export const load = async () => {
  const data = await fetchCategorias();
  return {
    categorias: data.categorias, total: data.total
  } as Categorias;
};
