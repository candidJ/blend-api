import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PaginationConfig } from 'libs/shared/src/lib/modules/paginator/types/paginator.interface';
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
  public paginationConfig$: Observable<PaginationConfig> =
    this.newsApiService.paginationConfig$;

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
    this.defineGridColumns();
  }

  // <T, K extends keyof T>(obj: T, key: K)
  // TODO: deep dive
  private defineGridColumns(): Array<IGridColumnsDef> {
    return (this.dataSource = this.articleColumns.slice(0, 3));
  }

  public onPaginatorChange(page: number) {
    return this.newsApiService.fetchByPageNumber(page);
  }

  ngOnInit(): void {
    this.articles$ = this.newsApiService.fetch();
  }
}
