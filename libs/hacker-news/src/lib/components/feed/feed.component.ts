import { Component, OnInit, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  GridModule,
  PaginationConfig,
  PaginatorComponent,
} from '@blend-api/shared';
import { HackerNewsGridColumns, HackerNewsFeed } from '../../types';
import { HackerNewsApiService } from '../../services';
import {
  HackerNewsFeedColumns,
  YCOMBINATOR_URL,
} from '../../constants/metadata.const';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ba-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [GridModule, PaginatorComponent, AsyncPipe],
})
export class FeedComponent implements OnInit {
  feed$: Observable<HackerNewsFeed[]>;
  feedColumns: HackerNewsGridColumns[] = HackerNewsFeedColumns;
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
          if (f.type === 'ask') {
            f.url = `${YCOMBINATOR_URL}${f.url}`;
          }
          return f;
        });
      }),
    );
  }
}
