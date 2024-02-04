import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '..';
import { PaginatorComponent } from './components/paginator.component';

@NgModule({
  imports: [IconsModule, CommonModule, PaginatorComponent],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
