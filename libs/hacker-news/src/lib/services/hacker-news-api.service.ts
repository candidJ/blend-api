import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import {
  FeedPubSub,
  PaginationConfig,
  NotificationService,
} from '@blend-api/shared';
import {
  ConfigProps,
  ConfigType,
  HackerNewsItem,
  HackerNewsItemWithComments,
} from '../types';
import { HACKER_NEWS_API_URL, HACKER_NEWS_CONFIG } from '../constants/metadata.const';

@Injectable()
export class HackerNewsApiService extends FeedPubSub {
  paginationConfig = signal<PaginationConfig>({
    pageSize: 0,
    noOfPages: 0,
    listLength: 0,
  });

  readonly #config = HACKER_NEWS_CONFIG;
  readonly #baseUrl = HACKER_NEWS_API_URL;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private router: Router,
  ) {
    super();
  }

  loadItemDetails(itemId: number): Observable<HackerNewsItemWithComments> {
    return this.httpClient
      .get<HackerNewsItemWithComments>(`${this.#baseUrl}item/${itemId}`)
      .pipe(catchError((err) => throwError(err)));
  }

  fetchNewsFeed(): Observable<HackerNewsItem[]> {
    return this.feedSubscriber.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      catchError((err) => {
        this.showErrorMessage();
        return throwError(err);
      }),
      tap(this.composePaginationConfig),
      shareReplay(1),
    );
  }

  private showErrorMessage = () => {
    this.notificationService.showErrorMessage(
      'Unable to fetch the Hacker News',
    );
  };

  private configureParams = (page = 1): HttpParams => {
    return new HttpParams().set('page', page.toString());
  };

  private fetchData = (params: HttpParams): Observable<HackerNewsItem[]> => {
    const url = this.composeRequestUrl();
    return this.httpClient.get<HackerNewsItem[]>(url, { params });
  };

  private composeRequestUrl(): string {
    const feedType: ConfigType = this.determineActiveUrl();
    return this.#baseUrl + this.#config[feedType].URL;
  }

  private determineActiveUrl(): ConfigType {
    let path: string | undefined = this.router.url.split('/').pop();
    if (this.isConfigPath(path)) {
      return path;
    } else {
      return 'feed';
    }
  }

  private isConfigPath(path: string | undefined): path is ConfigType {
    return (
      path === 'jobs' ||
      path === 'feed' ||
      path === 'show' ||
      path === 'ask' ||
      path === 'latest'
    );
  }

  private composePaginationConfig = (): void => {
    const feedType: ConfigType = this.determineActiveUrl();
    const configType: ConfigProps = this.#config[feedType];
    const feedPaginationConfig: PaginationConfig = {
      listLength: configType.TOTAL_RECORDS,
      noOfPages: configType.NO_OF_PAGES,
      pageSize: configType.PAGE_SIZE,
    };
    // set the signal to pagination from FeedPubSub
    this.paginationConfig.set(feedPaginationConfig);
  };
}
