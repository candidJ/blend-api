import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconsModule } from "src/app/shared/modules/feather-icons/icons.module";
import { NotificationsComponent } from "src/app/shared/modules/notifications/components/notifications.component";
import { NotificationService } from "src/app/shared/modules/notifications/services/notification.service";

@NgModule({
  declarations: [NotificationsComponent],
  imports: [IconsModule, CommonModule],
  exports: [NotificationsComponent],
  providers: [NotificationService],
})
export class NotificationsModule {}
