import { Injectable } from '@angular/core';
import { API } from 'src/app/shared/class/api';
import { HackerNewsFeedDetails } from 'src/app/shared/interface/interface';
import { AppConfig } from 'src/app/shared/constant/config';
import { NotificationService } from 'src/app/notifications/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RouterState, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
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
    this._notificationService.showSuccessMessage("Top news headlines fetched");
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
    this.getByPageNumber(this.config.TOTAL_PAGES);
    return data;
  }

  private determineActiveUrl() {
    const snapshot = this.router.routerState.snapshot.url;
    // console.log(snapshot, "snapshot");
    const base = this.config.BASE;
    switch (snapshot) {
      case '/news/feed': return base + this.config.FEED_URL;
      case '/news/jobs': return base + this.config.JOBS_URL;
      case '/news/latest': return base + this.config.LATEST_URL;
      case '/news/ask': return base + this.config.ASK_URL;
      case '/news/show': return base + this.config.SHOW_URL;
      default: return this.config.FEED_URL;
    }
  }

  // fetch item detials
  public loadItemDetails(): Observable<HackerNewsFeedDetails> {
    const item = this.router.routerState.snapshot.url.replace('/news/', '')
    return this.httpClient.get<HackerNewsFeedDetails>(this.config.BASE + item)
      .pipe(catchError(err => throwError(err)));
  }


}
