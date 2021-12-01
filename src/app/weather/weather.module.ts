import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";
import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";
import { ForecastComponent } from "src/app/weather/components/forecast/forecast.component";
import { ForecastDetailsComponent } from "src/app/weather/components/forecast-details/forecast-details.component";
import { ForecastService } from "src/app/weather/services/forecast.service";
import { MessageBoxModule } from "src/app/shared/modules/message-box/message-box.module";
import { GridModule } from "src/app/shared/modules/grid/grid.module";
import { LoaderModule } from "src/app/shared/modules/loader/loader.module";
import { NotificationsModule } from "src/app/shared/modules/notifications/notifications.module";

@NgModule({
  declarations: [ForecastComponent, ForecastDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    NotificationsModule,
    LoaderModule,
    GridModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: ForecastComponent,
      },
    ]),
    SharedModule,
  ],
  providers: [ForecastService],
})
export class WeatherModule {}
