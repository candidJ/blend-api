import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { QuotesComponent } from './quotes.component';
import { LifeComponent } from './life/life.component';
import { ProgrammingComponent } from './programming/programming.component';


@NgModule({
  declarations: [QuotesComponent, ProgrammingComponent, LifeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: QuotesComponent,
      children: [
        {
          path: "programming",
          component: ProgrammingComponent
        },
        {
          path: "life",
          component: LifeComponent
        },
        {
          path: "",
          redirectTo: "life"
        }
      ]
    }]),
    SharedModule
  ]
})
export class QuotesModule { }
