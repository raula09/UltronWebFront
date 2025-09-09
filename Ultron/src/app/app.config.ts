import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // <-- IMPORT a a a a
import { NgxSpinnerModule } from 'ngx-spinner';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()), 
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true, 
      closeButton: true,
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
};
