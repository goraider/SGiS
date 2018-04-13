import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { CrudService } from '../../../crud/crud.service';

import { Mensaje } from '../../../mensaje';


@Component({
  selector: 'pantalla-informativa',
  templateUrl: './lista.component.html',
  styleUrls:["./lista.component.css"]
})



export class ListaComponent {

  constructor(private crudService: CrudService,
              private notificacion: NotificationsService,
              private location: Location,
              ){}
  
  tamano = document.body.clientHeight;
  data_clues: any = {};
  latitud: any;
  longitud: any;
  domicilio: any;
  nombre: any;
  localidad: any;

  dato: any[] = [];
  cargando: boolean = false;
  mensajeResponse: Mensaje = new Mensaje(true);
  ultimaPeticion: any;

  paginaActual = 1;
  resultadosPorPagina = 10;
  total = 0;
  paginasTotales = 0;
  indicePaginas: number[] = [];

  ultimoTerminoBuscado = "";
  terminosBusqueda = new Subject<string>();
  resultadosBusqueda: any[] = [];
  busquedaActivada: boolean = false;
  paginaActualBusqueda = 1;
  resultadosPorPaginaBusqueda = 6;
  totalBusqueda = 0;
  paginasTotalesBusqueda = 0;
  indicePaginasBusqueda: number[] = [];

  cont = 0;


  public options = {
    position: ["bottom", "left"],
    timeOut: 1000,
    lastOnBottom: true
  };

  titulo:any = "Sala de Espera"

  ngOnInit(){
    this.listar(1);

    // window.onload = function() {
    //     var intevalo = setInterval('this.listar(this.paginaActual + 1);',1000);
    // }
    


      
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



  cerrarModal() {
      document.getElementById("detalle").classList.remove('is-active');
  }


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


  mostrarLista(pagina: number): void {
    if(this.busquedaActivada){
        var term = <HTMLInputElement> document.getElementById("search-box");
        //this.listarBusqueda(term.value, pagina);
    }else{
        this.listar(pagina);
    }        
  }

  paginaSiguiente(): void {
    if(this.total > 1){
        this.listar(this.paginaActual + 1);
    }
    
  }

  reset_paginas(){
    this.listar(1);
  }

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

  listar(pagina: number): void {
    this.paginaActual = pagina;

    this.cargando = true;
    this.crudService.lista(pagina, this.resultadosPorPagina, "pantalla-informativa").subscribe(
        resultado => {

            console.log(resultado);

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