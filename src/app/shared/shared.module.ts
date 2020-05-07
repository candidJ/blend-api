import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { GridComponent } from './components/grid/grid.component';
import { IconsModule } from './other/icons.module';

const SharedComponent = [PaginatorComponent, GridComponent];

@NgModule({
  declarations: [...SharedComponent],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [...SharedComponent, IconsModule]
})
export class SharedModule { }
