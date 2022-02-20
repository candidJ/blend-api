import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { INewsFeed } from '../types';
import { API, AppConfig } from '@blend-api/shared';
import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';

@Injectable()
export class NewsApiService extends API<INewsFeed> {
  private readonly config = AppConfig.NEWS_API_CONFIG;

  constructor(
    private httpClient: HttpClient,
    private _notificationService: NotificationService
  ) {
    super();
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage('Technical error occurred');
  };

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage('Top news headlines fetched');
  };

  protected configureParams = (page: number): HttpParams => {
    return new HttpParams()
      .set('apiKey', this.config.API_KEY)
      .set('pageSize', String(this.config.PAGE_SIZE))
      .set('country', this.config.COUNTRY)
      .set('page', page.toString());
  };

  protected fetchData = (params: HttpParams): Observable<INewsFeed> => {
    return this.httpClient.get<INewsFeed>(this.config.NEWS_API_URL, { params });
  };

  protected mapResponse = (data: INewsFeed) => {
    const totalResults = data.totalResults;
    const page = Math.ceil(totalResults / this.config.PAGE_SIZE);
    // this.broadcastPaginationConfig(page);
    return data.articles;
  };
}
