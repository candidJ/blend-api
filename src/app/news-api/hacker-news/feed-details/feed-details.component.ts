import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../hacker-news-api.service';
import { Observable } from 'rxjs';
import { HackerNewsFeedDetails } from 'src/app/shared/interface/interface';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss']
})
export class FeedDetailsComponent implements OnInit {

  public item$: Observable<HackerNewsFeedDetails>;
  public noOfPages$: Observable<number[]>;

  constructor(private hackerNewsService: HackerNewsApiService<any>) { }

  ngOnInit(): void {
    this.item$ = this.hackerNewsService.loadItemDetails();
  }

}
