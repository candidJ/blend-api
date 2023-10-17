import * as moment from 'moment';

export class DateTimeUtils {
  static formatDate(date: "YYYY-MM-DD hh:mm:ss" | Date, format: string): string {
    return moment(date).format(format);
  }
}
