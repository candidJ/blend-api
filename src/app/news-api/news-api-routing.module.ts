import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { HackerNewsComponent } from './hacker-news/hacker-news.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "news-api",
                component: ArticleListComponent
            }, {
                path: "",
                component: HackerNewsComponent
            }
        ])],

})
export class NewsApiRoutingModule {

}