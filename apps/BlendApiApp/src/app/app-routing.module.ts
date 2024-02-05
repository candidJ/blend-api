import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutePreloadStrategy } from './app-routes-preload-strategy';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hacker-news',
    pathMatch: 'full',
  },
  {
    path: 'quotes',
    loadChildren: () => import('@blend-api/quotes').then((m) => m.QuotesModule),
    data: { preload: true },
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
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
  providers: [RoutePreloadStrategy],
})
export class AppRoutingModule {}
