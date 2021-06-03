import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator.component';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "", component: CalculatorComponent
    }
    ]),
    SharedModule
  ]
})
export class CalculatorModule { }
