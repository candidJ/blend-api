import { Injectable } from '@angular/core';
import { Subject, Observable, pipe } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AppConfig } from '../utils/config.constant';
import { map, switchMap, tap, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  private newsInput = new Subject<number>();
  private newsOutput = new Observable<any>();
  private config = AppConfig.NEWS_API_CONFIG;

  constructor(private httpClient: HttpClient) { }

  fetchNewsFeed(pagesToFetch = 1) {
    this.newsOutput = this.newsInput
      .pipe(
        map(() => {
          return new HttpParams()
            .set('apiKey', this.config.API_KEY)
            .set('pageSize', this.config.API_KEY)
            .set('country', this.config.COUNTRY)
            .set('page', pagesToFetch.toString())
        }),
        switchMap((params) => {
          console.log(params)
          return this.httpClient.get(this.config.NEWS_API_URL, { params });
        }),
        tap((response) => {
          console.log("the news feed:", response);
        }),
        share()
      )
      return this.newsOutput;
    // (pagesToFetch);
  }

}
