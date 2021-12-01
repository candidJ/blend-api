import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { NavbarComponent } from "src/app/shared/modules/navbar/components/navbar/navbar.component";
import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [IconsModule, RouterModule, CommonModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
