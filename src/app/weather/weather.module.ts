import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForecastDetailsComponent } from './forecast-details/forecast-details.component';
import { ForecastService } from './forecast.service';

@NgModule({
  declarations: [ForecastComponent, ForecastDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: "",
      component: ForecastComponent
    }]),
    SharedModule
  ],
  providers: [ForecastService]
})
export class WeatherModule { }
