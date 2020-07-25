import { Observable, Subject, throwError, BehaviorSubject } from 'rxjs';
import { map, switchMap, share, pluck, tap, shareReplay, catchError } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { PaginationConfig } from '../interface/interface';

export interface IAPIModel<T> {
    fetch(): Observable<T[]>;
    fetchByPageNumber(page: number): void;
    getNoOfPages(): Observable<PaginationConfig>;
}


export abstract class API<T> implements IAPIModel<T>{
    // using behavior subject rather than subject
    private apiSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    private api$: Observable<number> = this.apiSubject.asObservable();
    private paginationConfigPublisher: Subject<PaginationConfig> = new Subject<PaginationConfig>();
    private paginationConfig$: Observable<PaginationConfig> = this.paginationConfigPublisher.asObservable();

    protected abstract mapResponse(data: T | T[]): any[];
    protected abstract configureParams(page: number): HttpParams;
    protected abstract fetchData(params: HttpParams): Observable<T[]> | Observable<T>;
    protected abstract showErrorMessage(): void;
    protected abstract showSuccessMessage(): void;

    fetchByPageNumber(page: number): void {
        this.apiSubject.next(page);
    }

    fetch(): Observable<T[]> {
        return this.api$
            .pipe(
                map(this.configureParams),
                switchMap(this.fetchData),
                map(this.mapResponse),
                tap(this.showSuccessMessage),
                shareReplay(),
                catchError(err => {
                    this.showErrorMessage;
                    return throwError(err);
                })
            );
    }

    broadcastPaginationConfig(paginatorConfig: PaginationConfig) {
        this.paginationConfigPublisher.next(paginatorConfig);
    }

    getNoOfPages(): Observable<PaginationConfig> {
        return this.paginationConfig$;
    }
}