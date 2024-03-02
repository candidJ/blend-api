import { of, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ForecastStrategy } from '../types/forecast-strategy.interface';
import { WEATHER_API_CONFIG } from '../constants/weather.const';
import { LatitudeAndLongitude } from '../types/weather.interface';

// Implementation of strategy
export class ForecastByLatLong implements ForecastStrategy {
  readonly #currentGeographicCoordinate: LatitudeAndLongitude;
  constructor(cityGeographicCoordinate: LatitudeAndLongitude) {
    this.#currentGeographicCoordinate = cityGeographicCoordinate;
  }

  forecast(): Observable<HttpParams> {
    return of(this.#currentGeographicCoordinate).pipe(
      map((coords: LatitudeAndLongitude) => {
        // use to convert the coords to query params : openweathermap.org/data/2.5/forecast?lat=25&long=125
        return new HttpParams()
          .set('lat', String(coords.latitude))
          .set('lon', String(coords.longitude))
          .set('units', WEATHER_API_CONFIG.UNITS)
          .set('appid', WEATHER_API_CONFIG.API_KEY);
      }),
    );
  }
}
