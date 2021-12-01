import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";
import { MessageBoxComponent } from "src/app/shared/modules/message-box/components/message-box.component";

@NgModule({
  declarations: [MessageBoxComponent],
  imports: [IconsModule, CommonModule],
  exports: [MessageBoxComponent],
})
export class MessageBoxModule {}
