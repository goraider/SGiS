import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {

    transform(value: any, term): any {
        if (value) {
            return moment(value).format("DD/MM/YYYY h:mm A");
        }
        else return "00/00/0000 0:00 ";
    }
}