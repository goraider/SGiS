/**
* dependencias a utilizar
*/
import { Pipe, PipeTransform } from '@angular/core';

/**
* selector del pipe a colocar.
*/
@Pipe({
    name: "orderBy"
})

/**
* Esta clase inicializa lo que se vaya
* a filtrar.
*/
export class OrderByPipe implements PipeTransform {
    
    /**
    * Este método ordena elementos.
    * @param array arreglo de contenido si existe un valor
    * @param field cadena escrita a ordenar
    * @return void
    */
    transform(array: any[], field: string): any[] {
        if(array){
            array.sort((a: any, b: any) => {
                if (a[field] < b[field]) {
                    return -1;
                } else if (a[field] > b[field]) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return array;        
    }
}