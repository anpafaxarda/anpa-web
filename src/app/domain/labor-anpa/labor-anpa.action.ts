
import { sanityClient } from './../../core/api/sanity.client';
import { PageTexts } from './labor-anpa.model';

export async function fetchLaborAnpaPageData() {
  const query = `{
    "servizos": *[_type == "servizo"] | order(order asc) {
      name,
      emoji,
      description
    },
    "motivos": *[_type == "motivoSocio"] | order(order asc) {
      text
    }
  }`;

  return await sanityClient.fetch(query);
}

export const fetchLaborAnpaPageTextsData = async () => {
  return await sanityClient.fetch<PageTexts>(`
    *[_type == "laborAnpaPageTexts"][0] {
      badge,
      title,
      subtitle,
      introTitleColor1,
      introTitleColor2,
      introParrafo,
      esloganFaiteSocio,
      titleServizos,
      titleIniciativas,
      titleFaiteSocio
    }
  `);
}

