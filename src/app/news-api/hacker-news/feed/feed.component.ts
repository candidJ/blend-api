import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../hacker-news-api.service';
import { HackerNewsFeed, IGridColumnsDef, HackerNews } from 'src/app/shared/interface/interface';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { HNFeedColumns } from 'src/app/shared/constant/metadata.const';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public feed$: Observable<HackerNewsFeed[]>;
  public dataSource: HackerNews[];
  public feedColumns: HackerNews[];
  public feedDetails: HackerNewsFeed;
  public noOfPages$: Observable<number[]>;

  constructor(private hackerNewsService: HackerNewsApiService<HackerNewsFeed>, private router: Router, private route: ActivatedRoute) {
    this.router.events
      .subscribe((event: Event) => {
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
      console.log(event);
      if (event.url.indexOf('ask') !== -1) {
        this.dataSource = HNFeedColumns.slice(0, 1);
        this.feedColumns = [...HNFeedColumns.slice(0, 1), ...HNFeedColumns.slice(2)]
        return this.dataSource;
      } else {
        this.feedColumns = HNFeedColumns;
        return this.dataSource = HNFeedColumns.slice(0, 2);
      }
    }
  }

  ngOnInit(): void {
    this.feed$ = this.hackerNewsService.fetch();
    this.noOfPages$ = this.hackerNewsService.getNoOfPages();

  }

}
