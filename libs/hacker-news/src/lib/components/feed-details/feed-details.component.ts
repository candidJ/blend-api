import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HackerNewsApiService } from '../../services';
import { HackerNewsFeedDetails } from '../../types';

@Component({
  selector: 'ba-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss'],
})
export class FeedDetailsComponent implements OnInit {
  public item$: Observable<HackerNewsFeedDetails>;
  public noOfPages$: Observable<number[]>;

  constructor(private hackerNewsService: HackerNewsApiService<any>) {}

  ngOnInit(): void {
    this.item$ = this.hackerNewsService.loadItemDetails();
  }
}
