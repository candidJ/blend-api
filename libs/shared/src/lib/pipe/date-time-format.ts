import { Pipe, PipeTransform } from '@angular/core';
import { DateTimeUtils } from '../helpers/date-time';

@Pipe({
  name: 'dateTimeFormatPipe',
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(date: 'YYYY-MM-DD hh:mm:ss' | Date, format: string): string {
    if (date) {
      return DateTimeUtils.formatDate(date, format);
    }
    return new Date().toDateString();
  }
}
