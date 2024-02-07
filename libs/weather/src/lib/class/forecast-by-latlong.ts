import { of, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ForecastStrategy } from '../types/forecast-strategy.interface';
import { WEATHER_API_CONFIG } from '../constants/weather.const';

// Implementation of strategy
export class ForecastByLatLong implements ForecastStrategy {
  constructor(
    private coords: Pick<GeolocationCoordinates, 'latitude' | 'longitude'>,
  ) {}

  forecast(): Observable<HttpParams> {
    return of(this.coords).pipe(
      map((coords) => {
        // use to convert the coords to query params : -api.openweathermap.org/data/2.5/forecast?lat=25&long=125
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', WEATHER_API_CONFIG.UNITS)
          .set('appid', WEATHER_API_CONFIG.API_KEY);
      }),
    );
  }
}
