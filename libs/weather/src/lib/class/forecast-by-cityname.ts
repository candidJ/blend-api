import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ForecastStrategy } from '../types/forecast-strategy.interface';
import { CityPayload } from '../types/weather.interface';
import { WEATHER_API_CONFIG } from '../constants/weather.const';

/**
 * Concrete implementation of ForecastStrategy
 * API : api.openweathermap.org/data/2.5/forecast?q={cityName}
 */
export class ForecastByCityName implements ForecastStrategy {
  constructor(private config: CityPayload) {}

  getForecastParams(): Observable<HttpParams> {
    return of(this.config).pipe(
      map((data) => {
        return new HttpParams()
          .set('q', data.city)
          .set('units', data.units || WEATHER_API_CONFIG.UNITS)
          .set('appid', WEATHER_API_CONFIG.API_KEY);
      }),
    );
  }
}
