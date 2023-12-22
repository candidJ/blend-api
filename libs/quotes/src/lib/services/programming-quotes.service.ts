import { Injectable, InjectionToken, signal } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  map,
  switchMap,
  tap,
  shareReplay,
  catchError,
} from 'rxjs/operators';

import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';
import { ProgrammingQuote } from '../types/quotes.interface';
import { FeedPubSub, AppConfig } from '@blend-api/shared';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';

export function ProgrammingQuotesFactory(
  http: HttpClient,
  notificationService: NotificationService
): ProgrammingQuotesService {
  return new ProgrammingQuotesService(http, notificationService);
}

export const QUOTES_SERVICE_TOKEN =
  new InjectionToken<ProgrammingQuotesService>('QUOTES_SERVICE_TOKEN');

@Injectable()
export class ProgrammingQuotesService extends FeedPubSub {
  private httpClient: HttpClient;
  private readonly QUOTES = AppConfig.PROGRAMMING_QUOTES;

  paginationConfig = signal<PaginationConfig>({
    listLength: 0,
    noOfPages: 0,
    pageSize: 0
  });

  constructor(
    httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
    super();
    this.httpClient = httpClient;
  }

  fetchQuotesFeed(): Observable<ProgrammingQuote[]> {
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

  private showErrorMessage = () : void => {
    this.notificationService.showErrorMessage('Technical error occurred');
  };

  private showSuccessMessage = () : void => {
    this.notificationService.showSuccessMessage('Programming quotes fetched');
  };

  private configureParams = (page = 1): HttpParams => {
    return new HttpParams()
      .set('page', String(page))
      .set('limit', String(this.QUOTES.PAGE_SIZE));
  };

  private fetchData = (): Observable<ProgrammingQuote[]> => {
    return this.httpClient.get<ProgrammingQuote[]>(
      this.QUOTES.URL
    );
  };

  private composePaginationConfig(): void {
    if(this.paginationConfig().listLength === 0) {
      const paginationConfig: PaginationConfig = {
        listLength: this.QUOTES.TOTAL_RECORDS,
        noOfPages: Math.ceil(
          this.QUOTES.TOTAL_RECORDS /
            this.QUOTES.PAGE_SIZE
        ),
        pageSize: this.QUOTES.PAGE_SIZE,
      };

      this.paginationConfig.set(paginationConfig);
    }
  };

}
