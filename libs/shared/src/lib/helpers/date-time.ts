import {formatDate} from '@angular/common';

export class DateTimeUtils {
  static formatDate(date: "YYYY-MM-DD hh:mm:ss" | Date, format: string): string {
    return formatDate(date, format, 'en-US');
  }
}
