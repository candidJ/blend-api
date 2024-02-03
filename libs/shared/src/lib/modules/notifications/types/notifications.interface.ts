interface NotificationConfig {
  textMessage: string;
  randomID: string;
}

export interface ClearTypeNotification extends NotificationConfig {
  type: 'clear';
}

export interface SuccessTypeNotification extends NotificationConfig {
  type: 'success';
}

export interface InfoTypeNotification extends NotificationConfig {
  type: 'info';
}

export interface ErrorTypeNotification extends NotificationConfig {
  type: 'error';
}

export type ShowNotification =
  | SuccessTypeNotification
  | ErrorTypeNotification
  | InfoTypeNotification;

export type NotificationType = ClearTypeNotification | ShowNotification;
