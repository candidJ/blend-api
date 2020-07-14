import { Injectable } from '@angular/core';
import { API } from 'src/app/shared/class/api';
import { HackerNewsFeed } from 'src/app/shared/interface/interface';
import { AppConfig } from 'src/app/shared/constant/config';
import { NotificationService } from 'src/app/notifications/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterState, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsApiService extends API<HackerNewsFeed> {

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

  protected fetchData = (params: HttpParams): Observable<HackerNewsFeed> => {
    const url = this.determineActiveUrl();
    return this.httpClient.get<HackerNewsFeed>(url, { params });
  }

  protected mapResponse = (data: HackerNewsFeed[]) => {
    this.getByPageNumber(this.config.TOTAL_PAGES);
    return data;
  }

  private determineActiveUrl() {
    const snapshot = this.router.routerState.snapshot.url;
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
}
