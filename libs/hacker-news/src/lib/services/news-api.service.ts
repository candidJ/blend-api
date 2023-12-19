import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { INewsArticles, INewsFeed } from '../types';
import { FeedPubSub, AppConfig } from '@blend-api/shared';
import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';
import {
  map,
  switchMap,
  tap,
  shareReplay,
  catchError,
} from 'rxjs/operators';

@Injectable()
export class NewsApiService extends FeedPubSub {
  private readonly config = AppConfig.NEWS_API_CONFIG;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
    super();
  }

  fetchNewsArticles(): Observable<INewsArticles[]> {
    return this.feedSubscriber.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      catchError((err) => {
        this.showErrorMessage();
        return throwError(err);
      }),
      map(this.mapResponse),
      tap(this.showSuccessMessage),
      shareReplay(1)
    );
  }

  private showErrorMessage = () => {
    this.notificationService.showErrorMessage('Technical error occurred');
  };

  private showSuccessMessage = () => {
    this.notificationService.showSuccessMessage('Top news headlines fetched');
  };

  private configureParams = (page: number = 1): HttpParams => {
    return new HttpParams()
      .set('apiKey', this.config.API_KEY)
      .set('pageSize', String(this.config.PAGE_SIZE))
      .set('country', this.config.COUNTRY)
      .set('page', page.toString());
  };

  private fetchData = (params: HttpParams): Observable<INewsFeed> => {
    return this.httpClient.get<INewsFeed>(this.config.NEWS_API_URL, { params });
  };

  private mapResponse = (data: INewsFeed): INewsArticles[] => {
    return data.articles;
  };
}
