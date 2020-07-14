import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../hacker-news-api.service';
import { HackerNewsFeed, IGridColumnsDef, HackerNews } from 'src/app/shared/interface/interface';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private hackerNewsService: HackerNewsApiService, private router: Router, private route: ActivatedRoute) { }

  private defineGridColumns() {
    this.feedColumns = [
      {
        header: 'Title',
        property: 'title',
        type: 'text',
        hasDetails: true,
        isHideSm: false,
        details: [
          {
            property: 'points',
            type: 'text',
            preposition: 'points',
            icon: 'thumbs-up'
          },
          {
            property: 'user',
            type: 'text',
            preposition: 'by',
            icon: 'user'
          },
          {
            property: 'time_ago',
            type: 'text',
            preposition: '',
            icon: 'watch'
          },
          {
            property: 'comments_count',
            type: 'text',
            preposition: 'comment',
            icon: 'message-square'
          }
        ]
      },
      {
        header: 'Domain',
        property: 'domain',
        type: 'link',
        hasDetails: false,
        isHideSm: true
      },
      {
        header: 'View',
        property: 'actions',
        type: 'template',
        hasDetails: false,
        isHideSm: false
      }
    ];

    return this.dataSource = this.feedColumns.slice(0, 2);
  }


  public onPaginatorChange(page: number) {
    return this.hackerNewsService.fetchByPageNumber(page);
  }

  public onViewDetails(value: HackerNewsFeed) {
    this.feedDetails = value;
  }

  ngOnInit(): void {
    this.defineGridColumns();
    this.feed$ = this.hackerNewsService.fetch();
    this.noOfPages$ = this.hackerNewsService.getNoOfPages();
  }

}
