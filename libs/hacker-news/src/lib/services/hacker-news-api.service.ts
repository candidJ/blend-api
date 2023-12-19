import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RouterState, Router } from '@angular/router';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { FeedPubSub, AppConfig } from '@blend-api/shared';
import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';
import { HackerNewsFeed, HackerNewsFeedDetails } from '../types';

type ConfigType = 'jobs' | 'feed' | 'show' | 'ask' | 'latest';

interface ConfigProps {
  URL: string;
  TOTAL_RECORDS: number;
  PAGE_SIZE: number;
  NO_OF_PAGES: number;
}

@Injectable()
export class HackerNewsApiService extends FeedPubSub {
  private readonly config = AppConfig.HACKER_NEWS;
  private readonly baseUrl = AppConfig.HACKER_NEWS_BASE_URL;

  paginationConfig = signal<PaginationConfig>({
    listLength: 0,
    noOfPages: 0,
    pageSize: 0
  });

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private router: Router) {
    super();
  }


  loadItemDetails(itemId: number): Observable<HackerNewsFeedDetails> {
    return this.httpClient
      .get<HackerNewsFeedDetails>(`${this.baseUrl}item/${itemId}`)
      .pipe(catchError((err) => throwError(err)));
  }

  fetchNewsFeed(): Observable<HackerNewsFeed[]> {
    return this.feedSubscriber.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      catchError((err) => {
        this.showErrorMessage();
        return throwError(err);
      }),
      tap(this.composePaginationConfig, this.showSuccessMessage),
      shareReplay(1)
    );
  }

  private showErrorMessage = () => {
    this.notificationService.showErrorMessage('Technical error occurred');
  };

  private showSuccessMessage = () => {
    this.notificationService.showSuccessMessage('Latest Feed fetched');
  };

  private configureParams = (page = 1): HttpParams => {
    return new HttpParams().set('page', page.toString());
  };

  private fetchData = (params: HttpParams): Observable<HackerNewsFeed[]> => {
    const url = this.composeRequestUrl();
    return this.httpClient.get<HackerNewsFeed[]>(url, { params });
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
    if(this.paginationConfig && this.paginationConfig().listLength == 0){
      const feedType: ConfigType = this.determineActiveUrl();
      const configType: ConfigProps = this.config[feedType];
      const feedPaginationConfig: PaginationConfig = {
        listLength: configType.TOTAL_RECORDS,
        noOfPages: configType.NO_OF_PAGES,
        pageSize: configType.PAGE_SIZE
      };
      // set the signal to pagination from FeedPubSub
      this.paginationConfig.set(feedPaginationConfig);
    }
  }

}
