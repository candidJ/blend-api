import { Component, OnInit, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaginationConfig } from '@blend-api/shared';
import { HackerNews, HackerNewsFeed } from '../../types';
import { HackerNewsApiService } from '../../services';
import { HackerNewsFeedColumns, YCOMBINATOR_URL } from '../../constants/metadata.const';

@Component({
  selector: 'ba-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  feed$: Observable<HackerNewsFeed[]>;
  feedColumns: HackerNews[] = HackerNewsFeedColumns;
  paginationConfig: WritableSignal<PaginationConfig | null>;

  constructor(private hackerNewsService: HackerNewsApiService) {
    this.paginationConfig = this.hackerNewsService.paginationConfig;
  }

  onPaginatorChange(page: number): void {
    this.hackerNewsService.fetchFeedByPageNumber(page);
  }

  ngOnInit(): void {
    this.feed$ = this.hackerNewsService.fetchNewsFeed()
      .pipe(map((feed) => {
        // console.log('feed', feed);
        return feed.map(f => {
          if (f.type === 'ask') {
            f.url = `${YCOMBINATOR_URL}${f.url}`;
          }
          return f;
        });
      }))
  }
}
