/**
* dependencias a utilizar
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { CrudService } from '../crud/crud.service';
import { forEach } from '@angular/router/src/utils/collection';

import { Input } from '@angular/core/src/metadata/directives';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML.
* en el archivo "dashboard.component.html" se encuentran todas las graficas y/o tableros a mostrar.
*/
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  /**
  * Contiene los datos del usuario.
  * @type {any}
  */
  usuario: any = {}
  
  /**
  * Contiene la información de la Unidad Medica.
  * @type {any}
  */
  public clues;

  /**
  * Contiene los datos del menu.
  * @type {any}
  */
  public menu;
  
  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private title: Title, private crudService: CrudService,) {}

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {

    this.title.setTitle("Dashboard");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    var clues = localStorage.getItem("clues");

    var abrir = false;
    if(clues == '')
      abrir = true;

    if(abrir)
      document.getElementById("cambiar_clues").click();
  }


}
