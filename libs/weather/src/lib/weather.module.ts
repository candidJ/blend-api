import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastDetailsComponent } from './components/forecast-details/forecast-details.component';
import { ForecastService } from './services/forecast.service';
import {
  GridModule,
  IconsModule,
  LoaderModule,
  NotificationsModule,
  PipeModule,
} from '@blend-api/shared';

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
    PipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForecastComponent,
      },
    ]),
  ],
  providers: [ForecastService],
})
export class WeatherModule {}
