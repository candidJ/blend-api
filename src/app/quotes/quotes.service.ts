import { Injectable, InjectionToken } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILifeQuotes, IProgrammingQuotes } from '../shared/interface/interface';
import { AppConfig } from '../shared/constant/config';
import { API } from '../shared/class/api';

@Injectable({
  providedIn: "root"
})
export class LifeQuotesService extends API<ILifeQuotes> {

  constructor(private httpClient: HttpClient) {
    super();
  }

  protected configureParams(page: number): HttpParams {
    // console.log(page, "page number in params");
    return new HttpParams()
      .set('page', String(page));
  }

  protected fetchData = (params: any): Observable<ILifeQuotes[]> => {
    // console.log(params);
    return this.httpClient.get<ILifeQuotes[]>(AppConfig.LIFE_QUOTES.URL, { params });
  }

  protected mapResponse(data: any): ILifeQuotes[] {
    console.log(data, "life quote mapped data");
    // pluck('quotes'),
    return data.quotes.map((quote: ILifeQuotes) => {
      if (quote.quoteAuthor) {
        return quote;
      }
    })
  }

}

export function ProgrammingQuotesFactory(http: HttpClient): ProgrammingQuotesService {
  return new ProgrammingQuotesService(http);
}

export const QUOTES_SERVICE_TOKEN = new InjectionToken<ProgrammingQuotesService>("QUOTES_SERVICE_TOKEN");

@Injectable()
export class ProgrammingQuotesService extends API<IProgrammingQuotes> {

  constructor(private httpClient: HttpClient) {
    super();
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
    const page = Math.ceil(data.length / AppConfig.PROGAMMIN_QUOTES.PAGE_SIZE);
    this.getByPageNumber(page);
    return data.map((quote: IProgrammingQuotes) => quote);
  }
}