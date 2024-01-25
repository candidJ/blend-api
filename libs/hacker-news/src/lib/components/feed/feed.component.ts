import { Component, OnInit, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, Event } from '@angular/router';

import { PaginationConfig } from '@blend-api/shared';
import { HackerNews, HackerNewsFeed } from '../../types';
import { HackerNewsApiService } from '../../services';
import { HackerNewsFeedColumns } from '../../constants/metadata.const';

@Component({
  selector: 'ba-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  feed$: Observable<HackerNewsFeed[]>;
  dataSource: HackerNews[];
  feedColumns: HackerNews[];
  paginationConfig: WritableSignal<PaginationConfig | null>;
  
  constructor(
    private hackerNewsService: HackerNewsApiService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      this.removeDomainForAskRoute(event);
    });
    this.paginationConfig = this.hackerNewsService.paginationConfig;
  }

  onPaginatorChange(page: number): void {
    this.hackerNewsService.fetchFeedByPageNumber(page);
  }

  private removeDomainForAskRoute(event: Event): void {
    if (event instanceof NavigationEnd) {
      //  hide domain column for ask request
      if (event.url.indexOf('ask') !== -1) {
        this.dataSource = HackerNewsFeedColumns.slice(0, 1);
        this.feedColumns = [
          ...HackerNewsFeedColumns.slice(0, 1),
          ...HackerNewsFeedColumns.slice(2),
        ];
      } else {
        // show columns headline and domain
        this.feedColumns = HackerNewsFeedColumns;
        this.dataSource = HackerNewsFeedColumns.slice(0, 2);
      }
    }
  }

  ngOnInit(): void {
    this.feed$ = this.hackerNewsService.fetchNewsFeed();
  }
}
