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
  selector: 'tipos-items-lista',
  templateUrl: './lista.component.html'
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class ListaComponent{
  
  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;
}
