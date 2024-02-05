import { Routes } from '@angular/router';
import { ForecastComponent } from '../components/forecast/forecast.component';
import { ForecastService } from '../services/forecast.service';

export const WEATHER_ROUTES: Routes = [
  {
    providers: [ForecastService],
    path: '',
    component: ForecastComponent,
  },
];
