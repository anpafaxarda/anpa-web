import { sanityClient } from '../../core/api/sanity.client';
import { BeneficioDirecto, BeneficiosCompleto, Categorias } from './beneficios.model';

export async function fetchBeneficiosPage(): Promise<BeneficiosCompleto> {
  const query = `{
    "colaboradores": *[_type == "colaborador" && defined(category)] { category, discountValue },
    "total": count(*[_type == "colaborador"]),
    "beneficiosDirectos": *[_type == "beneficioDirecto"] | order(orden asc) {
       titulo, descripcion, bonificacion, corFondo
    }
  }`;

  const { colaboradores, total, beneficiosDirectos } = await sanityClient.fetch(query);

  const mapaConfig: Record<string, { nombre: string, icono: string }> = {
    alimentacion: { nombre: 'Alimentación', icono: '🍎' },
    libreria: { nombre: 'Librería y Papelería', icono: '📚' },
    moda: { nombre: 'Moda y Deporte', icono: '👕' },
    salud: { nombre: 'Salud y Belleza', icono: '✨' },
    ocio: { nombre: 'Ocio y Formación', icono: '🎨' },
    otros: { nombre: 'Otros servicios', icono: '🏪' }
  };

  const agrupados = colaboradores.reduce((acc: any, item: any) => {
    const cat = item.category;
    const val = item.discountValue || 0;
    if (!acc[cat] || val > acc[cat]) acc[cat] = val;
    return acc;
  }, {});

  const categorias = Object.keys(agrupados).map(key => ({
    id: key,
    nombre: mapaConfig[key]?.nombre || key,
    icono: mapaConfig[key]?.icono || '🏪',
    maxDescuento: agrupados[key]
  }));

  return {
    categorias: {
      categorias,
      total,
    } as Categorias,
    beneficiosDirectos: beneficiosDirectos as BeneficioDirecto[]
  } as BeneficiosCompleto;
}
