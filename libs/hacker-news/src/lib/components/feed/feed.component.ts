import { Component, OnInit, WritableSignal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  GridComponent,
  PaginationConfig,
  PaginatorComponent,
} from '@blend-api/shared';
import { HackerNewsTableColumn, HackerNewsItem } from '../../types';
import { HackerNewsApiService } from '../../services';
import {
  HackerNewsFeedColumns,
  HACKER_NEWS_URL,
} from '../../constants/hacker-news.const';

@Component({
  selector: 'ba-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  providers: [HackerNewsApiService],
  imports: [GridComponent, PaginatorComponent, AsyncPipe],
})
export class FeedComponent implements OnInit {
  feed$: Observable<HackerNewsItem[]>;
  feedColumns: HackerNewsTableColumn[] = HackerNewsFeedColumns;
  feedColumnsClone = structuredClone(this.feedColumns);
  paginationConfig: WritableSignal<PaginationConfig>;

  constructor(private hackerNewsService: HackerNewsApiService) {
    this.paginationConfig = this.hackerNewsService.paginationConfig;
  }

  onPaginatorChange(page: number): void {
    this.hackerNewsService.fetchFeedByPageNumber(page);
  }

  ngOnInit(): void {
    this.feed$ = this.hackerNewsService.fetchNewsFeed().pipe(
      map((feed) => {
        return feed.map((f) => {
          if (!f.domain) {
            f.url = `${HACKER_NEWS_URL}${f.url}`;
            f.domain = HACKER_NEWS_URL.split('/')[2];
          }
          return f;
        });
      }),
    );
  }
}
