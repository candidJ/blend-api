import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";

import { MessageBoxModule } from "src/app/shared/modules/message-box/message-box.module";
import { NavbarModule } from "src/app/shared/modules/navbar/navbar.module";
import { GridModule } from "src/app/shared/modules/grid/grid.module";
import { LoaderModule } from "src/app/shared/modules/loader/loader.module";
import { PaginatorModule } from "src/app/shared/modules/paginator/paginator.module";
import { NotificationsModule } from "src/app/shared/modules/notifications/notifications.module";
import { SharedModule } from "./shared/shared.module";
import { IconsModule } from "./shared/modules/feather-icons/icons.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    GridModule,
    LoaderModule,
    PaginatorModule,
    IconsModule,
    MessageBoxModule,
    NotificationsModule,
    // SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
