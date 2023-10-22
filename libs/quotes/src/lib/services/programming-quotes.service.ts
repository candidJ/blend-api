import { Injectable, InjectionToken } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from 'libs/shared/src/lib/modules/notifications/services/notification.service';
import { ProgrammingQuote } from '../types/quotes.interface';
import { API, AppConfig } from '@blend-api/shared';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';

export function ProgrammingQuotesFactory(
  http: HttpClient,
  _notificationService: NotificationService
): ProgrammingQuotesService {
  return new ProgrammingQuotesService(http, _notificationService);
}

export const QUOTES_SERVICE_TOKEN =
  new InjectionToken<ProgrammingQuotesService>('QUOTES_SERVICE_TOKEN');

@Injectable()
export class ProgrammingQuotesService extends API<ProgrammingQuote> {
  private httpClient: HttpClient;
  private dataPublisher = new BehaviorSubject<ProgrammingQuote[]>([]);
  data$ = this.dataPublisher.asObservable();

  constructor(
    httpClient: HttpClient,
    private _notificationService: NotificationService
  ) {
    super();
    this.httpClient = httpClient;
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage('Technical error occurred');
  };

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage('Programming quotes fetched');
  };

  protected configureParams = (page: number): HttpParams => {
    return new HttpParams()
      .set('page', String(page))
      .set('limit', String(AppConfig.PROGRAMMING_QUOTES.PAGE_SIZE));
  };

  protected fetchData = (params: any): Observable<ProgrammingQuote[]> => {
    return this.httpClient.get<ProgrammingQuote[]>(
      AppConfig.PROGRAMMING_QUOTES.URL
    );
  };

  protected mapResponse = (
    data: ProgrammingQuote[]
  ): ProgrammingQuote[] => {
    // As api doesn't return the totalQuotes, hard coded to actual quotes in api by calculation = 25 pages *20 quotes + 1 page *1 quote;
    //  TOTAL PAGE SIZE IS 501;
    const paginationConfig: PaginationConfig = {
      listLength: AppConfig.PROGRAMMING_QUOTES.TOTAL_RECORDS,
      noOfPages: Math.ceil(
        AppConfig.PROGRAMMING_QUOTES.TOTAL_RECORDS /
          AppConfig.PROGRAMMING_QUOTES.PAGE_SIZE
      ),
      pageSize: AppConfig.PROGRAMMING_QUOTES.PAGE_SIZE,
    };
    // TODO: commented pagination since API is down
    this.broadcastPaginationConfig(paginationConfig);
    this.dataPublisher.next(data);
    return data;
  };
}
