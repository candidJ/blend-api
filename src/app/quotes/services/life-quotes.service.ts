import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { API } from "src/app/shared/class/api";
import { AppConfig } from "src/app/shared/constant/config";
import { NotificationService } from "src/app/shared/modules/notifications/services/notification.service";
import { PaginationConfig } from "src/app/shared/modules/paginator/types/paginator.interface";
import {
  ILifeQuotes,
  ILifeQuotesResponse,
} from "src/app/quotes/types/quotes.interface";

@Injectable()
export class LifeQuotesService extends API<ILifeQuotes> {
  // When Subject is used in instead of behavior subject in API-
  //  using subscribers - publish method for stateless components
  private dataPublisher = new Subject<ILifeQuotes[]>();
  data$ = this.dataPublisher.asObservable();

  constructor(
    private httpClient: HttpClient,
    private _notificationService: NotificationService
  ) {
    super();
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage("Technical error occured");
  };

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage("Life quotes fetched");
  };

  protected configureParams = (page: number): HttpParams => {
    // console.log(page, "page number in params");
    return new HttpParams()
      .set("page", String(page))
      .set("limit", String(AppConfig.LIFE_QUOTES.LIMIT));
  };

  protected fetchData = (params: any): Observable<ILifeQuotes[]> => {
    // console.log(params);
    return this.httpClient.get<ILifeQuotes[]>(AppConfig.LIFE_QUOTES.URL, {
      params,
    });
  };

  protected mapResponse = (data: ILifeQuotesResponse): ILifeQuotes[] => {
    console.log(data, "life quote mapped data");
    // pluck('quotes'),
    const paginationConfig: PaginationConfig = {
      listLength: data.pagination.totalPages * AppConfig.LIFE_QUOTES.LIMIT,
      noOfPages: Math.ceil(
        data.pagination.totalPages / AppConfig.LIFE_QUOTES.LIMIT
      ),
      pageSize: AppConfig.LIFE_QUOTES.LIMIT,
    };
    this.broadcastPaginationConfig(paginationConfig);
    // this.dataPublisher.next(data['quotes']);
    return data.data;
  };
}
