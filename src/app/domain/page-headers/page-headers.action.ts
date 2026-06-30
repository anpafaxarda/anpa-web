import { sanityClient } from '../../core/api/sanity.client';
import { PageHeaders } from './page-headers.model';

const pageHeaderProjection = `{ badge, title, subtitle }`;

export const fetchPageHeaders = async (): Promise<PageHeaders> => {
  return await sanityClient.fetch<PageHeaders>(`
    *[_type == "pageHeaders"][0] {
      extraescolares ${pageHeaderProjection},
      asambleas ${pageHeaderProjection},
      colaboradores ${pageHeaderProjection},
      contacto ${pageHeaderProjection},
      busEscolar ${pageHeaderProjection},
      directiva ${pageHeaderProjection},
      estatutos ${pageHeaderProjection},
      beneficios ${pageHeaderProjection},
      avisoLegal ${pageHeaderProjection},
      iniciativas ${pageHeaderProjection},
      faiteSocio ${pageHeaderProjection}
    }
  `);
};
