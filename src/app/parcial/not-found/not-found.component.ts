/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

/**
* Esta clase muestra los metodos
* y variables del componente.
*/
export class NotFoundComponent implements OnInit {

  /**
  * Contiene los datos del usuario que esta en el LocalStorage.
  * @type {any}
  */
  usuario: any = JSON.parse(localStorage.getItem("usuario"));
  
  /**
  * Contiene el menu actual donde
  * se este hubicado.
  * @type {any}
  */
  menuactual;

  /**
  * Contiene la variable activa.
  * @type {any}
  */
  activar;
  
  /**
  * Contiene el menu aside a mostrar.
  * @type {any}
  */
  mostrarMenuAside: boolean = false;
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor() { }
  
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {}

  /**
  * Este método oculta el menu aside.
  * @return void
  */
  toggleMenuAside() {
    this.mostrarMenuAside = !this.mostrarMenuAside;
  }

}
