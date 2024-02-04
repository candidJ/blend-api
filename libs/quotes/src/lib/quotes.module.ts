import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProgrammingComponent } from './components/programming/programming.component';
import { LifeComponent } from './components/life/life.component';
import { IconsModule } from '@blend-api/shared';

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
    ProgrammingComponent,
    LifeComponent,
  ],
})
export class QuotesModule {}
