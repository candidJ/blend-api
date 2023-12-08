import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { INotification } from '../types/notifications.interface';

@Injectable()
export class NotificationService {
  private notificationPublisher = new Subject<INotification>();
  notification$: Observable<INotification> =
    this.notificationPublisher.asObservable();

  constructor() {}

  showSuccessMessage(message: string): void {
    this.addMessageToQueue(message, 'success');
  }

  showGeneralInfo(message: string): void {
    this.addMessageToQueue(message, 'info');
  }

  showErrorMessage(message: string): void {
    this.addMessageToQueue(message, 'error');
  }

  clearNotification(notification: INotification): void {
    this.notificationPublisher.next(notification);
  }

  private generateRandomId(): number {
    return Math.round(Math.random() * 100000);
  }

  private addMessageToQueue(
    message: string,
    type: 'success' | 'error' | 'info'
  ): void {
    const id = this.generateRandomId();
    this.notificationPublisher.next({
      text: message,
      type,
      id
    });

    setTimeout(() => {
      this.clearNotification({ text: message, id, type: 'clear' });
    }, 5000);
  }
}
