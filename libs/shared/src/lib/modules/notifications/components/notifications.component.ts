import { Component, OnInit } from '@angular/core';
import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { INotification } from '../types/notifications.interface';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'ba-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  notifications$: Observable<INotification[]> =
    this.notificationService.notification$.pipe(
      scan((messages: Array<INotification>, message: INotification) => {
        if (message.type === 'clear') {
          console.log(messages);
          messages = messages.filter((m: INotification) => m.id !== message.id);
          console.log(messages);
          return [...messages];
        } else {
          return [...messages, message];
        }
      }, []),
    );

  constructor(private notificationService: NotificationService) {}

  clearNotification(notification: INotification): void {
    notification.type = 'clear';
    this.notificationService.clearNotification({ ...notification });
  }
}
