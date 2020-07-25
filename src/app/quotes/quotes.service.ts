import { Injectable, InjectionToken } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ILifeQuotes, IProgrammingQuotes, PaginationConfig } from '../shared/interface/interface';
import { AppConfig } from '../shared/constant/config';
import { API } from '../shared/class/api';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class LifeQuotesService extends API<ILifeQuotes> {
  // When Subject is used in instead of behavior subject in API-
  //  using subscribers - publish method for stateless components 
  private dataPublisher = new Subject<ILifeQuotes[]>();
  data$ = this.dataPublisher.asObservable();

  constructor(private httpClient: HttpClient, private _notificationService: NotificationService) {
    super();

    // for testing purpose
    this.fetchFootballVideos();
    this.fetchGuardianNews();
  }



  private fetchFootballVideos() {
    fetch('https://www.scorebat.com/video-api/v1/')
      .then((data) => {
        console.log(data, "fooball api");
      }).catch((error) => {
        console.log(error, "football api");
      });
  }

  private fetchGuardianNews() {
    fetch('https://content.guardianapis.com/search?api-key=f04a2cbd-3074-4214-8343-a59436eb2f42')
      .then((data) => {
        console.log(data, "guardian api");
      }).catch((error) => {
        console.log(error, "guardian api");
      });
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage("Technical error occured");
  }

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage("Life quotes fetched");
  }

  protected configureParams = (page: number): HttpParams => {
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
    const paginationConfig: PaginationConfig = {
      listLength: data.totalPages * AppConfig.LIFE_QUOTES.LIMIT,
      noOfPages: Math.ceil(data.totalPages / AppConfig.LIFE_QUOTES.LIMIT),
      pageSize: AppConfig.LIFE_QUOTES.LIMIT
    };
    this.broadcastPaginationConfig(paginationConfig);
    // this.dataPublisher.next(data['quotes']);
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
    this._notificationService.showSuccessMessage("Programming quotes fetched");
  }

  protected configureParams = (page: number): HttpParams => {
    // console.log(page, "page number in params");
    return new HttpParams()
      .set('page', String(page));
  }

  protected fetchData = (params: any): Observable<IProgrammingQuotes[]> => {
    // console.log(params);
    return this.httpClient.get<IProgrammingQuotes[]>(AppConfig.PROGAMMING_QUOTES.URL + `${params.updates[0].value}`);
  }

  protected mapResponse = (data: IProgrammingQuotes[]): IProgrammingQuotes[] => {
    console.log(data, "programming quotes data");
    // As api doesn't return the totalQuotes, hard coded to actual quotes in api by calculation = 25 pages *20 quotes + 1 page *1 quote;
    //  TOTAL PAGE SIZE IS 501;
    const paginationConfig: PaginationConfig = {
      listLength: AppConfig.PROGAMMING_QUOTES.TOTAL_RECORDS,
      noOfPages: Math.ceil(AppConfig.PROGAMMING_QUOTES.TOTAL_RECORDS / AppConfig.PROGAMMING_QUOTES.PAGE_SIZE),
      pageSize: AppConfig.PROGAMMING_QUOTES.PAGE_SIZE
    };
    this.broadcastPaginationConfig(paginationConfig);
    // this.dataPublisher.next(data);
    return data;
  }
}