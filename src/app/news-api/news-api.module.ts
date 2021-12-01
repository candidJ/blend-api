import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";
import { ArticleListComponent } from "src/app/news-api/components/article-list/article-list.component";
import { CommentsComponent } from "src/app/news-api/components/hacker-news/comments/comments.component";
import { FeedComponent } from "src/app/news-api/components/hacker-news/feed/feed.component";
import { FeedDetailsComponent } from "src/app/news-api/components/hacker-news/feed-details/feed-details.component";
import { NewsApiRoutingModule } from "src/app/news-api/news-api-routing.module";
import { SharedModule } from "../shared/shared.module";
import { MessageBoxModule } from "src/app/shared/modules/message-box/message-box.module";
import { GridModule } from "src/app/shared/modules/grid/grid.module";
import { LoaderModule } from "src/app/shared/modules/loader/loader.module";
import { PaginatorModule } from "src/app/shared/modules/paginator/paginator.module";
import { NotificationsModule } from "src/app/shared/modules/notifications/notifications.module";
import { HackerNewsApiService } from "src/app/news-api/services/hacker-news-api.service";

@NgModule({
  declarations: [
    ArticleListComponent,
    CommentsComponent,
    FeedComponent,
    FeedDetailsComponent,
  ],
  imports: [
    CommonModule,
    NewsApiRoutingModule,
    IconsModule,
    NotificationsModule,
    PaginatorModule,
    LoaderModule,
    GridModule,
    SharedModule,
  ],
  exports: [],
  providers: [HackerNewsApiService],
})
export class NewsApiModule {}
