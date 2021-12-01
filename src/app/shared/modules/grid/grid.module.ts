import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { GridComponent } from "src/app/shared/modules/grid/components/grid.component";

@NgModule({
  declarations: [GridComponent],
  imports: [CommonModule],
  exports: [GridComponent],
})
export class GridModule {}
