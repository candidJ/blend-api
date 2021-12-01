import { Injectable, InjectionToken } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";

import { API } from "src/app/shared/class/api";
import { NotificationService } from "src/app/shared/modules/notifications/services/notification.service";
import { IProgrammingQuotes } from "src/app/quotes/types/quotes.interface";
import { PaginationConfig } from "src/app/shared/modules/paginator/types/paginator.interface";
import { AppConfig } from "src/app/shared/constant/config";

export function ProgrammingQuotesFactory(
  http: HttpClient,
  _notificationService: NotificationService
): ProgrammingQuotesService {
  return new ProgrammingQuotesService(http, _notificationService);
}

export const QUOTES_SERVICE_TOKEN =
  new InjectionToken<ProgrammingQuotesService>("QUOTES_SERVICE_TOKEN");

@Injectable()
export class ProgrammingQuotesService extends API<IProgrammingQuotes> {
  private httpClient: HttpClient;
  private dataPublisher = new BehaviorSubject<IProgrammingQuotes[]>([]);
  data$ = this.dataPublisher.asObservable();

  constructor(
    httpClient: HttpClient,
    private _notificationService: NotificationService
  ) {
    super();
    this.httpClient = httpClient;
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage("Technical error occured");
  };

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage("Programming quotes fetched");
  };

  protected configureParams = (page: number): HttpParams => {
    console.log(page, "page number in params");
    return;

    return new HttpParams().set("page", String(page));
  };

  protected fetchData = (params: any): Observable<IProgrammingQuotes[]> => {
    // console.log(params);
    return this.httpClient.get<IProgrammingQuotes[]>(
      AppConfig.PROGAMMING_QUOTES.URL
    );
  };

  protected mapResponse = (
    data: IProgrammingQuotes[]
  ): IProgrammingQuotes[] => {
    console.log(data, "programming quotes data");
    // As api doesn't return the totalQuotes, hard coded to actual quotes in api by calculation = 25 pages *20 quotes + 1 page *1 quote;
    //  TOTAL PAGE SIZE IS 501;
    const paginationConfig: PaginationConfig = {
      listLength: AppConfig.PROGAMMING_QUOTES.TOTAL_RECORDS,
      noOfPages: Math.ceil(
        AppConfig.PROGAMMING_QUOTES.TOTAL_RECORDS /
          AppConfig.PROGAMMING_QUOTES.PAGE_SIZE
      ),
      pageSize: AppConfig.PROGAMMING_QUOTES.PAGE_SIZE,
    };
    // TODO: commented pagination since API is down
    // this.broadcastPaginationConfig(paginationConfig);
    // this.dataPublisher.next(data);
    return data;
  };
}
