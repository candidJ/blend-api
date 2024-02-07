import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  FeedPubSub,
  AppConfig,
  NotificationService,
  PaginationConfig,
} from '@blend-api/shared';
import { map, switchMap, tap, shareReplay, catchError } from 'rxjs/operators';

import { LifeQuote, LifeQuoteResponse } from '../types/quotes.interface';

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

  fetchQuotesFeed(): Observable<LifeQuote[]> {
    return this.feedSubscriber.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      catchError((err) => {
        this.showErrorMessage();
        return throwError(err);
      }),
      tap(this.composePaginationConfig),
      map(this.mapResponse),
      shareReplay(1),
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
      .set('limit', String(AppConfig.LIFE_QUOTES.LIMIT));
  };

  private fetchData = (params: HttpParams): Observable<LifeQuoteResponse> => {
    return this.#httpClient.get<LifeQuoteResponse>(AppConfig.LIFE_QUOTES.URL, {
      params,
    });
  };

  private composePaginationConfig = (data: LifeQuoteResponse): void => {
    const { pagination } = data;
    if (this.paginationConfig().listLength === 0) {
      this.paginationConfig.set({
        listLength: data.totalQuotes,
        noOfPages: pagination.totalPages,
        pageSize: AppConfig.LIFE_QUOTES.LIMIT,
      });
    }
  };

  private mapResponse(quotes: LifeQuoteResponse): LifeQuote[] {
    return quotes.data;
  }
}
