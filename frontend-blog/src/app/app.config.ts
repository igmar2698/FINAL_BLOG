import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// withFetch özelliğini de içeri aktardık:
import { provideHttpClient, withFetch } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // İnternet motoruna "yeni nesil fetch kullan" emrini verdik:
    provideHttpClient(withFetch()) 
  ]
};