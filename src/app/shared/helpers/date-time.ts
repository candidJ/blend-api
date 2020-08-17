import * as moment from 'moment';

export class DateTimeUtils {

    static formatDate(date: any, format: string) {
        return moment(date).format(format);
    }

}
