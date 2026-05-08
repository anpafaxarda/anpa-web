import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { withPreloading, PreloadAllModules } from '@angular/router';
import { GlobalDataService } from './shared/services/global-data.service';
import { provideImgixLoader } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([])
    ),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => {
      const globalDataService = inject(GlobalDataService);
      return globalDataService.init();
    }),
    provideImgixLoader('https://cdn.sanity.io/'),
  ],
};
