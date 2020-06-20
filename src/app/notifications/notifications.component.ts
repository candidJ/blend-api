import { Component, OnInit } from '@angular/core';
import { INotification, NotificationService } from './notification.service';
import { scan } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  // public notifications: Array<INotification> = [];
  public notifications$: Observable<INotification[]>;
  constructor(private notificationService: NotificationService) { }

  watchForNotifications() {
    // console.log("watch notifications");
    this.notifications$ = this.notificationService.retrieveMessageFromQueque()
    // .subscribe(notifications => {
    //   this.notifications = notifications;
    //   console.log(this.notifications, "Notifications");
    // })
  }

  clearNotification(notification: INotification): void {
    this.notificationService.clearNotification(notification);
  }

  ngOnInit(): void {
    this.watchForNotifications();
  }

}
