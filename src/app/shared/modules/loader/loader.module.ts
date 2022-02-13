import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { LoaderComponent } from "src/app/shared/modules/loader/components/loader.component";
import { LoaderInterceptorService } from "src/app/shared/modules/loader/services/loader-interceptor.service";
import { LoaderService } from "src/app/shared/modules/loader/services/loader.service";

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule],
  exports: [LoaderComponent],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
})
export class LoaderModule {}