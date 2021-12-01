import { of, Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

import { ForecastStrategy } from "src/app/weather/types/forecast-strategy.interface";
import { AppConfig } from "src/app/shared/constant/config";

// Implementation of strategy
export class ForecastByLatLong implements ForecastStrategy {
  constructor(private coords: { latitude: number; longitude: number }) {}

  forecast(): Observable<HttpParams> {
    return of(this.coords).pipe(
      map((coords) => {
        // console.log(coords);
        // use to convert the coords to query params : -api.openweathermap.org/data/2.5/forecast?lat=25&long=125
        return new HttpParams()
          .set("lat", String(coords.latitude))
          .set("lon", String(coords.longitude))
          .set("units", AppConfig.WEATHER_API_CONFIG.UNITS)
          .set("appid", AppConfig.WEATHER_API_CONFIG.API_KEY);
      })
    );
  }
}
