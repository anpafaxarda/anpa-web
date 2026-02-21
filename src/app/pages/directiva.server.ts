import { fetchMembers } from "../domain/members/members.action";


export const load = async () => {
  const members = await fetchMembers();

  return {
    directiva: members
  };
};
