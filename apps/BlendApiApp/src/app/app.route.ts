import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'weather',
    loadChildren: () =>
      import('@blend-api/weather').then((r) => r.WEATHER_ROUTES),
  },
  {
    path: 'quotes',
    loadChildren: () =>
      import('@blend-api/quotes').then((r) => r.QUOTES_ROUTES),
    data: { preload: true },
  },
  {
    path: 'hacker-news',
    loadChildren: () =>
      import('@blend-api/hacker-news').then((r) => r.HACKER_NEWS_ROUTES),
  },
  {
    path: 'calculator',
    loadChildren: () =>
      import('@blend-api/calculator').then((r) => r.CALCULATOR_ROUTES),
  },
  {
    path: '',
    redirectTo: 'hacker-news',
    pathMatch: 'full',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
