import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '..';
import { NotificationsComponent } from './components/notifications.component';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [IconsModule, CommonModule],
  exports: [NotificationsComponent],
  providers: [NotificationService],
})
export class NotificationsModule {}
