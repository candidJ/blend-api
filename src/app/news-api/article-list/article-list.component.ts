import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { INewsArticles, IGridColumnsDef } from 'src/app/utils/interface';
import { Observable } from 'rxjs';
import { NewsApiService } from '../news-api.service';
import { AppConfig } from 'src/app/utils/config.constant';
import { LodashUtils } from 'src/app/utils/lodash-utils';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [NewsApiService] // equivalent to [{provide: NewsApiService, useClass: NewsApiService}]
})
export class ArticleListComponent implements OnInit {

  public news$: Observable<INewsArticles[]>;
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
        property: 'actions'
      },
      {
        header: 'Headline',
        property: 'title'
      },
      {
        header: 'Author',
        property: 'author'
      },
      {
        header: 'Published At',
        property: 'publishedAt'
      }
    ];

    return this.dataSource = this.articleColumns.slice(1);
  }

  public onPaginatorChange(page: number) {
    // this.articles = [];
    // const pageSize = AppConfig.NEWS_API_CONFIG.PAGE_SIZE
    // const start = (pageSize * (page - 1));
    // let end = start === 0 ? pageSize : (pageSize * page);
    // this.articles = this.articlesClone.slice(start, end);
    // console.log(this.articles, "on paginator change");
    // return [...this.articles];
    return this.newsApiServie.getNewsByPage(page);
  }

  public onView(gridRow) {
    console.log(gridRow, "grid row");
  }

  ngOnInit(): void {
    // this.news$ = 
    this.newsApiServie.fetchNewsFeed()
      .subscribe((response) => {
        console.log("news api fetched", response);
        this.articles = LodashUtils.cloneDeep(response);
        // this.articlesClone = LodashUtils.cloneDeep(response);
        // const noOfRecords = response.length;
        // const recordsToShow = Math.ceil(noOfRecords / this.noOfPages);
        // this.articles = response.splice(0, recordsToShow);
        // console.log(this.articles, "show first article chunk");
      });

    this.noOfPages$ = this.newsApiServie.getNoOfPages();
    this.newsApiServie.getNoOfPages()
      .subscribe((pages) => {
        this.noOfPages = pages.length;
      });

    // Emit value via subject But first subscribe to the observable
    this.newsApiServie.getNewsByPage(1);
    this.defineGridColumns();
  }

}
