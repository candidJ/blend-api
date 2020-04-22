import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';


@NgModule({
    imports: [RouterModule.forChild([{
        path: "",
        component: ArticleListComponent
    }])],

})
export class NewsApiRoutingModule {

}