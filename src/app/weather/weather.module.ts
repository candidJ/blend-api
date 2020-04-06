import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ForecastComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: ForecastComponent
    }])
  ]
})
export class WeatherModule { }
