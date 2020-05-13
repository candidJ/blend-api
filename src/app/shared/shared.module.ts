import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { GridComponent } from './components/grid/grid.component';
import { IconsModule } from './other/icons.module';
import { MessageBoxComponent } from './components/message-box/message-box.component';

const SharedComponent = [PaginatorComponent, GridComponent, MessageBoxComponent];

@NgModule({
  declarations: [...SharedComponent],
  imports: [
    CommonModule,
    IconsModule
  ],
  exports: [...SharedComponent, IconsModule]
})
export class SharedModule { }
