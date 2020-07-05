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
  public feedColumns: Array<IGridColumnsDef>;
  public noOfPages$: Observable<number[]>;

  constructor(private hackerNewsService: HackerNewsApiService) { }

  private defineGridColumns(): Array<IGridColumnsDef> {
    this.feedColumns = [
      {
        header: 'Headline',
        property: 'title',
        type: 'text'
      },
      {
        header: 'Comment count',
        property: 'comments_count',
        type: 'text'
      },
      {
        header: 'Author',
        property: 'user',
        type: 'text'
      },
      {
        header: 'Published',
        property: 'time_ago',
        type: 'text'
      },
      {
        header: 'View',
        property: 'actions',
        type: 'template'
      }
    ];

    return this.dataSource = this.feedColumns.slice(0, 4);
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
