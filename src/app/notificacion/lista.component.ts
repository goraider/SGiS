import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud/crud.service';
@Component({
  selector: 'notificacion-lista',
  templateUrl: './lista.component.html'
})

export class ListaComponent{
  tamano = document.body.clientHeight;

  constructor(private crudService: CrudService) {
  }
  leer_notificacion(modelo, id, i){
    let json:any = {id:id, leido:true};
    this.crudService.editar(id, json, "notificacion").subscribe(
        resultado => {  
            modelo[i].mensaje.leido = true;                            
        },
        error => {                
        }
    );
}
}