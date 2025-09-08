import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // <-- IMPORT a a a a

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()), // This enables DI for interceptors
    provideAnimations(),
provideToastr({
  timeOut: 5000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: true,
  progressBar: true, // Enable the progress bar
  closeButton: true, // Enable the close button
  // DO NOT provide a custom toastClass, let the CSS target the defaults
}),
// 👇 ADD THIS OBJECT TO REGISTER YOUR INTERCEPTOR 👇
{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
};