import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProgrammingComponent } from './components/programming/programming.component';
import { LifeComponent } from './components/life/life.component';
import {
  IconsModule,
  LoaderModule,
  MessageBoxModule,
  NotificationsModule,
  PaginatorModule,
} from '@blend-api/shared';

@NgModule({
  declarations: [ProgrammingComponent, LifeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LifeComponent,
        // children: [
        // {
        //   path: 'programming',
        //   component: ProgrammingComponent,
        // },
        // {
        //   path: 'life',
        //   component: LifeComponent,
        // },
        // ],
      },
    ]),
    IconsModule,
    NotificationsModule,
    MessageBoxModule,
    PaginatorModule,
    LoaderModule,
  ],
})
export class QuotesModule {}
