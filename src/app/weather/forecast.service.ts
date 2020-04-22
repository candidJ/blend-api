import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter, toArray, share, tap, catchError, retry } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NotificationService } from '../notifications/notification.service';

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
  constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

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
          console.log("get current locations");
          observer.complete();
        }, (err) => {
          observer.error(err)
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
          this.notificationService.showErrorMessage("Some error occured...");
          //  #2 Return a new observable -- which can maybe pass default coordinates in case user denied location
          // unlike tap operator second argument; it DOES return an observable and pass something to pipe operator
          return throwError(err);
          /* is equivalent to 
          return new Observable((observer)=>{
              observer.error(err);
          }) */
        })
      )
  }
}
