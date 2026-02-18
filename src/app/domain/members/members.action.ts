import { sanityClient } from '../../core/api/sanity.client';
import { Member } from './member.model';

export async function fetchMembers(): Promise<Member[]> {
  return await sanityClient.fetch(`*[_type == "member"] | order(order asc) {
    name,
    role,
    "imageUrl": image.asset->url,
    bio
  }`);
}
