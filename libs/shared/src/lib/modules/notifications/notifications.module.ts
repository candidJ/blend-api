import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsComponent } from './components/notifications.component';
import { NotificationService } from './services/notification.service';
import { IconsModule } from '../feather-icons/icons.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, IconsModule],
  exports: [NotificationsComponent],
  providers: [NotificationService],
})
export class NotificationsModule {}
