import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap, share } from 'rxjs/operators';

export interface IAPIModel<T> {
    fetch(key: string): Observable<T[]>;
    fetchByPageNumber(page: number): void;
    getNoOfPages(): Observable<number[]>;
}


export abstract class API<T> implements IAPIModel<T>{
    private apiSubject: Subject<number> = new Subject<number>();
    private api$: Observable<number> = this.apiSubject.asObservable();
    private noOfPagesSubject: Subject<number> = new Subject<number>();
    private noOfPages$: Observable<number> = this.noOfPagesSubject.asObservable();;

    protected abstract mapResponse(data: any): T[];
    protected abstract configureParams(data: any): any;
    protected abstract fetchData(params: any): Observable<T[]>;

    fetchByPageNumber(page: number): void {
        this.apiSubject.next(page);
    }

    fetch(): Observable<T[]> {
        return this.api$
            .pipe(
                map((page) => this.configureParams(page)),
                switchMap(this.fetchData),
                map(this.mapResponse),
                share()
            )
    }

    getByPageNumber(page: number){
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