import 'zone.js';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { App } from './app/app';
import routeConfig from './app/routes';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), provideHttpClient()],
}).catch((err) => console.error(err));

