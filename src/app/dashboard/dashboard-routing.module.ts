import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routeChild = [{
    path: "",
    children: [{
        path: "",
        loadChildren: () => import('../weather/weather.module').then(m => m.WeatherModule)
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routeChild)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {

}