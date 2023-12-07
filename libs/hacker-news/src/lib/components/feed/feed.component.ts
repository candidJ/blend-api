import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { HackerNews, HackerNewsFeed } from '../../types';
import { HackerNewsApiService } from '../../services';
import { HNFeedColumns } from '../../constants/metadata.const';

@Component({
  selector: 'ba-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  public feed$: Observable<HackerNewsFeed[]>;
  public dataSource: HackerNews[];
  public feedColumns: HackerNews[];
  public paginationConfig = this.hackerNewsService.paginationConfig;
  
  constructor(
    private hackerNewsService: HackerNewsApiService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      this.removeDomainForAskRoute(event);
    });
  }

  public onPaginatorChange(page: number) {
    return this.hackerNewsService.fetchFeedByPageNumber(page);
  }

  private removeDomainForAskRoute(event: Event): void {
    if (event instanceof NavigationEnd) {
      //  hide domain column for ask request
      if (event.url.indexOf('ask') !== -1) {
        this.dataSource = HNFeedColumns.slice(0, 1);
        this.feedColumns = [
          ...HNFeedColumns.slice(0, 1),
          ...HNFeedColumns.slice(2),
        ];
      } else {
        // show columns headline and domain
        this.feedColumns = HNFeedColumns;
        this.dataSource = HNFeedColumns.slice(0, 2);
      }
    }
  }

  ngOnInit(): void {
    this.feed$ = this.hackerNewsService.fetchNewsFeed();
  }
}
