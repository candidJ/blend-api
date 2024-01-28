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
  LoaderModule,
  NotificationsModule,
  PaginatorModule,
} from '@blend-api/shared';
import { HackerNewsApiService } from './services';

@NgModule({
  declarations: [CommentsComponent, FeedComponent, FeedDetailsComponent],
  imports: [
    CommonModule,
    HackerNewsRoutingModule,
    IconsModule,
    NotificationsModule,
    PaginatorModule,
    LoaderModule,
    GridModule,
  ],
  exports: [],
  providers: [HackerNewsApiService],
})
export class HackerNewsModule {}
