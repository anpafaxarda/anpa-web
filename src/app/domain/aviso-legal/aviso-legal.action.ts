import { sanityClient } from '../../core/api/sanity.client';

export async function fetchAvisoLegal() {
  const query = `*[_type == "avisoLegal"][0]`;
  return await sanityClient.fetch(query);
}
