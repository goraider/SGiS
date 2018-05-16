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
  selector: 'app-porcentajes',
  templateUrl: './porcentajes.component.html'
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class PorcentajesComponent implements OnInit {
    
    /**
    * Contiene el array de datos a consultar.
    * @type {array:any}
    */
    datos: any[] = [];
    
    /**
    * Contiene el total de embarazos.
    * @type {array:any}
    */
    public embarazos: any [] = [];

    /**
    * Contiene el total de partos.
    * @type {array:any}
    */
    public partos: any [] = [];

    /**
    * Contiene el total de puerperio.
    * @type {array:any}
    */
    public puerperio: any [] = [];
    
    /**
    * Contiene el total del porcentaje de exito.
    * @type {array:any}
    */
    public porcentajeExito: any = '';

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

              this.datos = resultado as any[];

              this.embarazos.push(this.datos[8].embarazos[0]);
              this.partos.push(this.datos[9].partos[0]);
              this.puerperio.push(this.datos[10].puerperio[0]);
              this.porcentajeExito = this.datos[7].procentajeExitoAtencion;

              this.cargando = false;

          },
          error => {
  
          }
      );
    }
  
}