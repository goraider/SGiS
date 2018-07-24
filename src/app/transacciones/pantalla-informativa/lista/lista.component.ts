/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { CrudService } from '../../../crud/crud.service';

import { Mensaje } from '../../../mensaje';

import * as moment from 'moment';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'pantalla-informativa',
  templateUrl: './lista.component.html',
  styleUrls:["./lista.component.css"]
})


/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
export class ListaComponent {

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private crudService: CrudService,
              private notificacion: NotificationsService,
              private location: Location,
              ){}
  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;
  
  /**
  * Contiene los datos del formulario que comunican a la consulta del servicio.
  * @type {any}
  */
  dato: any[] = [];

  /**
  * Bandera que tiene un elemento si esta cargada la consulta con el servicio.
  * @type {boolean}
  */
  cargando: boolean = false;

  /**
  * Bandera que tiene un elemento si esta cargada la consulta con el servicio.
  * @type {boolean}
  */
  mensajeResponse: Mensaje = new Mensaje(true);

  /**
  * Bandera que tiene la ultima peticion a la lista.
  * @type {boolean}
  */
  ultimaPeticion: any;
  
  /**
  * Inicializacion de la pagina actual.
  * @type {number}
  */
  paginaActual = 1;

  /**
  * Resultados por pagina de la lista
  * @type {number}
  */
  resultadosPorPagina = 10;

  /**
  * El total de los registros almacenado al realizar la consulta.
  * @type {number}
  */
  total = 0;
  
  /**
  * Paginas totales que se calcula en la consulta de la lista.
  * @type {number}
  */
  paginasTotales = 0;

  /**
  * Los indices por pagina que se mostraran.
  * @type {Array: number}
  */
  indicePaginas: number[] = [];

  /**
  * Bandera que tiene la activada o no la busqueda.
  * @type {boolean}
  */
  busquedaActivada: boolean = false;
  
  /**
  * El resultado de los registros por pagina buscado.
  * @type {number}
  */
  resultadosPorPaginaBusqueda = 6;

  /**
  * El total de los registros almacenado al realizar la consulta en la busqueda.
  * @type {number}
  */
  totalBusqueda = 0;

  /**
  * contador que se ejecuta en automatico con el setInterval en el ngOninit
  * @type {number}
  */
  cont = 0;

  /**
  * Opciones de la pocision del mensaje al cargar la lista, Opcional.
  * @type {object}
  */
  public options = {
    position: ["bottom", "left"],
    timeOut: 1000,
    lastOnBottom: true
  };
  /**
  * titulo a mostrar en el mensaje de la lista.
  * @type {number}
  */
  titulo:any = "Sala de Espera"


  fecha_actual: any = moment().format('YYYY-MM-D h:mm:ss');

  fecha_temporal:any = '2018-05-10 8:20:34';

  horaReal:any = '';

  fechasIncidencia:any = '';

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void 
  */
  ngOnInit(){




    this.listar(1);
       
       /**
       * Este método ejecuta en automatico los metodos en la lista para
       * realizar siguiente o regresar al principio bajo un intervalo de tiempo.
       * @return void
       */
        setInterval(() => {
          this.cont++;

          if(this.paginasTotales > 1 ){
            this.paginaSiguiente();

                if(this.paginaActual == this.paginasTotales){
                    setTimeout(() => {
                        this.paginaActual = 1;
                        this.reset_paginas();
                    }, 10000);
                }
          }
          
        }, 20000);
      
  }

  /**
  * Este método cambia el resultado de las paginas para mostrar por pagina
  * @return void
  */
  cambiar_filas_pagina(totalPorPagina: HTMLInputElement){
    if(this.busquedaActivada){
        this.resultadosPorPaginaBusqueda = parseInt(totalPorPagina.value);
        var term = <HTMLInputElement> document.getElementById("search-box");
        //this.listarBusqueda(term.value, this.paginaActual);
    }else{
        this.resultadosPorPagina = parseInt(totalPorPagina.value);
        this.listar(this.paginaActual);
    }
  }

  /**
  * Este método es intermediario para el listado
  * @return void
  */
  mostrarLista(pagina: number): void {
    if(this.busquedaActivada){
        var term = <HTMLInputElement> document.getElementById("search-box");
        //this.listarBusqueda(term.value, pagina);
    }else{
        this.listar(pagina);
    }        
  }
  
  /**
  * Este método es intermediario para el listado incrementa en uno la paginación
  * @return void
  */
  paginaSiguiente(): void {
    if(this.total > 1){
        this.listar(this.paginaActual + 1);
    }
    
  }
  
  /**
  * Este método resetea el listado a la primer pagina
  * @return void
  */
  reset_paginas(){
    this.listar(1);
  }
  
  /**
  * Este método es intermediario para el listado decrementa en uno la paginación
  * @return void
  */
  paginaAnterior(): void {
      if(this.paginaActual > 1){
          if(this.busquedaActivada){
              var term = <HTMLInputElement> document.getElementById("search-box");
              //this.listarBusqueda(term.value, this.paginaActualBusqueda - 1);
          }else{
              this.listar(this.paginaActual - 1);
          }
      }   
        
  }

  /**
  * Este método obtiene una lista de elementos de la api 
  * @param pagina  inicio de la página para mostrar resultados   
  * @return void created_at:"2018-04-10 03:42:34"
  */
  listar(pagina: number): void {
    this.paginaActual = pagina;

    this.cargando = true;
    this.crudService.lista(pagina, this.resultadosPorPagina, "pantalla-informativa").subscribe(
        resultado => {

            this.cargando = false;


            
            // resultado.data.forEach(element => {

            //     //console.log(resultado.data);

            //     var horaFecha = moment(element.created_at).format('h');

            //     var res = parseInt(horaFecha) - 6 + 1;
    
            //     this.horaReal = moment(element.created_at).format('YYYY-MM-D'+" "+res+':mm:ss A');


            //     element.created_at = this.horaReal;
    
                
            // });




            this.dato = resultado.data as any[];


            // console.log(moment(this.fecha_actual).diff(fecha, 'hours'));
            // moment(fecha).subtract('days', 1).hours(6).calendar();
            // console.log(fecha);

            

            this.total = resultado.total | 0;

            this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

    

            this.indicePaginas = [];
            for (let i = 0; i < this.paginasTotales; i++) {
                this.indicePaginas.push(i + 1);
            }

        

            // this.mensajeResponse.mostrar = true;
            // this.mensajeResponse.texto = "lista cargada";
            // this.mensajeResponse.clase = "success";
            // this.mensaje(2);
        },
        error => {
            this.cargando = false;
            this.mensajeResponse.mostrar = true;
            this.ultimaPeticion = this.listar;
            try {
                
                let e = error.json();
                if (error.status == 401) {
                    this.mensajeResponse.texto = "No tiene permiso para hacer esta operación.";
                    this.mensajeResponse.clase = "danger";
                    this.mensaje(2);
                }
            } catch (e) {
                if (error.status == 500) {
                    this.mensajeResponse.texto = "500 (Error interno del servidor)";
                } else {
                    this.mensajeResponse.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir. 8";
                }
                this.mensajeResponse.clase = "danger";
                this.mensaje(2);
            }

        }
    );
  }

  /**
  * Este método muestra los mensajes resultantes de los llamados de la api
  * @param cuentaAtras numero de segundo a esperar para que el mensaje desaparezca solo
  * @param posicion  array de posicion [vertical, horizontal]
  * @return void
  */
  mensaje(cuentaAtras: number = 6, posicion: any[] = ["bottom", "left"]): void {
        var objeto = {
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: this.mensajeResponse.texto.length
        };

        this.options = {
            position: posicion,
            timeOut: cuentaAtras * 1000,
            lastOnBottom: true
        };
        if (this.mensajeResponse.titulo == '')
            this.mensajeResponse.titulo = this.titulo;

        if (this.mensajeResponse.clase == 'alert')
            this.notificacion.alert(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

        if (this.mensajeResponse.clase == 'success')
            this.notificacion.success(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

        if (this.mensajeResponse.clase == 'info')
            this.notificacion.info(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

        if (this.mensajeResponse.clase == 'warning' || this.mensajeResponse.clase == 'warn')
            this.notificacion.warn(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

        if (this.mensajeResponse.clase == 'error' || this.mensajeResponse.clase == 'danger')
            this.notificacion.error(this.mensajeResponse.titulo, this.mensajeResponse.texto, objeto);

    }

  

}