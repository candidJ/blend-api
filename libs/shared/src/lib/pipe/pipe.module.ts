import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateTimeFormatPipe } from './date-time-format';
import { NumberFormatPipe } from './number-format';

const Components = [DateTimeFormatPipe, NumberFormatPipe];

@NgModule({
  imports: [CommonModule, ...Components],
  exports: [...Components],
})
export class PipeModule {}
