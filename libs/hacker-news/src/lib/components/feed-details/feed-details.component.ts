import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { HackerNewsApiService } from '../../services';
import { HackerNewsItemWithComments } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { CommentsComponent } from '../comments/comments.component';
import { FeatherModule } from 'angular-feather';
import { HACKER_NEWS_URL } from '../../constants/hacker-news.const';

@Component({
  selector: 'ba-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss'],
  standalone: true,
  providers: [HackerNewsApiService],
  imports: [FeatherModule, CommentsComponent, AsyncPipe],
})
export class FeedDetailsComponent implements OnInit {
  feedItem$: Observable<HackerNewsItemWithComments>;
  noOfPages$: Observable<number[]>;

  constructor(
    private hackerNewsService: HackerNewsApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const itemId: number = this.route.snapshot.params['id'];
    this.feedItem$ = this.hackerNewsService.loadItemDetails(itemId).pipe(
      map((feedItem: HackerNewsItemWithComments) => {
        if (!feedItem.domain) {
          feedItem.url = `${HACKER_NEWS_URL}${feedItem.url}`;
          // remove URL meta data
          feedItem.domain = HACKER_NEWS_URL.split('/')[2];
        }
        return feedItem;
      }),
    );
  }
}
