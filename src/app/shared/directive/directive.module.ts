import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HighlightedDirective } from "../directive/highlighted.directive";

@NgModule({
  declarations: [HighlightedDirective],
  imports: [CommonModule],
  exports: [HighlightedDirective],
})
export class DirectiveModule {}
