import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";
import { CalculatorComponent } from "src/app/calculator/components/calculator.component";
import { NumberFormatPipe } from "../shared/pipe/number-format";
import { PipeModule } from "../shared/pipe/pipe.module";

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule.forChild([
      {
        path: "",
        component: CalculatorComponent,
      },
    ]),
    PipeModule,
  ],
})
export class CalculatorModule {}
