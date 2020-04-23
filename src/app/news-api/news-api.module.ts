import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { NewsApiRoutingModule } from './news-api-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ArticleListComponent
  ],
  imports: [
    CommonModule,
    NewsApiRoutingModule,
    SharedModule
  ]
})
export class NewsApiModule { }
