import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { INewsFeed } from '../shared/interface/interface';
import { AppConfig } from '../shared/constant/config';
import { API } from '../shared/class/api';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class NewsApiService extends API<INewsFeed> {

    private readonly config = AppConfig.NEWS_API_CONFIG;

    constructor(private httpClient: HttpClient, private _notificationService: NotificationService) {
        super();
        // for testing on netlify hosting
        this.fetchNewsCatcherNews();
    }

    private fetchNewsCatcherNews() {
        fetch("https://newscatcher.p.rapidapi.com/v1/aggregation?agg_by=day&q=Apple", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "newscatcher.p.rapidapi.com",
                "x-rapidapi-key": "95ab3f5c7amshd51ab9244d21c0fp1caf77jsncf49a0369dfd"
            }
        })
            .then(response => {
                console.log(response, "-=-=-=-news catcher api-=-=-=-");
            })
            .catch(err => {
                console.log(err);
            });
    }

    protected showErrorMessage = () => {
        this._notificationService.showErrorMessage("Technical error occured");
    }

    protected showSuccessMessage = () => {
        this._notificationService.showSuccessMessage("Top news headlines fetched");
    }

    protected configureParams(page: number): HttpParams {
        return new HttpParams()
            .set('apiKey', this.config.API_KEY)
            .set('pageSize', String(this.config.PAGE_SIZE))
            .set('country', this.config.COUNTRY)
            .set('page', page.toString());
    }

    protected fetchData = (params: HttpParams): Observable<INewsFeed> => {
        return this.httpClient.get<INewsFeed>(this.config.NEWS_API_URL, { params });
    }

    protected mapResponse = (data: INewsFeed) => {
        const totalResults = data.totalResults;
        const page = Math.ceil(totalResults / this.config.PAGE_SIZE);
        this.getByPageNumber(page);
        return data.articles;
    }

}
