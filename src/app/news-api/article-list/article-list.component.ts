import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiService } from '../news-api.service';
import { INewsArticles, IGridColumnsDef } from '../../shared/interface/interface';
import { LodashUtils } from '../../shared/helpers/lodash';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [NewsApiService], // equivalent to [{provide: NewsApiService, useClass: NewsApiService}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {

  public articles$: Observable<INewsArticles[]>;
  public noOfPages$: Observable<number[]>;
  public articles: INewsArticles[];
  public dataSource: IGridColumnsDef[];
  public articleColumns: Array<IGridColumnsDef>;

  private articlesClone: INewsArticles[];
  private noOfPages: number;
  @ViewChild("actions")
  actionsTemp: TemplateRef<any>;

  constructor(private newsApiServie: NewsApiService) { }

  // <T, K extends keyof T>(obj: T, key: K)
  private defineGridColumns(): Array<IGridColumnsDef> {
    this.articleColumns = [
      {
        header: 'Actions',
        property: 'actions',
        type: 'template'
      },
      {
        header: 'Headline',
        property: 'title',
        type: 'text'
      },
      {
        header: 'Author',
        property: 'author',
        type: 'text'
      },
      {
        header: 'Published At',
        property: 'publishedAt',
        type: 'date'
      }
    ];

    return this.dataSource = this.articleColumns.slice(1);
  }

  public onPaginatorChange(page: number) {
    return this.newsApiServie.fetchByPageNumber(page);
  }

  public onView(gridRow) {
    console.log(gridRow, "grid row");
  }

  ngOnInit(): void {
    this.articles$ = this.newsApiServie.fetch();
    this.articles$.subscribe((response) => {
      console.log("news api fetched", response);
      this.articles = LodashUtils.cloneDeep(response);
    });

    this.noOfPages$ = this.newsApiServie.getNoOfPages();
    // this.newsApiServie.getNoOfPages()
    //   .subscribe((pages) => {
    //     this.noOfPages = pages.length;
    //   });

    // Emit value via subject But first subscribe to the observable
    this.newsApiServie.fetchByPageNumber(1);
    this.defineGridColumns();
  }

}
