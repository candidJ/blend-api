import { FeedComponent, FeedDetailsComponent } from '../components';
import { HackerNewsApiService } from '../services';

export const HACKER_NEWS_ROUTES = [
  {
    path: '',
    children: [
      {
        path: 'item/:id',
        component: FeedDetailsComponent,
      },
      {
        path: 'feed',
        component: FeedComponent,
      },
      {
        path: 'jobs',
        component: FeedComponent,
      },
      {
        path: 'latest',
        component: FeedComponent,
      },
      {
        path: 'ask',
        component: FeedComponent,
      },
      {
        path: 'show',
        component: FeedComponent,
      },
      {
        path: '',
        redirectTo: 'feed',
      },
    ],
  },
];
