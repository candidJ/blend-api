import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router, ActivatedRoute, NavigationEnd, Event } from "@angular/router";

import { HNFeedColumns } from "src/app/shared/constant/metadata.const";
import {
  HackerNews,
  HackerNewsFeed,
} from "src/app/news-api/types/hacker-news.interface";
import { PaginationConfig } from "src/app/shared/modules/paginator/types/paginator.interface";
import { HackerNewsApiService } from "src/app/news-api/services/hacker-news-api.service";

@Component({
  selector: "ba-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.scss"],
})
export class FeedComponent implements OnInit {
  public feed$: Observable<HackerNewsFeed[]>;
  public dataSource: HackerNews[];
  public feedColumns: HackerNews[];
  public feedDetails: HackerNewsFeed;
  public paginationConfig$: Observable<PaginationConfig> =
    this.hackerNewsService.paginationConfig$;

  constructor(
    private hackerNewsService: HackerNewsApiService<HackerNewsFeed>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      this.removeDomainForAskRoute(event);
    });
  }

  public onPaginatorChange(page: number) {
    return this.hackerNewsService.fetchByPageNumber(page);
  }

  public onViewDetails(value: HackerNewsFeed) {
    this.feedDetails = value;
  }

  private removeDomainForAskRoute(event: Event): HackerNews[] {
    if (event instanceof NavigationEnd) {
      //  hide domain column for ask request
      if (event.url.indexOf("ask") !== -1) {
        this.dataSource = HNFeedColumns.slice(0, 1);
        this.feedColumns = [
          ...HNFeedColumns.slice(0, 1),
          ...HNFeedColumns.slice(2),
        ];
        return this.dataSource;
      } else {
        // show columns headline and domain
        this.feedColumns = HNFeedColumns;
        return (this.dataSource = HNFeedColumns.slice(0, 2));
      }
    }
  }

  ngOnInit(): void {
    this.feed$ = this.hackerNewsService.fetch();
  }
}
