import { Injectable } from '@angular/core';
import { Subject, Observable, pipe, of } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AppConfig } from '../utils/config.constant';
import { map, switchMap, tap, share, pluck, scan } from 'rxjs/operators';
import { INewsFeed, INewsArticles } from '../utils/interface';

@Injectable()
export class NewsApiService {

  private newsInput = new Subject<number>();
  private newsOutput$ = this.newsInput.asObservable();
  private noOfPagesInput = new Subject<number>();
  private noOfPages$ = this.noOfPagesInput.asObservable();
  private readonly config = AppConfig.NEWS_API_CONFIG;

  constructor(private httpClient: HttpClient) { }
  // : Observable<INewsArticles[]>
  fetchNewsFeed() {
    return this.newsOutput$
      .pipe(
        map((pagesToFetch) => {
          return new HttpParams()
            .set('apiKey', this.config.API_KEY)
            .set('pageSize', String(this.config.PAGE_SIZE))
            .set('country', this.config.COUNTRY)
            .set('page', pagesToFetch.toString())
        }),
        switchMap((params) => {
          // console.log(params, "news api params")
          return this.httpClient.get<INewsFeed>(this.config.NEWS_API_URL, { params });
        }),
        tap((response) => {
          console.log("the news feed:", response);
          const totalResults = response.totalResults;
          const noOfPagesPaginator = Math.ceil(totalResults / this.config.PAGE_SIZE);
          this.noOfPagesInput.next(noOfPagesPaginator);
        }),
        pluck('articles'),
        share()
      );
  }

  getNewsByPage(pageNumber: number): void {
    this.newsInput.next(pageNumber);
  }

  getNoOfPages(): Observable<number[]> {
    return this.noOfPages$
      .pipe(
        map((response) => {
          const numbers: number[] = [];
          for (let i = 1; i <= response; i++) {
            numbers.push(i);
          }
          console.log(numbers, "get of of pages");
          return numbers;
        }
        )
      )
  }

}
