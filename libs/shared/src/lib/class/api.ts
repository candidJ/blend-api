import { Observable, Subject, throwError, BehaviorSubject, EMPTY } from 'rxjs';
import {
  map,
  switchMap,
  share,
  pluck,
  tap,
  shareReplay,
  catchError,
} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

export interface FetchData<T> {
  fetch(): Observable<T[]>;
  fetchByPageNumber(page: number): void;
}

export abstract class API<T> implements FetchData<T> {

  // using behavior subject rather than subject
  private apiSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private api$: Observable<number> = this.apiSubject.asObservable();

  protected abstract mapResponse(data: T | T[] | any): any[];
  protected abstract configureParams(page: number): HttpParams;
  protected abstract fetchData(
    params: HttpParams
  ): Observable<T[]> | Observable<T>;
  protected abstract showErrorMessage(): void;
  protected abstract showSuccessMessage(): void;

  fetchByPageNumber(page: number): void {
    this.apiSubject.next(page);
  }

  fetch(): Observable<T[]> {
    return this.api$.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      catchError((err) => {
        this.showErrorMessage;
        return throwError(() => err);
      }),
      map(this.mapResponse),
      tap(this.showSuccessMessage),
      shareReplay(1)
    );
  }
}
