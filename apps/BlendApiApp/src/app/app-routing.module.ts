import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    redirectTo: 'hacker-news',
    pathMatch: 'full',
  },
  {
    path: 'quotes',
    loadChildren: () => import('@blend-api/quotes').then((m) => m.QuotesModule),
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('@blend-api/weather').then((m) => m.WeatherModule),
  },
  {
    path: 'hacker-news',
    loadChildren: () =>
      import('@blend-api/hacker-news').then((m) => m.HackerNewsModule),
  },
  {
    path: 'calculator',
    loadChildren: () =>
      import('@blend-api/calculator').then((m) => m.CalculatorModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
