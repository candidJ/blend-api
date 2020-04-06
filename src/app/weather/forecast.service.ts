import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter, toArray, share } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

export interface IOpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number
    }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private url = "https://api.openweathermap.org/data/2.5/forecast";
  constructor(private httpClient: HttpClient) { }

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          // use to convert the coords to query params : -api.openweathermap.org/data/2.5/forecast?lat=25&long=125
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'imperial')
            .set('appid', "eff556784983bcac5c6d749bad8e1090")
        }),
        // create a new observable with the last emitted value from previous operator
        switchMap(params => {
          console.log(params);
          return this.httpClient.get<IOpenWeatherResponse>(this.url, { params });
        }
        ),
        pluck('list'), // pluck out the list property
        mergeMap(value => of(...value)), // take array record and create a stream of data -observable; of single list
        filter((value, index) => index % 8 === 0), // only concerned with every 8th value 
        map(value => { return { temp: value.main.temp, date: value.dt_txt } }),
        toArray(), // converts into array - here as array (of objects )
        share() // single network request - even if multiple subscription
      )
  }

  getCurrentLocation() {
    return new Observable<Coordinates>((observer) => {
      return window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords)
          observer.complete();
        }, err => observer.error(err))
    });
  }
}
