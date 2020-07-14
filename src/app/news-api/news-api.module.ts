import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { NewsApiRoutingModule } from './news-api-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HackerNewsComponent } from './hacker-news/hacker-news.component';
import { JobsComponent } from './hacker-news/jobs/jobs.component';
import { FeedComponent } from './hacker-news/feed/feed.component';
import { FeedDetailsComponent } from './hacker-news/feed-details/feed-details.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    HackerNewsComponent,
    JobsComponent,
    FeedComponent,
    FeedDetailsComponent
  ],
  imports: [
    CommonModule,
    NewsApiRoutingModule,
    SharedModule
  ]
})
export class NewsApiModule { }
