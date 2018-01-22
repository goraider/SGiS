import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'formulario-opciones',
  templateUrl: './opciones.component.html'
})

export class FormularioOpcionesComponent{
  @Input() id: number;
  @Input() ctrl: any; 

  url_nuevo: string = '';
  url_editar: string = '';
  url_imprimir: string = '';
  permisos = JSON.parse(localStorage.getItem("permisos"));
  carpeta;
  modulo;
  controlador;
  modulo_actual;
  icono;
  activarOp = false;
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