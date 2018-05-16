/**
* dependencias a utilizar
*/
import { Pipe, PipeTransform } from '@angular/core';

/**
* selector del pipe a colocar.
*/
@Pipe({
  name: 'buscarModulo'
})

/**
* Esta clase inicializa lo que se vaya
* a filtrar.
*/
export class BuscarModuloPipe implements PipeTransform {

  /**
  * Este método busca elementos ya mostrados 
  * en el navegador, busca en los index del menu.
  * @param value valor a buscar
  * @param term cadena de busqueda.
  * @return void
  */
  transform(value: any, term: string = ''): any {
    return value.filter((item) => {
      let existe = item.titulo.toLowerCase().includes(term.toLowerCase());
      if (!existe) {
        let hay = false;
        if (item.lista) {
          for (let val of item.lista) {
            if (val.titulo.toLowerCase().includes(term.toLowerCase())) {
              hay = true;
            }
          }
        }
        existe = hay;
      }
      return existe;
    });
  }
}
