import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { GridComponent } from './components/grid/grid.component';

const SharedComponent = [PaginatorComponent, GridComponent];

@NgModule({
  declarations: [...SharedComponent],
  imports: [
    CommonModule
  ],
  exports: [...SharedComponent]
})
export class SharedModule { }
