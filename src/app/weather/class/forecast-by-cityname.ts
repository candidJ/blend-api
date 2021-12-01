import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { of } from "rxjs";

import { ForecastStrategy } from "src/app/weather/types/forecast-strategy.interface";
import { AppConfig } from "src/app/shared/constant/config";
import { CityPayload } from "src/app/weather/types/weather.interface";

// Implementation of strategy
export class ForecastByCityName implements ForecastStrategy {
  constructor(private config: Partial<CityPayload>) {}

  forecast(): Observable<HttpParams> {
    return of({
      ...this.config,
    }).pipe(
      map((data) => {
        //api.openweathermap.org/data/2.5/forecast?q={cityName}
        return new HttpParams()
          .set("q", data.city)
          .set("units", data.unit || AppConfig.WEATHER_API_CONFIG.UNITS)
          .set("appid", AppConfig.WEATHER_API_CONFIG.API_KEY);
      })
    );
  }
}
