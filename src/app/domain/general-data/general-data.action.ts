import { sanityClient } from './../../core/api/sanity.client';
import { GeneralData } from './general-data.model';

export const fetchGeneralData = async () => {
  return await sanityClient.fetch<GeneralData>(`
    *[_type == "general"][0] {
      legalName,
      shortName,
      address,
      schoolName,
      mainBadge,
      mainTitle,
      mainSubTitle,
      footerText,
      footerCopyright
    }
  `);
}
