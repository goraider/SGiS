import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarPedido'
})
export class BuscarPedidoPipe implements PipeTransform {

    transform(value: any, term): any {
        if(value){ 
            return value.filter((item)=> {               
                var existe = item.folio.includes(term);
                if(!existe){
                    existe = item.personas.nombre.includes(term);
                }
                return existe;
            });
        }
        else return false;
    }
}