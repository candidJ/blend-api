import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";
import { ProgrammingComponent } from "src/app/quotes/components/programming/programming.component";
import { LifeComponent } from "src/app/quotes/components/life/life.component";
import { MessageBoxModule } from "src/app/shared/modules/message-box/message-box.module";
import { GridModule } from "src/app/shared/modules/grid/grid.module";
import { LoaderModule } from "src/app/shared/modules/loader/loader.module";
import { PaginatorModule } from "src/app/shared/modules/paginator/paginator.module";
import { NotificationsModule } from "src/app/shared/modules/notifications/notifications.module";

@NgModule({
  declarations: [ProgrammingComponent, LifeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        children: [
          {
            path: "programming",
            component: ProgrammingComponent,
          },
          {
            path: "life",
            component: LifeComponent,
          },
          {
            path: "",
            redirectTo: "life",
          },
        ],
      },
    ]),
    IconsModule,
    NotificationsModule,
    MessageBoxModule,
    PaginatorModule,
    LoaderModule,
    SharedModule,
  ],
})
export class QuotesModule {}
