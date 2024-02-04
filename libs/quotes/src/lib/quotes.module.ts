import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProgrammingComponent } from './components/programming/programming.component';
import { LifeComponent } from './components/life/life.component';
import {
  IconsModule,
  MessageBoxModule,
  NotificationsModule,
  PaginatorModule,
} from '@blend-api/shared';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LifeComponent,
      },
    ]),
    IconsModule,
    NotificationsModule,
    MessageBoxModule,
    PaginatorModule,
    ProgrammingComponent,
    LifeComponent,
  ],
})
export class QuotesModule {}
