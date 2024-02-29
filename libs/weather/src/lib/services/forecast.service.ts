import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import {
  map,
  switchMap,
  mergeMap,
  filter,
  toArray,
  tap,
  catchError,
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
import { NotificationService } from '@blend-api/shared';
import { WEATHER_API_CONFIG } from '../constants/weather.const';

@Injectable()
export class ForecastService {
  readonly #config = WEATHER_API_CONFIG;
  #cityWeather: CityWeather;
  #cityPublisher = new BehaviorSubject<boolean>(false);
  readonly #SEATTLE_LAT_LONG: Pick<
    GeolocationCoordinates,
    'latitude' | 'longitude'
  > = {
    longitude: -122.332,
    latitude: 47.6061,
  };

  showRandomCities$ = this.#cityPublisher.asObservable();

  readonly #httpClient: HttpClient = inject(HttpClient);
  readonly #notificationService: NotificationService =
    inject(NotificationService);

  getForecast(
    forecastHttpParams: Observable<HttpParams>,
  ): Observable<WeatherDefinition[]> {
    return forecastHttpParams.pipe(
      // create a new observable with the last emitted value from previous observable and cancel the last observable
      switchMap((params) => {
        return this.#httpClient.get<WeatherResponse>(this.#config.URL, {
          params,
        });
      }),
      tap((weatherResponse: WeatherResponse) => {
        this.#cityWeather = structuredClone(weatherResponse.city);
        this.#cityPublisher.next(false);
        return weatherResponse;
      }),
      // pluck out the list property
      map((res) => res.list),
      mergeMap((weatherList: WeatherItem[]) => of(...weatherList)),
      // total records count = 40. to show weather forecast for next 5 day, take out every 8th record from the list
      filter((value: WeatherItem, index: number) => (index + 1) % 8 === 0),
      // transform each weather item to weather definition
      map((weatherItem: WeatherItem) => this.transformWeatherItem(weatherItem)),
      toArray(), // convert individual weather item to WeatherLists array
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        this.#cityPublisher.next(true);
        this.#notificationService.showErrorMessage(err.error.message);
        return throwError(() => err);
      }),
    );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      return window.navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        },
      );
    }).pipe(
      catchError((err) => {
        console.error(err.message);
        // Return a new observable that passes default coordinates when the user denies access to their current location.
        // Unlike the tap operator, which doesn't return an observable and doesn't pass anything to the pipe operator.
        return of(this.#SEATTLE_LAT_LONG);
      }),
    );
  }

  private transformWeatherItem = function (
    this: ForecastService,
    weatherItem: WeatherItem,
  ): WeatherDefinition {
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
      city: this.#cityWeather.name,
      country: this.#cityWeather.country,
      // Convert a Unix timestamp to milliseconds ( by multiplying by 1000) and construct a date object
      sunrise: new Date(this.#cityWeather.sunrise * 1000),
      sunset: new Date(this.#cityWeather.sunset * 1000),
      windSpeed: weatherItem.wind.speed,
      windDeg: weatherItem.wind.deg,
      icon: this.determineWeatherIcon(),
    };

    return forecast;
  };

  private determineWeatherIcon = function (this: ForecastService): string {
    const date = new Date();
    let weatherIcon: string;

    /* Get suitable icon for weather */
    if (
      date.getHours() >= this.#cityWeather.sunrise &&
      date.getHours() < this.#cityWeather.sunset
    ) {
      weatherIcon = `wi wi-owm-day-${this.#cityWeather.id}`;
    } else {
      weatherIcon = `wi wi-owm-night-${this.#cityWeather.id}`;
    }

    return weatherIcon;
  };

  private showForecastNotification = (): void => {
    this.#notificationService.showSuccessMessage(
      `The weather forecast for ${this.#cityWeather.name} has been successfully retrieved.`,
    );
  };
}
