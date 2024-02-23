import { enableProdMode, importProvidersFrom, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { IconsModule, LoaderInterceptorService } from '@blend-api/shared';
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

const loaderInterceptorProvider : Provider =    {
  provide: HTTP_INTERCEPTORS,
  useClass: LoaderInterceptorService,
  multi: true,
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, IconsModule),
    loaderInterceptorProvider,
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
