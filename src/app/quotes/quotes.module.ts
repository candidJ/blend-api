import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { QuotesComponent } from './quotes.component';
import { ProgrammingComponent } from './programming/programming.component';



@NgModule({
  declarations: [QuotesComponent, ProgrammingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: QuotesComponent
    }]),
    SharedModule
  ]
})
export class QuotesModule { }
