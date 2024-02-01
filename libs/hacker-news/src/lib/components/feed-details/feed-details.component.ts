import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HackerNewsApiService } from '../../services';
import { HackerNewsFeedDetails } from '../../types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ba-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss'],
})
export class FeedDetailsComponent implements OnInit {
  feedItem$: Observable<HackerNewsFeedDetails>;
  noOfPages$: Observable<number[]>;

  constructor(
    private hackerNewsService: HackerNewsApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const itemId: number = this.route.snapshot.params['id'];
    this.feedItem$ = this.hackerNewsService.loadItemDetails(itemId);
  }
}
