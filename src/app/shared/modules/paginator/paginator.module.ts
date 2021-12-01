import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";
import { PaginatorComponent } from "src/app/shared/modules/paginator/components/paginator.component";

@NgModule({
  declarations: [PaginatorComponent],
  imports: [IconsModule, CommonModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
