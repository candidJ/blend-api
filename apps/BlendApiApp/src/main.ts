import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import {
  NavbarComponent,
  IconsModule,
  NotificationsComponent,
} from '@blend-api/shared';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.route';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      NavbarComponent,
      IconsModule,
      NotificationsComponent,
    ),
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
