/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud/crud.service';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'notificacion-lista',
  templateUrl: './lista.component.html'
})

/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
export class ListaComponent{

  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del modulo
  * que conectan con la API de pusher y el archivo Environments
  */
  constructor(private crudService: CrudService) {}

  /**
  * Método para listar Unidades Medicas en el Autocomplet
  * @param modelo contiene los datos del modelo a enviar
  * @param id contiene id del mensaje a enviar.
  * @param i contiene el indice para marcar si esta o no leido para
  * mostrarlo en la vista.
  */
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