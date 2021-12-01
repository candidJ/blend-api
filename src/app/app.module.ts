import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";
import { NavbarModule } from "src/app/shared/modules/navbar/navbar.module";
import { LoaderModule } from "src/app/shared/modules/loader/loader.module";
import { NotificationsModule } from "src/app/shared/modules/notifications/notifications.module";
import { IconsModule } from "./shared/modules/feather-icons/icons.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NavbarModule,
    LoaderModule,
    IconsModule,
    NotificationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
