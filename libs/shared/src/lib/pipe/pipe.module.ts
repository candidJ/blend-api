import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateTimeFormatPipe } from './date-time-format';
import { NumberFormatPipe } from './number-format';

const Components = [DateTimeFormatPipe, NumberFormatPipe];

@NgModule({
  declarations: [...Components],
  imports: [CommonModule],
  exports: [...Components],
})
export class PipeModule {}
