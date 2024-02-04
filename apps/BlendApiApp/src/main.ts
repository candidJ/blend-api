import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { NavbarModule, LoaderModule, IconsModule, NotificationsModule } from '@blend-api/shared';
import { AppRoutingModule } from './app/app-routing.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, NavbarModule, LoaderModule, IconsModule, NotificationsModule),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch((err) => console.error(err));
