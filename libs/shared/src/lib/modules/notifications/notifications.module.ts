import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsComponent } from './components/notifications.component';
import { IconsModule } from '../feather-icons/icons.module';

@NgModule({
  imports: [CommonModule, IconsModule, NotificationsComponent],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}
