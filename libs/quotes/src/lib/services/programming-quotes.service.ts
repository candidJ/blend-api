import { Injectable, InjectionToken, signal } from '@angular/core';
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
  private readonly QUOTES = AppConfig.PROGRAMMING_QUOTES;

  public paginationConfig = signal<PaginationConfig>({
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

  protected showErrorMessage = () => {
    this.notificationService.showErrorMessage('Technical error occurred');
  };

  protected showSuccessMessage = () => {
    this.notificationService.showSuccessMessage('Programming quotes fetched');
  };

  protected configureParams = (page: number): HttpParams => {
    return new HttpParams()
      .set('page', String(page))
      .set('limit', String(this.QUOTES.PAGE_SIZE));
  };

  protected fetchData = (params: any): Observable<ProgrammingQuote[]> => {
    return this.httpClient.get<ProgrammingQuote[]>(
      this.QUOTES.URL
    );
  };

  protected mapResponse = (
    data: ProgrammingQuote[]
  ): ProgrammingQuote[] => {
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
    
    return data;
  };
}
