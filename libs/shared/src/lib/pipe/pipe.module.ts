import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightedDirective } from '../directive/highlighted.directive';
import { DateTimeFormatPipe } from './date-time-format';
import { NumberFormatPipe } from './number-format';

const SharedComponent = [
  //   HighlightedDirective,
  DateTimeFormatPipe,
  NumberFormatPipe,
];

@NgModule({
  declarations: [...SharedComponent],
  imports: [CommonModule],
  exports: [...SharedComponent],
})
export class PipeModule {}
