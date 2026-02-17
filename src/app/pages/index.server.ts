import { inject } from '@angular/core';
import { SanityService } from '../sanity.service';

export const load = async () => {
  const sanity = inject(SanityService);
  const actividades = await sanity.getExtraescolares();

  return {
    actividades
  };
};

export type LoadResult = Awaited<ReturnType<typeof load>>;
