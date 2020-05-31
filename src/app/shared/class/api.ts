import { Observable, Subject } from 'rxjs';
import { map, switchMap, share, pluck, tap, shareReplay } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

export interface IAPIModel<T> {
    fetch(key: string): Observable<T[]>;
    fetchByPageNumber(page: number): void;
    getNoOfPages(): Observable<number[]>;
}


export abstract class API<T> implements IAPIModel<T>{
    private apiSubject: Subject<number> = new Subject<number>();
    private api$: Observable<number> = this.apiSubject.asObservable();
    private noOfPagesSubject: Subject<number> = new Subject<number>();
    private noOfPages$: Observable<number> = this.noOfPagesSubject.asObservable();

    protected abstract mapResponse(data: T | T[]): any[];
    protected abstract configureParams(page: number): HttpParams;
    protected abstract fetchData(params: HttpParams): Observable<T[]> | Observable<T>;

    fetchByPageNumber(page: number): void {
        this.apiSubject.next(page);
    }

    fetch(): Observable<any[]> {
        return this.api$
            .pipe(
                map((page: number) => this.configureParams(page)),
                switchMap((params: HttpParams) => this.fetchData(params)),
                map(this.mapResponse),
                share()
            );
    }

    getByPageNumber(page: number) {
        return this.noOfPagesSubject.next(page);
    }

    getNoOfPages(): Observable<number[]> {
        return this.noOfPages$
            .pipe(
                map((response) => {
                    const numbers: number[] = [];
                    for (let i = 1; i <= response; i++) {
                        numbers.push(i);
                    }
                    console.log(numbers, "API get of of pages");
                    return numbers;
                }
                )
            )
    }
}