import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import {
  NavbarComponent,
  IconsModule,
  NotificationsComponent,
} from '@blend-api/shared';
import { AppRoutingModule } from './app/app-routing.module';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

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
    provideRouter([
      {
        path: 'weather',
        loadChildren: () =>
          import('@blend-api/weather').then((r) => r.WEATHER_ROUTES),
      },
    ]),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
