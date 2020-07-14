import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { HackerNewsComponent } from './hacker-news/hacker-news.component';
import { JobsComponent } from './hacker-news/jobs/jobs.component';
import { FeedComponent } from './hacker-news/feed/feed.component';
import { FeedDetailsComponent } from './hacker-news/feed-details/feed-details.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "news-api",
                component: ArticleListComponent
            }, {
                path: "",
                component: HackerNewsComponent,
                children: [
                    {
                        path: "feed/:id",
                        component: FeedDetailsComponent
                    },
                    {
                        path: "feed",
                        component: FeedComponent,
                        children: [
                            {
                                path: ":id",
                                component: FeedDetailsComponent
                            }
                        ]
                    },
                    {
                        path: "jobs",
                        component: FeedComponent
                    }
                ]
            }
        ])],
    exports: [RouterModule]

})
export class NewsApiRoutingModule {

}