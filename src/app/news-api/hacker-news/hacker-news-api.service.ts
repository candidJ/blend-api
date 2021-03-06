import { Injectable } from '@angular/core';
import { API } from 'src/app/shared/class/api';
import { HackerNewsFeedDetails, PaginationConfig } from 'src/app/shared/interface/interface';
import { AppConfig } from 'src/app/shared/constant/config';
import { NotificationService } from 'src/app/notifications/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RouterState, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HackerNewsApiService<T> extends API<T> {

  private readonly config = AppConfig.HACKER_NEWS;

  constructor(private httpClient: HttpClient, private _notificationService: NotificationService,
    private router: Router) {
    super();
  }

  protected showErrorMessage = () => {
    this._notificationService.showErrorMessage("Technical error occured");
  }

  protected showSuccessMessage = () => {
    this._notificationService.showSuccessMessage("Latest Feed fetched");
  }

  protected configureParams = (page: number): HttpParams => {
    return new HttpParams()
      .set('page', page.toString());
  }

  protected fetchData = (params: HttpParams): Observable<T> => {
    const url = this.determineActiveUrl();
    return this.httpClient.get<T>(url, { params });
  }

  protected mapResponse = (data: T[]) => {
    this.determinePaginationConfig();
    console.log(data, "data");
    return data;
  }

  private determineActiveUrl() {
    const snapshot = this.router.routerState.snapshot.url;
    const base = this.config.BASE;
    switch (snapshot) {
      case '/news/feed': return base + this.config.FEED.URL;
      case '/news/jobs': return base + this.config.JOBS.URL;
      case '/news/latest': return base + this.config.LATEST.URL;
      case '/news/ask': return base + this.config.ASK.URL;
      case '/news/show': return base + this.config.SHOW.URL;
      default: return base + this.config.FEED.URL;
    }
  }

  private determinePaginationConfig() {
    const snapshot = this.router.routerState.snapshot.url;
    switch (snapshot) {
      case '/news/feed':
        const feedPaginationConfig: PaginationConfig = {
          listLength: this.config.FEED.TOTAL_RECORDS,
          noOfPages: this.config.FEED.NO_OF_PAGES,
          pageSize: this.config.FEED.PAGE_SIZE
        };
        this.broadcastPaginationConfig(feedPaginationConfig);
        break;
      case '/news/jobs':
        const jobPaginationConfig: PaginationConfig = {
          listLength: this.config.JOBS.TOTAL_RECORDS,
          noOfPages: this.config.JOBS.NO_OF_PAGES,
          pageSize: this.config.JOBS.PAGE_SIZE
        };
        this.broadcastPaginationConfig(jobPaginationConfig);
        break;
      case '/news/latest':
        const latestPaginationConfig: PaginationConfig = {
          listLength: this.config.LATEST.TOTAL_RECORDS,
          noOfPages: this.config.LATEST.NO_OF_PAGES,
          pageSize: this.config.LATEST.PAGE_SIZE
        };
        this.broadcastPaginationConfig(latestPaginationConfig);
        break;
      case '/news/ask':
        const askPaginationConfig: PaginationConfig = {
          listLength: this.config.ASK.TOTAL_RECORDS,
          noOfPages: this.config.ASK.NO_OF_PAGES,
          pageSize: this.config.ASK.PAGE_SIZE
        };
        this.broadcastPaginationConfig(askPaginationConfig);
        break;
      case '/news/show':
        const showPaginationConfig: PaginationConfig = {
          listLength: this.config.SHOW.TOTAL_RECORDS,
          noOfPages: this.config.SHOW.NO_OF_PAGES,
          pageSize: this.config.SHOW.PAGE_SIZE
        };
        this.broadcastPaginationConfig(showPaginationConfig);
        break;
      default:
        const paginationConfig: PaginationConfig = {
          listLength: this.config.FEED.TOTAL_RECORDS,
          noOfPages: this.config.FEED.NO_OF_PAGES,
          pageSize: this.config.FEED.PAGE_SIZE
        };
        this.broadcastPaginationConfig(paginationConfig);
        break;
    }
  }

  // fetch item detials
  public loadItemDetails(): Observable<HackerNewsFeedDetails> {
    const item = this.router.routerState.snapshot.url.replace('/news/', '')
    return this.httpClient.get<HackerNewsFeedDetails>(this.config.BASE + item)
      .pipe(catchError(err => throwError(err)));
  }


}
