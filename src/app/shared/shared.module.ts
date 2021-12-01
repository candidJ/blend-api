import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { GridComponent } from "./components/grid/grid.component";
import { MessageBoxComponent } from "./components/message-box/message-box.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { HighlightedDirective } from "./directive/highlighted.directive";
import { DateTimeFormatPipe } from "./pipe/date-time-format";
import { NumberFormatPipe } from "./pipe/number-format";

const SharedComponent = [
  PaginatorComponent,
  GridComponent,
  MessageBoxComponent,
  LoaderComponent,
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
