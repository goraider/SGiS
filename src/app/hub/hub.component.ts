/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})

/**
* Esta clase muestra los elementos que se mostraran en la vista
*/
export class HubComponent implements OnInit {
  
  /**
  * bandera para mostrar o no un elemento
  * @type {boolean}
  */
  mostrar: boolean = false;
  
  /**
  * array que contiene el menu a mostrar en el hub
  * @type {any}
  */
  menu:any[] = [];

  constructor() { }
  
  /**
  * Este método inicializa la carga de la vista asociada
  * @return void
  */
  ngOnInit() {
    this.menu = JSON.parse(localStorage.getItem("menu"));
  }

  /**
  * Este método inicializa la carga para mostrar o los elementos del hub
  * @return void
  */
  toggle() {
    this.mostrar = !this.mostrar;
  }

}
