import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, tap, shareReplay, catchError } from 'rxjs/operators';

import {
  FeedPubSub,
  PaginationConfig,
  NotificationService,
} from '@blend-api/shared';
import { ProgrammingQuote } from '../types/quotes.interface';
import { PROGRAMMING_QUOTES } from '../constants/quotes.const';

export function ProgrammingQuotesFactory(): ProgrammingQuotesService {
  return new ProgrammingQuotesService();
}

@Injectable()
export class ProgrammingQuotesService extends FeedPubSub {
  readonly #httpClient: HttpClient = inject(HttpClient);
  readonly #notificationService: NotificationService =
    inject(NotificationService);
  private readonly QUOTES = PROGRAMMING_QUOTES;

  paginationConfig = signal<PaginationConfig>({
    listLength: 0,
    noOfPages: 0,
    pageSize: 0,
  });

  fetchQuotesFeed(): Observable<ProgrammingQuote[]> {
    return this.feedSubscriber.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      catchError((err) => {
        this.showErrorMessage();
        return throwError(() => err);
      }),
      tap(this.composePaginationConfig),
      shareReplay(1),
    );
  }

  private showErrorMessage = (): void => {
    this.#notificationService.showErrorMessage(
      'Oops! Something went wrong on our end. Please try again later.',
    );
  };

  private configureParams = (page = 1): HttpParams => {
    return new HttpParams()
      .set('page', String(page))
      .set('limit', String(this.QUOTES.PAGE_SIZE));
  };

  private fetchData = (): Observable<ProgrammingQuote[]> => {
    return this.#httpClient.get<ProgrammingQuote[]>(this.QUOTES.URL);
  };

  private composePaginationConfig(): void {
    if (this.paginationConfig().listLength === 0) {
      const paginationConfig: PaginationConfig = {
        listLength: this.QUOTES.TOTAL_RECORDS,
        noOfPages: Math.ceil(this.QUOTES.TOTAL_RECORDS / this.QUOTES.PAGE_SIZE),
        pageSize: this.QUOTES.PAGE_SIZE,
      };

      this.paginationConfig.set(paginationConfig);
    }
  }
}
