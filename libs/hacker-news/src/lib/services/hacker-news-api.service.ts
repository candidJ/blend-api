import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  FeedPubSub,
  PaginationConfig,
  NotificationService,
} from '@blend-api/shared';
import {
  ConfigType,
  HackerNewsItem,
  HackerNewsItemWithComments,
} from '../types';
import {
  HACKER_NEWS_API_URL,
  HACKER_NEWS_CONFIG,
} from '../constants/hacker-news.const';

@Injectable()
export class HackerNewsApiService extends FeedPubSub {
  paginationConfig = signal<PaginationConfig>({
    pageSize: 0,
    noOfPages: 0,
    listLength: 0,
  });

  readonly #httpClient: HttpClient = inject(HttpClient);
  readonly #notificationService: NotificationService =
    inject(NotificationService);
  readonly #config = HACKER_NEWS_CONFIG;
  readonly #baseUrl = HACKER_NEWS_API_URL;
  #activeUrl: ConfigType;

  loadItemDetails(itemId: number): Observable<HackerNewsItemWithComments> {
    return this.#httpClient
      .get<HackerNewsItemWithComments>(`${this.#baseUrl}item/${itemId}`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  fetchNewsFeed(activeUrl: ConfigType): Observable<HackerNewsItem[]> {
    this.#activeUrl = activeUrl;
    return this.feedSubscriber.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      catchError((err) => {
        this.showErrorMessage();
        return throwError(() => err);
      }),
    );
  }

  private showErrorMessage = () => {
    this.#notificationService.showErrorMessage(
      'Unable to fetch the Hacker News',
    );
  };

  private configureParams = (page = 1): HttpParams => {
    return new HttpParams().set('page', page.toString());
  };

  private fetchData = (params: HttpParams): Observable<HackerNewsItem[]> => {
    const url = this.#baseUrl + this.#config[this.#activeUrl].URL;
    return this.#httpClient.get<HackerNewsItem[]>(url, { params });
  };
}
