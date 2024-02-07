import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import {
  ClearTypeNotification,
  ErrorTypeNotification,
  InfoTypeNotification,
  NotificationType,
  ShowNotification,
  SuccessTypeNotification,
} from '../types/notifications.interface';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  #notificationPublisher = new Subject<NotificationType>();
  notification$: Observable<NotificationType> =
    this.#notificationPublisher.asObservable();

  showSuccessMessage(textMessage: string): void {
    this.addMessageToQueue<SuccessTypeNotification>({
      textMessage,
      type: 'success',
      randomID: window.crypto.randomUUID(),
    });
  }

  showGeneralInfo(textMessage: string): void {
    this.addMessageToQueue<InfoTypeNotification>({
      textMessage,
      type: 'info',
      randomID: window.crypto.randomUUID(),
    });
  }

  showErrorMessage(textMessage: string): void {
    this.addMessageToQueue<ErrorTypeNotification>({
      textMessage,
      type: 'error',
      randomID: window.crypto.randomUUID(),
    });
  }

  clearNotification(notification: ClearTypeNotification): void {
    this.#notificationPublisher.next(notification);
  }

  private addMessageToQueue<T extends ShowNotification>(
    notificationConfig: T,
  ): void {
    const { textMessage, randomID } = notificationConfig;
    this.#notificationPublisher.next(notificationConfig);

    setTimeout(() => {
      this.clearNotification({ textMessage, randomID, type: 'clear' });
    }, 5000);
  }
}
