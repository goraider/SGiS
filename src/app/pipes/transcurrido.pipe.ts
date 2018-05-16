/**
* dependencias a utilizar
*/
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
* selector del pipe a colocar.
*/
@Pipe({ name: 'transcurrido'})

/**
* Esta clase inicializa lo que se vaya
* a filtrar.
*/
export class TranscurridoPipe implements PipeTransform {
    
    /**
    * Este método realizar un tiempo transcurrido.
    * @param value arreglo que tiene el contenido
    * @param field cadena escrita a evaluar.
    * @return void
    */
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