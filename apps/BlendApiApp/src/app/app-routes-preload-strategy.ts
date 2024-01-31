import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class RoutePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route && route.data && route.data.hasOwnProperty('preload')) {
      return fn();
    } else {
      return of(null);
    }
  }
}
