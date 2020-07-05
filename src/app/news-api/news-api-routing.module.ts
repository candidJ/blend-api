import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { HackerNewsComponent } from './hacker-news/hacker-news.component';
import { JobsComponent } from './hacker-news/jobs/jobs.component';
import { FeedComponent } from './hacker-news/feed/feed.component';


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
                        path: "",
                        redirectTo: "feed"
                    },
                    {
                        path:"jobs",
                        component: JobsComponent
                    },
                    {
                        path:"feed",
                        component: FeedComponent
                    }
                ]
            }
        ])],
        exports: [RouterModule]

})
export class NewsApiRoutingModule {

}