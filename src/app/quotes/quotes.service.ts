import { Injectable } from '@angular/core';
import { ILifeQuotes, IProgrammingQuotes } from '../utils/interface';
import { API } from '../shared/utils/api.class';
import { AppConfig } from '../utils/config.constant';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LifeQuotesService extends API<ILifeQuotes> {

  constructor(private httpClient: HttpClient) {
    super();
  }

  configureParams(page: number): HttpParams {
    console.log(page, "page number in params");
    return new HttpParams()
      .set('page', String(page));
  }

  fetchData = (params: any): Observable<ILifeQuotes[]> => {
    console.log(params);
    console.log(this, "strange");
    return this.httpClient.get<ILifeQuotes[]>(AppConfig.LIFE_QUOTES.URL, { params });
  }

  mapResponse(data: any): ILifeQuotes[] {
    console.log(data, "life quote mapped data");
    // pluck('quotes'),
    return data.quotes.map((quote: ILifeQuotes) => {
      if (quote.quoteAuthor) {
        return quote;
      }
    })
  }

}


@Injectable({
  providedIn: 'root'
})
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
    console.log(params);
    return this.httpClient.get<IProgrammingQuotes[]>(AppConfig.PROGAMMIN_QUOTES.URL + `${params.updates[0].value}`);
  }

  protected mapResponse = (data: any): IProgrammingQuotes[] => {
    console.log(data, "programming quotes data");
    const page = Math.ceil(data.length / AppConfig.PROGAMMIN_QUOTES.PAGE_SIZE);
    console.log(this);
    this.getByPageNumber(page);
    return data.map((quote: IProgrammingQuotes) => quote);
  }
}