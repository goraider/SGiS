import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

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