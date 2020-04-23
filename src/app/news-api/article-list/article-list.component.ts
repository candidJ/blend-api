import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';
import { INewsArticles } from 'src/app/utils/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  public news$: Observable<INewsArticles[]>;
  public noOfPages$: Observable<number[]>;

  constructor(private newsApiServie: NewsApiService) { }

  ngOnInit(): void {
    // this.news$ = 
    this.newsApiServie.fetchNewsFeed()
      .subscribe((response) => {
        console.log("news api fetched", response);
      });
    this.noOfPages$ = this.newsApiServie.getNoOfPages();
    // Emit value via subject But firsr subscribe to the observable
    this.newsApiServie.getNewsByPage(1);
  }

}
