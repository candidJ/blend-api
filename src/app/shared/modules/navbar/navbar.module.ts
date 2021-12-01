import { NgModule } from "@angular/core";

import { NavbarComponent } from "src/app/shared/modules/navbar/components/navbar/navbar.component";
import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [IconsModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
