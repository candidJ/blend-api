import { Injectable } from '@angular/core';
import { Observable, of, throwError, pipe } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter, toArray, share, tap, catchError, retry, shareReplay } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NotificationService } from '../notifications/notification.service';
import { AppConfig } from '../shared/constant/config';
import { IOpenWeatherResponse, WeatherDefinition } from '../shared/interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private readonly config = AppConfig.WEATHER_API_CONFIG;
  private dataClone: IOpenWeatherResponse;

  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }


  public getForecast(forecastHttpParams: Observable<HttpParams>): Observable<WeatherDefinition[]> {

    return forecastHttpParams
      .pipe(
        // create a new observable with the last emitted value from previous operator
        switchMap(params => {
          console.log(params);
          return this.httpClient.get<IOpenWeatherResponse>(this.config.URL, { params });
        }
        ),
        tap(value => {
          this.dataClone = Object.assign({}, value);
          return value;
        }),
        pluck('list'), // pluck out the list property
        mergeMap(value => of(...value)), // take array record and create a stream of data -observable; of single list
        filter((value, index) => index % 8 === 0), // only concerned with every 8th value 
        map(value => {
          // console.log(value, "weather info");
          // console.log(this.dataClone, "dataclone");
          let forecast: WeatherDefinition = {
            currentTemp: value.main.temp,
            feelsLike: value.main.feels_like,
            minTemp: value.main.temp_min,
            maxTemp: value.main.temp_max,
            humidity: value.main.humidity,
            title: value.weather[0].main,
            description: value.weather[0].description,
            id: value.weather[0].id,
            date: value.dt_txt,
            city: this.dataClone.city.name,
            country: this.dataClone.city.country,
            //Convert a Unix timestamp to time
            sunrise: new Date(this.dataClone.city.sunrise * 1000),
            sunset: new Date(this.dataClone.city.sunset * 1000),
            windSpeed: value.wind.speed,
            windDeg: value.wind.deg
          };

          const date = new Date();
          let weatherIcon: string;

          /* Get suitable icon for weather */
          if (date.getHours() >= forecast.sunrise.getHours() && date.getHours() < forecast.sunset.getHours()) {
            weatherIcon = `wi wi-owm-day-${forecast.id}`;
          }
          else {
            weatherIcon = `wi wi-owm-night-${forecast.id}`;
          }

          // console.log(weatherIcon);
          forecast.icon = weatherIcon;
          return forecast;
        }),
        toArray(), // converts into array - here as array (of objects )
        shareReplay() // single network request - even if multiple subscription
      );
  }

}
