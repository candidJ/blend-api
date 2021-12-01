export interface INotification {
  type?: "success" | "error" | "info" | "clear";
  text: string;
  id: number;
}

export type IClearNotification = Omit<INotification, "type">;
