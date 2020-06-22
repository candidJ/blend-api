import { Injectable } from '@angular/core';
import { Observable, of, throwError, pipe } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter, toArray, share, tap, catchError, retry } from 'rxjs/operators';
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
  private httpParams$: Observable<HttpParams>;
  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }


  getForecastByCityName(city: string) {
    this.httpParams$ = of(city)
      .pipe(map(city => {
        //api.openweathermap.org/data/2.5/forecast?q={cityName}
        return new HttpParams()
          .set('q', city)
          .set('units', this.config.UNITS)
          .set('appid', this.config.API_KEY)
      }));
    return this.getForecast();
  }

  getForecastByLatLong() {
    this.httpParams$ = this.getCurrentLocation()
      .pipe(
        map(coords => {
          // use to convert the coords to query params : -api.openweathermap.org/data/2.5/forecast?lat=25&long=125
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', this.config.UNITS)
            .set('appid', this.config.API_KEY)
        }));
    return this.getForecast();
  }

  private getForecast(): Observable<WeatherDefinition[]> {

    return this.httpParams$
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

          console.log(weatherIcon);
          forecast.icon = weatherIcon;
          return forecast;
        }),
        toArray(), // converts into array - here as array (of objects )
        share() // single network request - even if multiple subscription
      );
  }

  private getCurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      return window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          this.notificationService.showSuccessMessage("Weather information fetched");
          observer.complete();
        }, (err) => {
          // console.log("err", err);
          observer.error(err);
        });
    })
      .pipe(
        retry(1), // retry would re-subsribe to the observable by executing it again..
        // here arrow function with observer argument with be re executed. hence you will get two console in case an error occurs 
        tap(() => {
          this.notificationService.showSuccessMessage("Got your location...");
        }
          // tap has 3 argumnet- first is execued when next() is executed on observable
          // second in case error occurs
          // third when observable completes 
          // used to catch error from observable but not favored over catchError
          // , (err) => {
          //   console.log("error", err);
          // }
        ),
        catchError((err) => {
          //  #1 Handle the error 
          this.notificationService.showErrorMessage("Location denied...");
          //  #2 Return a new observable -- which can maybe pass default coordinates in case user denied location
          // unlike tap operator second argument; it DOES return an observable and pass something to pipe operator

          this.notificationService.showGeneralInfo("Fetching weather of Muktsar, IN");

          return of({
            longitude: 74.5122,
            latitude: 30.4762,
          });

          // throwError(err);

          /* is equivalent to 
          return new Observable((observer)=>{
              observer.error(err);
          }) */
        })
      )
  }
}
