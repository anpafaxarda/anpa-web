import { sanityClient } from '../../core/api/sanity.client';
import { FaiteSocioData } from './faite-socio.model';

export const fetchFaiteSocioData = async () => {
  return await sanityClient.fetch<FaiteSocioData>(`
    *[_type == "faiteSocioPage"][0]{
      title,
      subtitle,
      cuotaBonificada1,
      cuotaBonificadaPlus,
      cuotaGeneral1,
      cuotaGeneralPlus,
      inicioBonificacion,
      finBonificacion,
      urlAppWeb,
      urlIOS,
      urlAndroid,
      features,
      "tutorialSteps": tutorialSteps[]{
        title,
        description,
        "imageUrl": image.asset->url
      }
    }
  `);
};
