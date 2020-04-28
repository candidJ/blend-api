import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routeChild = [{
    path: "",
    component: DashboardComponent,
    children: [
        {
            path: "",
            loadChildren: () => import('../quotes/quotes.module').then(m => m.QuotesModule)
        },
        {
            path: "weather",
            loadChildren: () => import('../weather/weather.module').then(m => m.WeatherModule)
        },
        {
            path: "news",
            loadChildren: () => import('../news-api/news-api.module').then(m => m.NewsApiModule)
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routeChild)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}