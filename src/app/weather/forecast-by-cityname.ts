import { ForecastStrategy } from './forecast-strategy.interface';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppConfig } from '../shared/constant/config';

export class ForecastByCityName implements ForecastStrategy {

    constructor(private cityName: string) { }

    forecast(): Observable<HttpParams> {
        return of(this.cityName)
            .pipe(map(city => {
                //api.openweathermap.org/data/2.5/forecast?q={cityName}
                return new HttpParams()
                    .set('q', city)
                    .set('units', AppConfig.WEATHER_API_CONFIG.UNITS)
                    .set('appid', AppConfig.WEATHER_API_CONFIG.API_KEY)
            }));

    }

}