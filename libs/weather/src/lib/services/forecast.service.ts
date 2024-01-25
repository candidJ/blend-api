import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
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
  CityWeather,
  WeatherResponse,
  WeatherDefinition,
  WeatherItem,
} from '../types/weather.interface';
import { AppConfig, NotificationService } from '@blend-api/shared';

@Injectable()
export class ForecastService {
  private readonly config = AppConfig.WEATHER_API_CONFIG;
  private cityWeather: CityWeather;
  private cityPublisher = new Subject<boolean>();
  private units = '';
  private readonly SEATTLE_LAT_LONG : Pick<GeolocationCoordinates, 'latitude' | 'longitude'> = {
    longitude: -122.332,
    latitude: 47.6061,
  };

  showRandomCities$ = this.cityPublisher.asObservable();

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
    this.cityPublisher.next(false);
  }

  getForecast(
    forecastHttpParams: Observable<HttpParams>
  ): Observable<WeatherDefinition[]> {
    return forecastHttpParams.pipe(
      // create a new observable with the last emitted value from previous observable and cancel the last observable
      switchMap((params) => {
        this.units = params.get('units') || 'metric';
        return this.httpClient.get<WeatherResponse>(this.config.URL, {
          params,
        });
      }),
      tap((weatherResponse : WeatherResponse) => {
        this.cityWeather = Object.assign({}, weatherResponse.city);
        return weatherResponse;
      }),
      // pluck out the list property
      pluck('list'),
      mergeMap((weatherList: WeatherItem[]) => of(...weatherList)),
      // total records count = 40. to show weather forecast for next 5 day, take out every 8th record from the list
      filter((value : WeatherItem, index: number) => (index + 1) % 8 === 0),
      // transform each weather item to weather definition
      map((weatherItem: WeatherItem) => this.transformWeatherItem(weatherItem)),
      toArray(), // convert individual weather item to an Array of WeatherLists
      shareReplay(), // single network request - even if multiple subscription
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.cityPublisher.next(true);
        this.notificationService.showErrorMessage(err.error.message);
        return throwError(err);
      })
    );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      return window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          // this.notificationService.showSuccessMessage("Weather information fetched");
          observer.complete();
        },
        (err) => {
          console.error("err", err);
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
        return of(this.SEATTLE_LAT_LONG);

        // throwError(err);

        /* is equivalent to 
          return new Observable((observer)=>{
              observer.error(err);
          }) */
      })
    );
  }

  private transformWeatherItem = (weatherItem : WeatherItem): WeatherDefinition => {
    let forecast: WeatherDefinition = {
      currentTemp: weatherItem.main.temp,
      feelsLike: weatherItem.main.feels_like,
      minTemp: weatherItem.main.temp_min,
      maxTemp: weatherItem.main.temp_max,
      humidity: weatherItem.main.humidity,
      title: weatherItem.weather[0].main,
      description: weatherItem.weather[0].description,
      id: weatherItem.weather[0].id,
      date: weatherItem.dt_txt,
      city: this.cityWeather.name,
      country: this.cityWeather.country,
      //Convert a Unix timestamp to time
      sunrise: new Date(this.cityWeather.sunrise * 1000),
      sunset: new Date(this.cityWeather.sunset * 1000),
      windSpeed: weatherItem.wind.speed,
      windDeg: weatherItem.wind.deg,
      units: this.units,
    };

    forecast.icon = this.determineWeatherIcon(forecast);

    // set showRandomCities to False
    this.cityPublisher.next(false);
    this.notificationService.showSuccessMessage(
      `Forecast for ${forecast.city} fetched`
    );

    return forecast;
  }


  private determineWeatherIcon = (forecast: WeatherDefinition) : string =>{
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

    return weatherIcon;
  }

}
