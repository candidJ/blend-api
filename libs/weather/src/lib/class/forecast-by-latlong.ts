import { of, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ForecastStrategy } from '../types/forecast-strategy.interface';
import { WEATHER_API_CONFIG } from '../constants/weather.const';
import { GeographicCoordinate } from './geographic-coordinate';

// Implementation of strategy
export class ForecastByLatLong implements ForecastStrategy {
  readonly #geographicCoordinate: GeographicCoordinate;

  constructor(cityGeographicCoordinate: GeographicCoordinate) {
    this.#geographicCoordinate = cityGeographicCoordinate;
  }

  forecast(): Observable<HttpParams> {
    return of(this.#geographicCoordinate).pipe(
      map((coords: GeographicCoordinate) => {
        // use to convert the coords to query params : openweathermap.org/data/2.5/forecast?lat=25&long=125
        return new HttpParams()
          .set('lat', coords.latitude())
          .set('lon', coords.longitude())
          .set('units', WEATHER_API_CONFIG.UNITS)
          .set('appid', WEATHER_API_CONFIG.API_KEY);
      }),
    );
  }
}
