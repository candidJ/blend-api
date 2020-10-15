import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { INotification, NotificationService } from './notification.service';
import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent implements OnInit {

  public notifications$: Observable<INotification[]> =
    this.notificationService.notification$.pipe(
      scan((messages: INotification[] = [], message: INotification) => {
        if (message.type === 'success' || message.type === 'error' || message.type === 'info') {
          return [...messages, message];
        }
        else if (message.type === 'clear') {
          return messages.filter(data => data.id !== message.id);
        }
      })
    );

  constructor(private notificationService: NotificationService) { }

  clearNotification(notification: INotification): void {
    this.notificationService.clearNotification(notification);
  }

  ngOnInit(): void {
  }

}
