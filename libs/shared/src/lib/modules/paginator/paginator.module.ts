import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '..';
import { PaginatorComponent } from './components/paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [IconsModule, CommonModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
