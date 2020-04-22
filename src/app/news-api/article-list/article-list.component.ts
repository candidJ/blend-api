import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(private newApiServie: NewsApiService) { }

  ngOnInit(): void {
    console.log("news api fetched");
    this.newApiServie.fetchNewsFeed()
      .subscribe((response) => { console.log("reponse", response); })
  }

}
