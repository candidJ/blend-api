import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../hacker-news-api.service';
import { HackerNewsFeed, IGridColumnsDef } from 'src/app/shared/interface/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public feed$: Observable<HackerNewsFeed[]>;
  public dataSource: IGridColumnsDef[];
  // public feedColumns: Array<IGridColumnsDef>;
  public feedColumns: Array<any>;
  public noOfPages$: Observable<number[]>;

  constructor(private hackerNewsService: HackerNewsApiService) { }

  private defineGridColumns() {
    this.feedColumns = [
      {
        header: 'Headline',
        property: 'title',
        type: 'text',
        hasDetails: true,
        details: [
          {
            property: 'user',
            type: 'text',
            preposition: 'by'
          },
          {
            property: 'time_ago',
            type: 'text',
            preposition: ''
          },
          {
            property: 'points',
            type: 'text',
            preposition: 'points'
          }
        ]

      },
      {
        header: 'Comment count',
        property: 'comments_count',
        type: 'text',
        hasDetails: false
      },
      {
        header: 'View',
        property: 'actions',
        type: 'template',
        hasDetails: false
      }
    ];

    return this.dataSource = this.feedColumns.slice(0, 2);
  }


  public onPaginatorChange(page: number) {
    return this.hackerNewsService.fetchByPageNumber(page);
  }

  ngOnInit(): void {
    this.defineGridColumns();
    this.feed$ = this.hackerNewsService.fetch();
    this.noOfPages$ = this.hackerNewsService.getNoOfPages();
  }

}
