import { Pipe, PipeTransform } from '@angular/core'
import { DateTimeUtils } from '../helpers/date-time';

@Pipe({
    name: 'dateTimeFormatPipe'
})
export class DateTimeFormatPipe implements PipeTransform {
    transform(date: any, format: string) {
        if (date) {
            return DateTimeUtils.formatDate(date, format);
        }
    }

}