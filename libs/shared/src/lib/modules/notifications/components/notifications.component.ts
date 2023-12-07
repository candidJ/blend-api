import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { INotification } from '../types/notifications.interface';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'ba-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
  public notifications$: Observable<INotification[]>;

  constructor(private notificationService: NotificationService) {}

  clearNotification(notification: INotification): void {
    this.notificationService.clearNotification(notification);
  }

  ngOnInit(): void {
    this.notifications$ = this.notificationService.notification$.pipe(
      scan((messages: Array<INotification>, message: INotification) => {
        if (message.type === 'clear') {
          return messages.filter((data) => data.id !== message.id);
        } else {
          return [...messages, message];
        }
      }, [])
    );
  }
}
