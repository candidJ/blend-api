import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CalculatorComponent } from './components/calculator.component';
import { IconsModule, PipeModule } from '@blend-api/shared';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    PipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalculatorComponent,
      },
    ]),
    CalculatorComponent,
  ],
})
export class CalculatorModule {}
