import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  FeedPubSub,
  LoaderService,
  NotificationService,
  PaginationConfig,
} from '@blend-api/shared';
import { map, switchMap, tap, catchError, timeout } from 'rxjs/operators';

import { LifeQuote, LifeQuoteResponse } from '../types/quotes.interface';
import { LIFE_QUOTES } from '../constants/quotes.const';
import { Router } from '@angular/router';

@Injectable()
export class LifeQuotesService extends FeedPubSub {
  paginationConfig = signal<PaginationConfig>({
    listLength: 0,
    noOfPages: 0,
    pageSize: 0,
  });

  readonly #httpClient: HttpClient = inject(HttpClient);
  readonly #notificationService: NotificationService =
    inject(NotificationService);
  readonly #loaderService: LoaderService = inject(LoaderService);
  readonly #router: Router = inject(Router);
  readonly #FIVE_SECONDS = 5_000;

  fetchQuotesFeed(): Observable<LifeQuote[]> {
    return this.feedSubscriber.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      timeout({
        each: this.#FIVE_SECONDS
      }),
      catchError((err) => {
        this.showErrorMessage();
        this.#loaderService.showLoader(false);
        this.#router.navigateByUrl('/hacker-news');
        return throwError(() => err);
      }),
      tap(this.composePaginationConfig),
      map(this.mapResponse),
    );
  }

  private showErrorMessage = () => {
    this.#notificationService.showErrorMessage(
      'Oops! Something went wrong on our end. Please try again later.',
    );
  };

  private configureParams = (page = 1): HttpParams => {
    return new HttpParams()
      .set('page', String(page))
      .set('limit', String(LIFE_QUOTES.LIMIT));
  };

  private fetchData = (params: HttpParams): Observable<LifeQuoteResponse> => {
    return this.#httpClient.get<LifeQuoteResponse>(LIFE_QUOTES.URL, {
      params,
    });
  };

  private composePaginationConfig = (data: LifeQuoteResponse): void => {
    const { pagination } = data;
    if (this.paginationConfig().listLength === 0) {
      this.paginationConfig.set({
        listLength: data.totalQuotes,
        noOfPages: pagination.totalPages,
        pageSize: LIFE_QUOTES.LIMIT,
      });
    }
  };

  private mapResponse(quotes: LifeQuoteResponse): LifeQuote[] {
    return quotes.data;
  }
}
