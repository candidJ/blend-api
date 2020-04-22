import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { NewsApiRoutingModule } from './news-api-routing.module';

@NgModule({
  declarations: [ArticleListComponent],
  imports: [
    CommonModule,
    NewsApiRoutingModule
  ]
})
export class NewsApiModule { }
