import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ArticleListComponent } from "src/app/news-api/components/article-list/article-list.component";
import { FeedDetailsComponent } from "src/app/news-api/components/hacker-news/feed-details/feed-details.component";
import { FeedComponent } from "src/app/news-api/components/hacker-news/feed/feed.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "news-api",
        component: ArticleListComponent,
      },
      {
        path: "",
        children: [
          {
            path: "item/:id",
            component: FeedDetailsComponent,
          },
          {
            path: "feed",
            component: FeedComponent,
          },
          {
            path: "jobs",
            component: FeedComponent,
          },
          {
            path: "latest",
            component: FeedComponent,
          },
          {
            path: "ask",
            component: FeedComponent,
          },
          {
            path: "show",
            component: FeedComponent,
          },
          {
            path: "",
            redirectTo: "feed",
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class NewsApiRoutingModule {}
