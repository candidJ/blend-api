import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CommentsComponent,
  FeedComponent,
  FeedDetailsComponent,
} from './components';
import { HackerNewsRoutingModule } from './hacker-news-routing.module';
import {
  GridModule,
  IconsModule,
  NotificationsModule,
  PaginatorModule,
} from '@blend-api/shared';
import { HackerNewsApiService } from './services';

@NgModule({
  imports: [
    CommonModule,
    HackerNewsRoutingModule,
    IconsModule,
    NotificationsModule,
    PaginatorModule,
    GridModule,
    CommentsComponent,
    FeedComponent,
    FeedDetailsComponent,
  ],
  exports: [],
  providers: [HackerNewsApiService],
})
export class HackerNewsModule {}
