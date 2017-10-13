import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'transcurrido'})

export class TranscurridoPipe implements PipeTransform {
    transform(value: Array<any>, field: string): Array<any> {
        
        if (value) {
            moment.locale("es_MX");
            var hoy = moment(new Date(), "YYYY-MM-DD HH:mm:ss");   
            var fecha = moment(new Date(value.toString()), "YYYY-MM-DD HH:mm:ss");                   
            let diferencia:any = fecha.from(hoy);
            
            return diferencia;
        }
        else return;
    }
}