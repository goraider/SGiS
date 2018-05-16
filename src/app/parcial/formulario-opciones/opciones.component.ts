/**
* dependencias a utilizar
*/
import { Component, OnInit, Input } from '@angular/core';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'formulario-opciones',
  templateUrl: './opciones.component.html'
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class FormularioOpcionesComponent{

    /**
    * Contiene el id del elemento
    * a seleccionar.
    * @type {number}
    */
    @Input() id: number;

    /**
    * Contiene los elementos
    * para acceder a los metodos del crud.
    * @type {any}
    */
    @Input() ctrl: any; 
    
    /**
    * Contiene la nueva url cuando es un nuevo ingreso.
    * @type {string}
    */
    url_nuevo: string = '';
    
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
    * almacena el modulo actual.
    * @type {any}
    */ 
    modulo_actual;
    
    /**
    * obtiene el icono del modulo.
    * @type {any}
    */
    icono;
    
    /**
    * obtiene el icono del modulo.
    * @type {any}
    */

    activarOp = false;
    
    /**
    * Este método inicializa la carga de la vista asociada junto los datos del formulario
    * @return void
    */
    ngOnInit() {
      var url = location.href.split("/");
      this.carpeta = url[4];
      this.modulo = url[5];
      //this.modulo_actual = this.modulo.replace(/[-](?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/[-_]+/g, ' ');

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
      
      this.url_nuevo = '/' + this.carpeta + '/' + this.modulo + '/nuevo'
      this.url_editar = '/' + this.carpeta + '/' + this.modulo + '/editar/' + this.id;
      this.url_imprimir = '/' + this.carpeta + '/' + this.modulo + '/ver/' + this.id;

      var titulo_icono = this.obtener_icono(url, this.controlador, JSON.parse(localStorage.getItem("menu")));
      this.permisos;
      this.icono = titulo_icono.icono;
      this.modulo_actual = titulo_icono.titulo;

    }
    
    /**
    * Este método obtiene el icono del modulo con el que se este trabajando
    * @param url de la ruta que se este trabajando
    * @param controlador el controlador donde se obtiene el icono
    * @param menu elemento donde se mapea los elementos del array de menu del archivo Environment
    */
    obtener_icono(url, controlador, menu) {

      menu.map((element, key) => {
        if (typeof this.icono == 'undefined') {
          if(!element.lista) {
            this.icono = 'Seguimiento';
          }
          if (element.lista) {
            this.icono = this.obtener_icono(url, controlador, element.lista);
            return this.icono;
          }
          if (element.path.indexOf(url[5] + '/' + url[6]) > -1 ) {
            this.icono = element;
            return this.icono;
          }else{
            if (element.key.indexOf(controlador) > -1){
              this.icono = element;
              return this.icono;
            }          
          }
        }
        else
          return this.icono;
      });
      return this.icono;
    }   
}