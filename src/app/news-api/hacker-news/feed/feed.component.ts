import { Component, OnInit } from '@angular/core';
import { HackerNewsApiService } from '../hacker-news-api.service';
import { HackerNewsFeed, IGridColumnsDef, HackerNews } from 'src/app/shared/interface/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public feed$: Observable<HackerNewsFeed[]>;
  public dataSource: HackerNews[];
  public feedColumns: HackerNews[];
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
