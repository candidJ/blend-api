import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';


@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule
  ],
  exports: [PaginatorComponent]
})
export class SharedModule { }
