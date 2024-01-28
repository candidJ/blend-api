import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeedComponent, FeedDetailsComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
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
    ]),
  ],
  exports: [RouterModule],
})
export class HackerNewsRoutingModule {}
