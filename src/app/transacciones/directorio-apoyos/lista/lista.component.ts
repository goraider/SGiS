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
  selector: 'directorio-apoyos-lista',
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

  /**
  * Contiene el valor inicial
  * de la Unidad Medica del LocalStorage.
  * @type {any}
  */
  directorio_apoyos_clue = JSON.parse(localStorage.getItem("clues"));

  /**
  * Contiene el valor de la URL
  * concatenando el municipio que traiga del LocalStorage
  * respecto a la Unidad Medica Correspondiente.
  * @type {any}
  */
  URLdirectorio_apoyos_clue: any = this.directorio_apoyos_clue.municipios_id;



  mostrarDirectorioMunicipio(e){
    
    this.directorio_apoyos_clue = JSON.parse(localStorage.getItem("clues"));

    this.URLdirectorio_apoyos_clue = this.directorio_apoyos_clue.municipios_id;
  }
  
}
