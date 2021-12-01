import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HighlightedDirective } from "./directive/highlighted.directive";
import { DateTimeFormatPipe } from "./pipe/date-time-format";
import { NumberFormatPipe } from "./pipe/number-format";

const SharedComponent = [
  HighlightedDirective,
  DateTimeFormatPipe,
  NumberFormatPipe,
];

@NgModule({
  declarations: [...SharedComponent],
  imports: [CommonModule],
  exports: [...SharedComponent],
})
export class SharedModule {}
