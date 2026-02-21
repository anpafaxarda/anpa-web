import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { withPreloading, PreloadAllModules } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        (req, next) => {
          if (typeof window !== 'undefined' && req.url.includes('_analog/pages')) {
            console.log('Navegación SPA detectada hacia:', req.url);
          }
          return next(req);
        },
        requestContextInterceptor
      ])
    ),
    provideClientHydration(withEventReplay()),
  ],
};
