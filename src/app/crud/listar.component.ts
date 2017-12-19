/**
* <h1>Listar Component</h1>
*<p>
* El componente listar se encarga obtener una lista de elementos
* de la api con los parametros y filtros que se especifiquen, 
* interactua con el servicio crud
* </p>
*
* @author  Eliecer Ramirez Esquinca
* @version 1.0
* @since   2017-05-08 
*/

import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { AuthService } from '../auth.service';
import { CrudService } from './crud.service';
import { environment } from '../../environments/environment';

import { Mensaje } from '../mensaje';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'listar',
    template: `<simple-notifications [options]="options"></simple-notifications>
    <div class="modal" id="confirmarEliminar">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
            <p class="modal-card-title"><i class="fa fa-warning"></i> Alerta</p>
            <button class="delete" (click)="cancelarModal()"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <h1>¿Esta seguro de eliminar el elemento?</h1>
                    <p>Ya no se podra recuperar la información</p>
                </div>
            </section>
            <footer class="modal-card-foot">
            <a class="button is-success" (click)="borrar(borrarItem, borrarIndex)" [ngClass]="{'is-loading': borrarCargando}">Continuar</a>
            <a class="button" (click)="cancelarModal()">Cancelar</a>
            </footer>
        </div>
    </div>`
})

export class ListarComponent implements OnInit {

    cargando: boolean = false;
    borrarCargando: boolean = false;
    // # SECCION: Esta sección es para mostrar mensajes

    ultimaPeticion: any;
    // # FIN SECCION

    // # SECCION: Lista de dato

    //dato es el modelo general que contiene los datos del formulario
    dato: any[] = [];
    respuesta: any[] = [];
    mensajeResponse: Mensaje = new Mensaje(true);

    private paginaActual = 1;
    private resultadosPorPagina = 15;
    private total = 0;
    private paginasTotales = 0;
    private indicePaginas: number[] = []
    // # FIN SECCION

    // # SECCION: Resultados de búsqueda
    private ultimoTerminoBuscado = "";
    private terminosBusqueda = new Subject<string>();
    private resultadosBusqueda: any[] = [];
    private busquedaActivada: boolean = false;
    private paginaActualBusqueda = 1;
    private resultadosPorPaginaBusqueda = 15;
    private totalBusqueda = 0;
    private paginasTotalesBusqueda = 0;
    private indicePaginasBusqueda: number[] = [];
    private tipo_grid;
    // # FIN SECCION
    private API_PATH = environment.API_PATH;

    private permisos = JSON.parse(localStorage.getItem("permisos"));
    private configuracion = JSON.parse(localStorage.getItem("configuracion"));

    @Input() URL: string;
    @Input() titulo: string;

    /**
     * Este método inicializa la carga de las dependencias 
     * que se necesitan para el funcionamiento del modulo
     */
    constructor(private title: Title, private crudService: CrudService, private authService: AuthService, private notificacion: NotificationsService) {

    }

    /**
     * Este método se dispara al iniciar la carga de la vista asociada
     * en este caso se utiliza para cargar la lista inicial
     * @return void
     */
    ngOnInit() {
        this.listar(1);

        this.title.setTitle(this.titulo);
        var self = this;
        this.tipo_grid = localStorage.getItem('tipo_grid') == "false" ? false : true;
       
        var busquedaSubject = this.terminosBusqueda
            .debounceTime(300) // Esperamos 300 ms pausando eventos
            .distinctUntilChanged() // Ignorar si la busqueda es la misma que la ultima
            .switchMap((term: string) => {

                this.busquedaActivada = term != "" ? true : false;

                this.ultimoTerminoBuscado = term;
                this.paginaActualBusqueda = 1;
                this.cargando = true;
                return term ? this.crudService.buscar(term, this.paginaActualBusqueda, this.resultadosPorPaginaBusqueda, this.URL) : Observable.of<any>({ data: [] })
            }


            ).catch(function handleError(error) {

                self.cargando = false;
                self.mensajeResponse.mostrar = true;
                self.ultimaPeticion = function () { self.listarBusqueda(self.ultimoTerminoBuscado, self.paginaActualBusqueda); };//OJO
                try {
                    let e = error.json();
                    if (error.status == 401) {
                        self.mensajeResponse.texto = "No tiene permiso para hacer esta operación.";
                        self.mensajeResponse.clase = "danger";
                        this.mensaje(2);
                    }
                } catch (e) {
                    if (error.status == 500) {
                        self.mensajeResponse.texto = "500 (Error interno del servidor)";
                    } else {
                        self.mensajeResponse.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir. 6";
                    }
                    self.mensajeResponse.clase = "danger";
                    this.mensaje(2);
                }
                // Devolvemos el subject porque si no se detiene el funcionamiento del stream 
                return busquedaSubject

            })

        busquedaSubject.subscribe(
            resultado => {
                this.cargando = false;
                this.resultadosBusqueda = this.dato;
                this.dato = resultado.data as any[];
                this.totalBusqueda = resultado.total | 0;
                this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

                this.indicePaginasBusqueda = [];
                for (let i = 0; i < this.paginasTotalesBusqueda; i++) {
                    this.indicePaginasBusqueda.push(i + 1);
                }
            }

        );
    }
    cambiar_filas_pagina(totalPorPagina: HTMLInputElement){
        if(this.busquedaActivada){
            this.resultadosPorPaginaBusqueda = parseInt(totalPorPagina.value);
            var term = <HTMLInputElement> document.getElementById("search-box");
            this.listarBusqueda(term.value, this.paginaActual);
        }else{
            this.resultadosPorPagina = parseInt(totalPorPagina.value);
            this.listar(this.paginaActual);
        }
    }

    cambiar_vista = function () {
        this.tipo_grid = !this.tipo_grid;
        localStorage.setItem('tipo_grid', this.tipo_grid);        
        this.listar(this.paginaActual);
    }

    /**
     * Este método es un intermediario para realizar la busqueda en
     * api con los filtros que se especifiquen en la vista
     * @param term contiene las palabras de busqueda     
     * @return void
     */
    buscar(term: string): void {
        this.terminosBusqueda.next(term);
    }

    cerrar_busqueda(buscar: HTMLInputElement) {
        this.busquedaActivada = false;        
        buscar.value = null;
        this.dato = this.resultadosBusqueda;
        this.resultadosBusqueda = [];
        if(this.dato.length <= 0)
            this.listar(this.paginaActual);
    }
    /**
     * Este método obtiene una lista de elementos de la
     * api con los filtros que se especifiquen en la vista
     * @param term contiene las palabras de busqueda
     * @param pagina  inicio de la página para mostrar resultados   
     * @return void
     */
    listarBusqueda(term: string, pagina: number): void {
        this.paginaActualBusqueda = pagina;

        this.cargando = true;
        this.crudService.buscar(term, pagina, this.resultadosPorPaginaBusqueda, this.URL).subscribe(
            resultado => {
                this.cargando = false;

                this.resultadosBusqueda = this.dato;
                this.dato = resultado.data as any[];

                this.totalBusqueda = resultado.total | 0;
                this.paginasTotalesBusqueda = Math.ceil(this.totalBusqueda / this.resultadosPorPaginaBusqueda);

                this.indicePaginasBusqueda = [];
                for (let i = 0; i < this.paginasTotalesBusqueda; i++) {
                    this.indicePaginasBusqueda.push(i + 1);
                }
            },
            error => {
                this.cargando = false;
                this.mensajeResponse.mostrar = true;
                this.ultimaPeticion = function () { this.listarBusqueda(term, pagina); };
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
                        this.mensajeResponse.texto = "pretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir. 7";
                    }
                    this.mensajeResponse.clase = "danger";
                    this.mensaje(2);
                }

            }
        );
    }

    /**
     * Este método obtiene una lista de elementos de la api 
     * @param pagina  inicio de la página para mostrar resultados   
     * @return void
     */
    listar(pagina: number): void {
        this.paginaActual = pagina;

        this.cargando = true;
        this.crudService.lista(pagina, this.resultadosPorPagina, this.URL).subscribe(
            resultado => {
                this.cargando = false;
                this.dato = resultado.data as any[];

                this.total = resultado.total | 0;
                this.paginasTotales = Math.ceil(this.total / this.resultadosPorPagina);

                this.indicePaginas = [];
                for (let i = 0; i < this.paginasTotales; i++) {
                    this.indicePaginas.push(i + 1);
                }
                this.mensajeResponse.mostrar = true;
                this.mensajeResponse.texto = "lista cargada";
                this.mensajeResponse.clase = "success";
                this.mensaje(2);
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
    //abre una modal para confirmar la eliminacion
    borrarItem = ""; borrarIndex = "";

    /**
     * Este método es intermediario para la eliminación de un elemento 
     * en la api, abre una ventana modal para confirmar la acción
     * @param item contiene el valod del elemento a eliminar
     * @param index  indica la posicion del elemento en la lista cargada  
     * @return void
     */
    eliminar(item: any, index): void {
        this.borrarItem = item;
        this.borrarIndex = index;
        document.getElementById("confirmarEliminar").classList.add('is-active');
    }

    /**
     * Este método cierra el modal de la de confirmación de eleimnación         
     * @return void
     */
    cancelarModal() {
        document.getElementById("confirmarEliminar").classList.remove('is-active');
    }

    /**
     * Este método se encarga de la eliminacion de un elemento 
     * en la api
     * @param item contiene el valod del elemento a eliminar
     * @param index  indica la posicion del elemento en la lista cargada  
     * @return void
     */
    borrar(item: any, index): void {
        item.cargando = true;
        this.borrarCargando = true;
        this.crudService.eliminar(item.id, this.URL).subscribe(
            data => {
                item.cargando = false;
                this.borrarCargando = false;

                this.dato.splice(index, 1);

                this.mensajeResponse.mostrar = true;
                this.mensajeResponse.texto = "Se eliminó el elemento de la lista.";
                this.mensajeResponse.clase = "success";
                this.mensaje(2);

                this.cancelarModal();
            },
            error => {
                item.cargando = false;
                this.borrarCargando = false;

                this.mensajeResponse.mostrar = true;
                this.ultimaPeticion = function () {
                    this.eliminar(item, index);
                }
                this.cancelarModal();

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
                        this.mensajeResponse.texto = "No se puede interpretar el error. Por favor contacte con soporte técnico si esto vuelve a ocurrir. 9";
                    }
                    this.mensajeResponse.clase = "danger";
                    this.mensaje(2);
                }


            }
        );
    }

    // # SECCION: Paginación

    /**
     * Este método es intermediario para el listado incrementa en uno la paginación
     * @return void
     */
    paginaSiguiente(): void {console.log(this.paginaActual);
        if(this.total > 15){
            if(this.busquedaActivada){
                var term = <HTMLInputElement> document.getElementById("search-box");
                this.listarBusqueda(term.value, this.paginaActualBusqueda + 1);
            }else{
                this.listar(this.paginaActual + 1);
            }
        }

        
    }

    /**
     * Este método es intermediario para el listado decrementa en uno la paginación
     * @return void
     */
    paginaAnterior(): void {
        if(this.paginaActual > 1){
            console.log(this.paginaActual);
            if(this.busquedaActivada){
                var term = <HTMLInputElement> document.getElementById("search-box");
                this.listarBusqueda(term.value, this.paginaActualBusqueda - 1);
            }else{
                this.listar(this.paginaActual - 1);
            }
        }   
          
    }

    /**
     * Este método es intermediario para el listado
     * @return void
     */
    mostrarLista(pagina: number): void {
        if(this.busquedaActivada){
            var term = <HTMLInputElement> document.getElementById("search-box");
            this.listarBusqueda(term.value, pagina);
        }else{
            this.listar(pagina);
        }        
    }

    //mostrar notificaciones
    public options = {
        position: ["bottom", "left"],
        timeOut: 2000,
        lastOnBottom: true
    };

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

    json;
    imprimir_cargando= false;
    contador;
    imprimir(json, contador) {
      /*let pdf = new jsPDF('p', 'pt', 'letter');
      pdf.setProperties({
        title: 'Ticket',
        subject: 'YOURSOFT',
        author: 'Eliecer Ramirez Esquinca',
        keywords: 'yoursoft, web, mobile, desarrollo, agil',
        creator: 'www.yoursoft.com.mx'
      });
      var elementHandler = {
        '.equis': function (element, renderer) {
          return true;
        }
      };
      pdf.fromHTML($('body')[0], 5, 5, {
        'width': 170,
        'elementHandlers': elementHandler
      });
  
      pdf.output('dataurlnewwindow')*/
      this.json = json;
      
      if(document.getElementById("funcion_secundaria"+contador))
        document.getElementById("funcion_secundaria"+contador).click();

      this.contador = contador;
      this.imprimir_cargando = true;
      setTimeout(()=> {
        var html = document.getElementById("imprimir").innerHTML;
        html = '<html lang="es">' + ' <head>' + ' <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' + ' <meta name="charset" content="UTF-8">' + ' <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">' + ' <meta name="apple-mobile-web-app-capable" content="yes">' + ' <title>PDF</title> <meta name="viewport" content="initial-scale=1" />' + ' <style>html { font-size: .9em;} body{font-size: .9em;} select::-ms-expand {display: none;}</style>' + ' </head>' + ' <body>' + html + ' </body>' + ' </html>';
        var iframe = document.createElement('iframe');
        iframe.setAttribute("id", "printf");
        iframe.setAttribute("style", "display:none");
        document.body.appendChild(iframe);
    
        var mywindow = <HTMLSelectElement>document.getElementById('printf');
        mywindow.contentWindow.document.write(html);
        setTimeout(()=> {
          // lanzar la sentencia imprimir   
          this.imprimir_cargando = false;    
          mywindow.contentWindow.print();
        }, 500);
        setTimeout(()=> {
          // remover el contenedor de impresión
          document.body.removeChild(iframe);
        }, 2000);
      }, 300);
      
    }
}
