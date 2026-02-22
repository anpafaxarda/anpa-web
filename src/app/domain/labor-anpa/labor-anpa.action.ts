
import { sanityClient } from './../../core/api/sanity.client';

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
