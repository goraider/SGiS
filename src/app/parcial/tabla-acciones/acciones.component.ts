/**
* dependencias a utilizar
*/
import { Component, OnInit, Input } from '@angular/core';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'tabla-acciones',
  templateUrl: './acciones.component.html'
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class TablaAccionesComponent implements OnInit {

  /**
  * Contiene los elementos
  * para acceder a los metodos del crud.
  * @type {any}
  */
  @Input() item: any;
  
  /**
  * Contiene el indice del elemento
  * @type {number}
  */
  @Input() index: number;
  
  /**
  * Contiene los elementos
  * para acceder a los metodos del crud.
  * @type {any}
  */
  @Input() ctrl: any;
  
  /**
  * Contiene la nueva url cuando se edita un ingreso.
  * @type {string}
  */
  url_editar: string = '';

  /**
  * Contiene la url a imprimir
  * @type {string}
  */  
  url_imprimir: string = '';

  /**
  * Contiene los permisos del usuario,
  * del LocalStorage.
  * @type {string}
  */
  permisos = JSON.parse(localStorage.getItem("permisos"));

  /**
  * se almacena la posicion de la url.
  * @type {any}
  */
  carpeta;

  /**
  * almacena la posicion de la url del modulo.
  * @type {any}
  */
  modulo;

  /**
  * almacena el controlador que se este trabajando.
  * @type {any}
  */
  controlador;

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    var url = location.href.split("/");
    this.carpeta = url[4];
    this.modulo = url[5];

    var ctrl = "-" + this.modulo;
    this.controlador = ctrl.toLowerCase()
        // remplazar _ o - por espacios
        .replace(/[-_]+/g, ' ')
        // quitar numeros
        .replace(/[^\w\s]/g, '')
        // cambiar a mayusculas el primer caracter despues de un espacio
        .replace(/ (.)/g, function($1) {
            return $1.toUpperCase(); })
        // quitar espacios y agregar controller
        .replace(/ /g, '') + "Controller";
    
    this.url_editar = '/' + this.carpeta + '/' + this.modulo + '/editar/' + this.item.id;
    this.url_imprimir = '/' + this.carpeta + '/' + this.modulo + '/ver/' + this.item.id;
  }
}