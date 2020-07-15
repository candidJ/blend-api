import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { HackerNewsComponent } from './hacker-news/hacker-news.component';
import { FeedComponent } from './hacker-news/feed/feed.component';
import { FeedDetailsComponent } from './hacker-news/feed-details/feed-details.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "news-api",
                component: ArticleListComponent
            },
            {
                path: "",
                component: HackerNewsComponent,
                children: [
                    {
                        path: "item/:id",
                        component: FeedDetailsComponent
                    },
                    {
                        path: "feed",
                        component: FeedComponent
                    },
                    {
                        path: "jobs",
                        component: FeedComponent
                    },
                    {
                        path: "latest",
                        component: FeedComponent
                    },
                    {
                        path: "ask",
                        component: FeedComponent
                    },
                    {
                        path: "show",
                        component: FeedComponent
                    }
                ]
            }
        ])],
    exports: [RouterModule]

})
export class NewsApiRoutingModule {

}