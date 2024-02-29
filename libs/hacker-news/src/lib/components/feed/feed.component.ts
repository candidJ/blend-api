import { Component, OnInit, WritableSignal, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  GridComponent,
  PaginationConfig,
  PaginatorComponent,
} from '@blend-api/shared';
import {
  HackerNewsTableColumn,
  HackerNewsItem,
  ConfigType,
  ConfigProps,
} from '../../types';
import { HackerNewsApiService } from '../../services';
import {
  HackerNewsFeedColumns,
  HACKER_NEWS_URL,
  HACKER_NEWS_CONFIG,
} from '../../constants/hacker-news.const';
import { ActivatedRoute } from '@angular/router';

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
  paginationConfig: WritableSignal<PaginationConfig>;

  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #config = HACKER_NEWS_CONFIG;

  constructor(private hackerNewsService: HackerNewsApiService) {
    this.paginationConfig = this.hackerNewsService.paginationConfig;
  }

  onPaginatorChange(page: number): void {
    this.hackerNewsService.fetchFeedByPageNumber(page);
  }

  ngOnInit(): void {
    const activeUrl: ConfigType = this.determineActiveUrl();
    this.feed$ = this.hackerNewsService.fetchNewsFeed(activeUrl).pipe(
      map((feed) => {
        return feed.map((f) => {
          if (!f.domain) {
            f.url = `${HACKER_NEWS_URL}${f.url}`;
            f.domain = HACKER_NEWS_URL.split('/')[2];
          }
          return f;
        });
      }),
      tap(() => this.composePaginationConfig(activeUrl)),
    );
  }

  private determineActiveUrl(): ConfigType {
    const path: string | undefined = this.#activatedRoute.snapshot.url[0].path;
    if (this.isConfigPath(path)) {
      return path;
    } else {
      return 'feed';
    }
  }

  private isConfigPath(path: string | undefined): path is ConfigType {
    return (
      path === 'jobs' ||
      path === 'feed' ||
      path === 'show' ||
      path === 'ask' ||
      path === 'latest'
    );
  }

  private composePaginationConfig = (feedType: ConfigType): void => {
    const configType: ConfigProps = this.#config[feedType];
    const feedPaginationConfig: PaginationConfig = {
      listLength: configType.TOTAL_RECORDS,
      noOfPages: configType.NO_OF_PAGES,
      pageSize: configType.PAGE_SIZE,
    };
    // set the signal to pagination from FeedPubSub
    this.paginationConfig.set(feedPaginationConfig);
  };
}
