/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { ListarComponent } from '../../../crud/listar.component';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'estado-fuerza-lista',
  templateUrl: './lista.component.html',
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
  * Contiene los datos del usuario que esta en el LocalStorage.
  * @type {any}
  */
  usuario = JSON.parse(localStorage.getItem("usuario"));
}
