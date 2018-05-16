/**
* dependencias a utilizar
*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'paginacion',
  templateUrl: './paginacion.component.html'
})

/**
* Esta clase muestra la paginacion de los
* elementos a ordenar.
*/
export class PaginacionComponent implements OnInit {
  
  /**
  * Contiene los elementos
  * para acceder a los metodos del crud.
  * @type {any}
  */
  @Input() ctrl: any;
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor() { }

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
  }
}
