/**
* dependencias a utilizar
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';


import { Input } from '@angular/core/src/metadata/directives';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'app-diagnosticos-cie10',
  templateUrl: './diagnosticos-cie10.component.html'
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class GiagnosticosCie10Component implements OnInit {

    /**
    * Contiene el array de datos a consultar.
    * @type {array:any}
    */
    datos: any[] = [];
    
    /**
    * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
    * @type {any}
    */
    tamano = document.body.clientHeight;
    
    /**
    * Contiene el total de diagnosticos cie-10
    * mas frecuentes.
    * @type {array:any}
    */
    public top_cie10: any [] = [];

    /**
    * Contiene la bandaera para indicar si se cargo la lista
    * respecto a la consulta.
    * @type {boolean}
    */
    cargando: boolean = false;
    
    /**
    * Este método inicializa la carga de las dependencias 
    * que se necesitan para el funcionamiento del catalogo
    */
    constructor(private title: Title,
                private crudService: CrudService) { }
    /**
    * Este método inicializa la carga de la vista asociada junto los datos del formulario
    * @return void
    */
    ngOnInit() {

      this.listar('dashboard');
     
    }
    
    /**
    * Este método obtiene los datos de la ruta dashboard
    * @return void
    * @param url inicializa la ruta que se manda al servicio para
    * obtener los datos que se requieren.
    */
    listar(url) {
    
      this.cargando = true;
      this.crudService.lista_general(url).subscribe(
          resultado => {
              this.cargando = false;
  

              this.datos = resultado as any[];
     

              this.datos[2].topCie10.forEach(top_cie10 => {

                this.top_cie10.push(top_cie10); 


            });


 
              
  
          },
          error => {
  
          }
      );
    }
  
}