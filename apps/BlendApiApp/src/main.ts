import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    // remove the console logs in prod
    window.console.log = ()=> {};
    window.console.debug = ()=> {};
    window.console.warn = ()=> {};
    window.console.info = ()=> {};
    enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, { preserveWhitespaces: false })
  .catch((err) => console.error(err));
