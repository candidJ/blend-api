import { ForecastStrategy } from './forecast-strategy.interface';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppConfig } from '../shared/constant/config';
import { CityPayload } from '../shared/interface/interface';

// Implementation of strategy
export class ForecastByCityName implements ForecastStrategy {

    constructor(private config: Partial<CityPayload>) { }

    forecast(): Observable<HttpParams> {
        return of(
            {
                ...this.config
            }
        )
            .pipe(map(data => {
                //api.openweathermap.org/data/2.5/forecast?q={cityName}
                return new HttpParams()
                    .set('q', data.city)
                    .set('units', data.unit || AppConfig.WEATHER_API_CONFIG.UNITS)
                    .set('appid', AppConfig.WEATHER_API_CONFIG.API_KEY)
            }));

    }

}