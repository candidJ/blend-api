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
  NotificationsModule,
} from '@blend-api/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IconsModule,
    NotificationsModule,
    GridModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForecastComponent,
      },
    ]),
    ForecastComponent,
    ForecastDetailsComponent,
  ],
  providers: [ForecastService],
})
export class WeatherModule {}
