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
    private noOfPagesSubject: Subject<PaginationConfig> = new Subject<PaginationConfig>();
    private noOfPages$: Observable<PaginationConfig> = this.noOfPagesSubject.asObservable();

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

    getByPageNumber(paginatorConfig: PaginationConfig) {
        return this.noOfPagesSubject.next(paginatorConfig);
    }

    getNoOfPages(): Observable<PaginationConfig> {
        return this.noOfPages$;
        // return this.noOfPages$
        //     .pipe(
        //         map((response) => {
        //             const numbers: number[] = [];
        //             for (let i = 1; i <= response; i++) {
        //                 numbers.push(i);
        //             }
        //             // console.log(numbers, "API get of of pages");
        //             return numbers;
        //         },
        //             shareReplay()
        //         )
        //     );
    }
}