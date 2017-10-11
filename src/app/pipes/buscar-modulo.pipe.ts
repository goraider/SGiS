import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarModulo'
})
export class BuscarModuloPipe implements PipeTransform {

  transform(value: any, term): any {
    return value.filter((item)=> {           
       var existe = item.titulo.toLowerCase().includes(term.toLowerCase());
       if(!existe){
         var hay = false;
         if(item.lista){
          for(let val of item.lista){
            if(val.titulo.toLowerCase().includes(term.toLowerCase()))
              hay = true;
          }
         }
        existe = hay;
       }
       return existe;
    });
  }
}
