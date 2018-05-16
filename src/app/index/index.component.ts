/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { BuscarModuloPipe } from '../pipes/buscar-modulo.pipe';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

/**
* Esta clase muestra la lista de los elementos
* compuestos por la vista index
*/
export class IndexComponent implements OnInit {
  
  /**
  * Contiene los datos
  * del usuario.
  * @type {any}
  */
  usuario: any = {};

  /**
  * Contiene la bandera para activar
  * la busqueda.
  * @type {string}
  */
  busqueda: string;

  /**
  * Contiene la bandera para activar
  * la busqueda.
  * @type {string}
  */
  tiene = 0;

  /**
  * Contiene el array con el
  * menu.
  * @type {any}
  */
  menu: any[] = [];

  /**
  * Contiene el modulo.
  * @type {string}
  */
  modulo: string;

  /**
  * almacena el modulo actual.
  * @type {string}
  */ 
  modulo_actual: string;

  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private title: Title) { }
  
  /**
  * Este método inicializa la carga de la vista asociada
  * @return void
  */
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    let menu = JSON.parse(localStorage.getItem('menu'));

    let url = location.href.split('/');
    this.modulo = url[4];
    this.modulo_actual = this.modulo.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });

    for (let item of menu) {
      if (item.path.indexOf(this.modulo_actual.toLowerCase()) > -1) {
        if (this.menu.indexOf(item) < 0) {
          this.menu.push(item);
        }
      }
    }
  }

  tiene_hijos(){
    this.tiene++;
  }

}
