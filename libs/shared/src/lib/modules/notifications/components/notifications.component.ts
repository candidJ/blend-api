import { Component, inject } from '@angular/core';
import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  ClearTypeNotification,
  NotificationType,
} from '../types/notifications.interface';
import { NotificationService } from '../services/notification.service';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
  selector: 'ba-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: true,
  imports: [NgClass, AsyncPipe],
})
export class NotificationsComponent {
  #notificationService: NotificationService = inject(NotificationService);
  notifications$: Observable<NotificationType[]> =
    this.#notificationService.notification$.pipe(
      scan((messages: Array<NotificationType>, message: NotificationType) => {
        if (message.type === 'clear') {
          return messages.filter(
            (m: NotificationType) => m.randomID !== message.randomID,
          );
        } else {
          return [...messages, message];
        }
      }, []),
    );

  clearNotification(notification: NotificationType): void {
    const clearNotification: ClearTypeNotification = {
      type: 'clear',
      randomID: notification.randomID,
      textMessage: notification.textMessage,
    };
    this.#notificationService.clearNotification(clearNotification);
  }
}
