/**
* dependencias a utilizar
*/
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
* selector del pipe a colocar.
*/
@Pipe({
    name: 'formatoFecha'
})

/**
* Esta clase inicializa lo que se vaya
* a filtrar.
*/
export class FormatoFechaPipe implements PipeTransform {

    /**
    * Este método busca elementos.
    * @param value contenido a converir
    * @param term cadena escrita
    * @return void
    */
    transform(value: any, term): any {
        if (value) {
            return moment(value).format("DD/MM/YYYY h:mm A");
        }
        else return "00/00/0000 0:00 ";
    }
}