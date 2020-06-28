import { ForecastStrategy } from './forecast-strategy.interface';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { AppConfig } from '../shared/constant/config';

export class ForecastByLatLong implements ForecastStrategy {
    // constructor(private coords: { latitude: number, longitude: number }) { }

    forecast(): any {
        return this.getCurrentLocation()
            // return of(this.coords)
            .pipe(
                map(coords => {
                    // console.log(coords);
                    // use to convert the coords to query params : -api.openweathermap.org/data/2.5/forecast?lat=25&long=125
                    return new HttpParams()
                        .set('lat', String(coords.latitude))
                        .set('lon', String(coords.longitude))
                        .set('units', AppConfig.WEATHER_API_CONFIG.UNITS)
                        .set('appid', AppConfig.WEATHER_API_CONFIG.API_KEY)
                }));
    }



    private getCurrentLocation() {
        return new Observable<Coordinates>((observer) => {
            return window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    observer.next(position.coords);
                    // this.notificationService.showSuccessMessage("Weather information fetched");
                    observer.complete();
                }, (err) => {
                    // console.log("err", err);
                    observer.error(err);
                });
        })
            .pipe(
                retry(1), // retry would re-subsribe to the observable by executing it again..
                // here arrow function with observer argument with be re executed. hence you will get two console in case an error occurs 
                // tap(() => {
                //     // this.notificationService.showSuccessMessage("Got your location...");
                // }
                // tap has 3 argumnet- first is execued when next() is executed on observable
                // second in case error occurs
                // third when observable completes 
                // used to catch error from observable but not favored over catchError
                // , (err) => {
                //   console.log("error", err);
                // }
                // ),
                catchError((err) => {
                    //  #1 Handle the error 
                    // this.notificationService.showErrorMessage("Location denied...");
                    //  #2 Return a new observable -- which can maybe pass default coordinates in case user denied location
                    // unlike tap operator second argument; it DOES return an observable and pass something to pipe operator

                    // this.notificationService.showGeneralInfo("Fetching weather of Muktsar, IN");

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
