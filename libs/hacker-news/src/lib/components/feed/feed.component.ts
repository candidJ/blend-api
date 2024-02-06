import { Component, OnInit, WritableSignal, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  GridComponent,
  PaginationConfig,
  PaginatorComponent,
} from '@blend-api/shared';
import { HackerNewsGridColumns, HackerNewsFeed } from '../../types';
import { HackerNewsApiService } from '../../services';
import {
  HackerNewsFeedColumns,
  YCOMBINATOR_URL,
} from '../../constants/metadata.const';

@Component({
  selector: 'ba-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [GridComponent, PaginatorComponent, AsyncPipe],
})
export class FeedComponent implements OnInit {
  feed$: Observable<HackerNewsFeed[]>;
  feedColumns: HackerNewsGridColumns[] = HackerNewsFeedColumns;
  feedColumnsClone = structuredClone(this.feedColumns);
  paginationConfig: WritableSignal<PaginationConfig>;
  readonly router = inject(Router);

  constructor(private hackerNewsService: HackerNewsApiService) {
    this.paginationConfig = this.hackerNewsService.paginationConfig;
  }

  onPaginatorChange(page: number): void {
    this.hackerNewsService.fetchFeedByPageNumber(page);
  }

  private configColumnsOnPageLoad(): void {
    console.log('remove domain for ask route');
    //  hide domain column for 'ask' route
    if (this.router.url.indexOf('ask') !== -1) {
      this.feedColumns = this.feedColumns.filter(
        (feedColumn: HackerNewsGridColumns) => feedColumn.property !== 'domain',
      );
    } else {
      // show columns headline and domain
      this.feedColumns = this.feedColumnsClone;
    }
  }

  ngOnInit(): void {
    this.configColumnsOnPageLoad();
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
