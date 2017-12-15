import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarModulo'
})
export class BuscarModuloPipe implements PipeTransform {

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
