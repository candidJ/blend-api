import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'hacker-news',
    pathMatch: 'full',
  },
  {
    path: 'weather',
    loadChildren: () =>
      import('@blend-api/weather').then((r) => r.WEATHER_ROUTES),
  },
  {
    path: 'quotes',
    loadChildren: () =>
      import('@blend-api/quotes').then((m) => m.QUOTES_ROUTES),
    data: { preload: true },
  },
  {
    path: 'hacker-news',
    loadChildren: () =>
      import('@blend-api/hacker-news').then((m) => m.HACKER_NEWS_ROUTES),
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
