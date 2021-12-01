import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";
import { CalculatorComponent } from "src/app/calculator/components/calculator.component";

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
    SharedModule,
  ],
})
export class CalculatorModule {}
