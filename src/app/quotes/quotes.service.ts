import { Injectable, InjectionToken } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ILifeQuotes, IProgrammingQuotes } from '../shared/interface/interface';
import { AppConfig } from '../shared/constant/config';
import { API } from '../shared/class/api';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class LifeQuotesService extends API<ILifeQuotes> {
  private dataPublisher = new Subject<ILifeQuotes[]>();
  data$ = this.dataPublisher.asObservable();

  constructor(private httpClient: HttpClient, private _notificationService: NotificationService) {
    super();
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage("Technical error occured");
  }

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage("Life quotes are fetched");
  }

  protected configureParams(page: number): HttpParams {
    // console.log(page, "page number in params");
    return new HttpParams()
      .set('page', String(page))
      .set('limit', String(AppConfig.LIFE_QUOTES.LIMIT))
  }

  protected fetchData = (params: any): Observable<ILifeQuotes[]> => {
    // console.log(params);
    return this.httpClient.get<ILifeQuotes[]>(AppConfig.LIFE_QUOTES.URL, { params });
  }

  protected mapResponse = (data: any): ILifeQuotes[] => {
    // console.log(data, "life quote mapped data");
    // pluck('quotes'),
    const noOfPaginationLinks = Math.ceil(data.totalPages / AppConfig.LIFE_QUOTES.LIMIT);
    console.log(noOfPaginationLinks);
    this.getByPageNumber(noOfPaginationLinks);
    this.dataPublisher.next(data['quotes']);
    return data['quotes'];
  }
}

export function ProgrammingQuotesFactory(http: HttpClient, _notificationService: NotificationService): ProgrammingQuotesService {
  return new ProgrammingQuotesService(http, _notificationService);
}

export const QUOTES_SERVICE_TOKEN = new InjectionToken<ProgrammingQuotesService>("QUOTES_SERVICE_TOKEN");

@Injectable()
export class ProgrammingQuotesService extends API<IProgrammingQuotes> {
  private httpClient: HttpClient;
  private dataPublisher = new BehaviorSubject<IProgrammingQuotes[]>([]);
  data$ = this.dataPublisher.asObservable();

  constructor(httpClient: HttpClient, private _notificationService: NotificationService) {
    super();
    this.httpClient = httpClient;
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage("Technical error occured");
  }

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage("Programming quotes are fetched");
  }

  protected configureParams(page: number): HttpParams {
    // console.log(page, "page number in params");
    return new HttpParams()
      .set('page', String(page));
  }

  protected fetchData = (params: any): Observable<IProgrammingQuotes[]> => {
    // console.log(params);
    return this.httpClient.get<IProgrammingQuotes[]>(AppConfig.PROGAMMIN_QUOTES.URL + `${params.updates[0].value}`);
  }

  protected mapResponse = (data: IProgrammingQuotes[]): IProgrammingQuotes[] => {
    console.log(data, "programming quotes data");
    // As api doesn't return the totalQuotes, hard coded to actual quotes in api by calculation = 25 pages *20 quotes + 1 page *1 quote;
    //  TOTAL PAGE SIZE IS 501;
    const page = Math.ceil(AppConfig.PROGAMMIN_QUOTES.TOTAL_PAGES / AppConfig.PROGAMMIN_QUOTES.PAGE_SIZE);
    this.getByPageNumber(page);
    this.dataPublisher.next(data);
    return data;
  }
}