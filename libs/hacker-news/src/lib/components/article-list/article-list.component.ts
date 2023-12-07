import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsApiService } from '../../services';
import { IGridColumnsDef } from '../../types';

@Component({
  selector: 'ba-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [NewsApiService], // equivalent to [{provide: NewsApiService, useClass: NewsApiService}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  public articles$: Observable<any[]>;

  public dataSource: IGridColumnsDef[] = [];
  public articleColumns: Array<IGridColumnsDef> = [
    {
      header: 'Headline',
      property: 'title',
      type: 'text',
    },
    {
      header: 'Author',
      property: 'author',
      type: 'text',
    },
    {
      header: 'Published At',
      property: 'publishedAt',
      type: 'date',
    },
    {
      header: 'View',
      property: 'actions',
      type: 'template',
    },
  ];

  @ViewChild('actions')
  actionsTemp: TemplateRef<any>;

  constructor(private newsApiService: NewsApiService) {
    this.dataSource = [...this.articleColumns];
  }

  // <T, K extends keyof T>(obj: T, key: K)
  // TODO: deep dive
  private defineGridColumns() {
    this.dataSource = [...this.articleColumns];
  }

  public onPaginatorChange(page: number): void {
    this.newsApiService.fetchFeedByPageNumber(page);
  }

  ngOnInit(): void {
    this.articles$ = this.newsApiService.fetchNewsArticles();
  }
}
