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

  private notif = new Subject<INotification>();
  // public notif$: Observable<INotification> = this.notif.asObservable();
  public notif$: Observable<INotification> = this.notif.asObservable();

  constructor() {
  }

  addMessageToQueue(message: string, type: 'success' | 'error') {
    const id = this.generateRandomId();
    this.notif.next({
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

  showErrorMessage(message: string) {
    this.addMessageToQueue(message, 'error');
  }

  clearNotification(notif: INotification) {
    this.notif.next({
      text: notif.text,
      id: notif.id
    })
  }

  retrieveMessageFromQueque() {
    return this.notif$
      .pipe(
        scan((messages, message) => {
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
