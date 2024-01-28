export interface INotification {
  type: 'success' | 'error' | 'info' | 'clear';
  text: string;
  id: number;
}
