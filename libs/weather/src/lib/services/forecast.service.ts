import { Injectable } from '@angular/core';
import { Observable, of, throwError, pipe, Subject } from 'rxjs';
import {
  map,
  switchMap,
  pluck,
  mergeMap,
  filter,
  toArray,
  share,
  tap,
  catchError,
  retry,
  shareReplay,
} from 'rxjs/operators';
import {
  HttpParams,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  IOpenWeatherResponse,
  WeatherDefinition,
} from '../types/weather.interface';
import { AppConfig } from '@blend-api/shared';
import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';

@Injectable()
export class ForecastService {
  private readonly config = AppConfig.WEATHER_API_CONFIG;
  private dataClone: IOpenWeatherResponse;
  private cityPublisher = new Subject<boolean>();
  private units = '';

  public showRandomCities$ = this.cityPublisher.asObservable();

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
    this.cityPublisher.next(false);
  }

  public getForecast(
    forecastHttpParams: Observable<HttpParams>
  ): Observable<WeatherDefinition[]> {
    return forecastHttpParams.pipe(
      // create a new observable with the last emitted value from previous operator
      switchMap((params) => {
        this.units = params.get('units') || '';
        return this.httpClient.get<IOpenWeatherResponse>(this.config.URL, {
          params,
        });
      }),
      tap((value) => {
        this.dataClone = Object.assign({}, value);
        this.notificationService.showSuccessMessage(
          `Forecast for ${this.dataClone.city.name} fetched`
        );
        return value;
      }),
      pluck('list'), // pluck out the list property
      mergeMap((value) => of(...value)), // take array record and create a stream of data -observable; of single list
      filter((value, index) => index % 8 === 0), // only concerned with every 8th value
      map((value) => {
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
          windDeg: value.wind.deg,
          //map 'units' value
          units: this.units,
        };

        const date = new Date();
        let weatherIcon: string;

        /* Get suitable icon for weather */
        if (
          date.getHours() >= forecast.sunrise.getHours() &&
          date.getHours() < forecast.sunset.getHours()
        ) {
          weatherIcon = `wi wi-owm-day-${forecast.id}`;
        } else {
          weatherIcon = `wi wi-owm-night-${forecast.id}`;
        }

        forecast.icon = weatherIcon;
        // set showRandomCities to False
        this.cityPublisher.next(false);
        return forecast;
      }),
      toArray(), // converts into array - here as array (of objects )
      shareReplay(), // single network request - even if multiple subscription
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        if (err.status == 404) {
          this.cityPublisher.next(true);
          this.notificationService.showErrorMessage(err.error.message);
        }
        return throwError(() => err);
      })
    );
  }

  public getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      return window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          // this.notificationService.showSuccessMessage("Weather information fetched");
          observer.complete();
        },
        (err) => {
          // console.log("err", err);
          observer.error(err);
        }
      );
    }).pipe(
      retry(1), // retry would re-subscribe to the observable by executing it again..
      // here arrow function with observer argument with be re executed. hence you will get two console in case an error occurs
      // tap(() => {
      //     // this.notificationService.showSuccessMessage("Got your location...");
      // }
      // tap has 3 arguments- first is executed when next() is executed on observable
      // second in case error occurs
      // third when observable completes
      // used to catch error from observable but not favored over catchError
      // , (err) => {
      // }
      // ),
      catchError((err) => {
        //  #1 Handle the error
        if (err.code === 1) {
          this.notificationService.showErrorMessage('Location denied...');
          this.notificationService.showGeneralInfo(
            'Fetching weather of Seattle, WA'
          );
        }

        //  #2 Return a new observable -- which can maybe pass default coordinates in case user denied location
        // unlike tap operator second argument; it DOES return an observable and pass something to pipe operator
        return of({
          longitude: -122.332,
          latitude: 47.6061,
        });

        // throwError(err);

        /* is equivalent to 
          return new Observable((observer)=>{
              observer.error(err);
          }) */
      })
    );
  }
}
