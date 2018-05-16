/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'permisos-lista',
  templateUrl: './lista.component.html'
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class ListaComponent{

  /**
  * Contiene variable que almacena el tamaño de la vista.
  * @type {string}
  */
  tamano;
  
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {

    /**
    * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
    * @type {any}
    */
    this.tamano = document.body.clientHeight;
  }
}