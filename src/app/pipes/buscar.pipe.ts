/**
* dependencias a utilizar
*/
import { Pipe, PipeTransform } from '@angular/core';

/**
* selector del pipe a colocar.
*/
@Pipe({
    name: 'buscar'
})

/**
* Esta clase inicializa lo que se vaya
* a filtrar.
*/
export class BuscarPipe implements PipeTransform {
    /**
    * Este método busca elementos.
    * @param value valor a buscar
    * @param term cadena de busqueda.
    * @return void
    */
    transform(value: any, term): any {
        if (value) {            
            return value.filter((item) => { 
                var existe = true;  
                if (term) {                            
                    existe = JSON.stringify(item).toLowerCase().indexOf(term.toLowerCase()) > -1; 
                }             
                return existe;
            });
        }
        else return true;
    }
}