import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface INotification {
  type?: 'success' | 'error';
  text: string;
  id: number;
}

export type IClearNotification = Omit<INotification, 'type'>;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationPublisher = new Subject<INotification>();
  // public notif$: Observable<INotification> = this.notificationPublisher.asObservable();
  public notif$: Observable<INotification> = this.notificationPublisher.asObservable();

  constructor() {
  }

  addMessageToQueue(message: string, type: 'success' | 'error'): void {
    const id = this.generateRandomId();
    this.notificationPublisher.next({
      text: message,
      type: type,
      id
    });

    setTimeout(() => {
      this.clearNotification({ text: message, id })
    }, 5000);
  }


  showSuccessMessage(message: string): void {
    this.addMessageToQueue(message, 'success');
  }

  showErrorMessage(message: string): void {
    this.addMessageToQueue(message, 'error');
  }

  clearNotification(notification: INotification): void {
    this.notificationPublisher.next({
      text: notification.text,
      id: notification.id
    })
  }

  retrieveMessageFromQueque(): Observable<INotification[]> {
    return this.notif$
      .pipe(
        scan((messages: any[], message: INotification) => {
          console.log("message", message);
          if (message.type === 'success' || message.type === 'error') {
            return [...messages, message];
          }
          else if (message.type === 'clear') {
            return messages.filter(data => data.id !== message.id);
          }
        }, [])
      )
  }

  generateRandomId(): number {
    return Math.round(Math.random() * 10000);
  }
}
