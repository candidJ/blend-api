import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API, AppConfig } from '@blend-api/shared';

import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';
import { LifeQuote, ILifeQuotesResponse } from '../types/quotes.interface';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';

@Injectable()
export class LifeQuotesService extends API<LifeQuote> {
  // When Subject is used in instead of behavior subject in API-
  //  using subscribers - publish method for stateless components
  private dataPublisher = new Subject<LifeQuote[]>();
  data$ = this.dataPublisher.asObservable();

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
    this._notificationService.showSuccessMessage('Life quotes fetched');
  };

  protected configureParams = (page: number): HttpParams => {
    return new HttpParams()
      .set('page', String(page))
      .set('limit', String(AppConfig.LIFE_QUOTES.LIMIT));
  };

  protected fetchData = (params: any): Observable<LifeQuote[]> => {
    return this.httpClient.get<LifeQuote[]>(AppConfig.LIFE_QUOTES.URL, {
      params,
    });
  };

  // TODO: side effect + data return = anti pattern
  protected mapResponse = (data: ILifeQuotesResponse): LifeQuote[] => {
    const {pagination} = data;
    const paginationConfig: PaginationConfig = {
      listLength: data.totalQuotes,
      noOfPages: pagination.totalPages,
      pageSize: AppConfig.LIFE_QUOTES.LIMIT,
    };
    this.broadcastPaginationConfig(paginationConfig);
    return data.data;
  };
}
