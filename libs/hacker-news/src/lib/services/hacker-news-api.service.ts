import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RouterState, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { API, AppConfig } from '@blend-api/shared';
import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';
import { HackerNewsFeedDetails } from '../types';

type ConfigType = 'jobs' | 'feed' | 'show' | 'ask' | 'latest';

interface ConfigProps {
  URL: string;
  TOTAL_RECORDS: number;
  PAGE_SIZE: number;
  NO_OF_PAGES: number;
}

@Injectable()
export class HackerNewsApiService<T> extends API<T> {
  private readonly config = AppConfig.HACKER_NEWS;
  private readonly baseUrl = AppConfig.HACKER_NEWS_BASE_URL;

  constructor(
    private httpClient: HttpClient,
    private _notificationService: NotificationService,
    private router: Router) {
    super();
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage('Technical error occurred');
  };

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage('Latest Feed fetched');
  };

  protected configureParams = (page: number): HttpParams => {
    return new HttpParams().set('page', page.toString());
  };

  protected fetchData = (params: HttpParams): Observable<T> => {
    const url = this.composeRequestUrl();
    return this.httpClient.get<T>(url, { params });
  };

  protected mapResponse = (data: T[]) => {
    this.composePaginationConfig();
    return data;
  };

  private composeRequestUrl(): string {
    const feedType: ConfigType = this.determineActiveUrl();
    return this.baseUrl + this.config[feedType].URL;
  }

  private determineActiveUrl(): ConfigType {
    const activeUrl = this.router.url.split('/').pop()! as ConfigType; // example: ['', 'hacker-news', 'jobs']
    return activeUrl;
  }

  private composePaginationConfig(): void {
    const feedType: ConfigType = this.determineActiveUrl();
    const configType: ConfigProps = this.config[feedType];
    const feedPaginationConfig: PaginationConfig = {
      listLength: configType.TOTAL_RECORDS,
      noOfPages: configType.NO_OF_PAGES,
      pageSize: configType.PAGE_SIZE
    };

    this.broadcastPaginationConfig(feedPaginationConfig);
  }

  // fetch item details
  public loadItemDetails(itemId: number): Observable<HackerNewsFeedDetails> {
    return this.httpClient
      .get<HackerNewsFeedDetails>(`${this.baseUrl}item/${itemId}`)
      .pipe(catchError((err) => throwError(err)));
  }
}
