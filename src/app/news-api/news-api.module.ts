import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { NewsApiRoutingModule } from './news-api-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommentsComponent } from './hacker-news/comments/comments.component';
import { HackerNewsComponent } from './hacker-news/hacker-news.component';
import { FeedComponent } from './hacker-news/feed/feed.component';
import { FeedDetailsComponent } from './hacker-news/feed-details/feed-details.component';
import { HackerNewsApiService } from './hacker-news/hacker-news-api.service';

@NgModule({
  declarations: [
    ArticleListComponent,
    HackerNewsComponent,
    CommentsComponent,
    FeedComponent,
    FeedDetailsComponent
  ],
  imports: [
    CommonModule,
    NewsApiRoutingModule,
    SharedModule
  ],
  providers:[HackerNewsApiService]
})
export class NewsApiModule { }
