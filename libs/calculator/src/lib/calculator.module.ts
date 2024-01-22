import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CalculatorComponent } from './components/calculator.component';
import { IconsModule, PipeModule } from '@blend-api/shared';

@NgModule({
  declarations: [CalculatorComponent],
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
  ],
})
export class CalculatorModule {}
