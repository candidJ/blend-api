import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { FeedPubSub, AppConfig } from '@blend-api/shared';
import {
  map,
  switchMap,
  tap,
  shareReplay,
  catchError,
} from 'rxjs/operators';

import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';
import { LifeQuote, ILifeQuotesResponse } from '../types/quotes.interface';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';

@Injectable()
export class LifeQuotesService extends FeedPubSub {
  
  paginationConfig = signal<PaginationConfig>({
    listLength: 0,
    noOfPages: 0,
    pageSize: 0
  });

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
    super();
  }

  public fetchQuotesFeed(): Observable<LifeQuote[]> {
    return this.feedSubscriber.pipe(
      map(this.configureParams),
      switchMap(this.fetchData),
      catchError((err) => {
        this.showErrorMessage();
        return throwError(err);
      }),
      tap(this.composePaginationConfig, this.showSuccessMessage),
      map(this.mapResponse),
      shareReplay(1)
    );
  }

  private showErrorMessage = () => {
    this.notificationService.showErrorMessage('Technical error occurred');
  };

  private showSuccessMessage = () => {
    this.notificationService.showSuccessMessage('Life quotes fetched');
  };

  private configureParams = (page: number = 1): HttpParams => {
    return new HttpParams()
      .set('page', String(page))
      .set('limit', String(AppConfig.LIFE_QUOTES.LIMIT));
  };

  private fetchData = (params: HttpParams): Observable<ILifeQuotesResponse> => {
    return this.httpClient.get<ILifeQuotesResponse>(AppConfig.LIFE_QUOTES.URL, {
      params,
    });
  };

  private composePaginationConfig = (data: ILifeQuotesResponse): void => {
    const {pagination} = data;
    if(this.paginationConfig().listLength === 0){
        this.paginationConfig.set({
          listLength: data.totalQuotes,
          noOfPages: pagination.totalPages,
          pageSize: AppConfig.LIFE_QUOTES.LIMIT,
        });
    }
  };

  private mapResponse(quotes: ILifeQuotesResponse): LifeQuote[] {
      return quotes.data;
  }
}
