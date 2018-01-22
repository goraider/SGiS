import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tabla-acciones',
  templateUrl: './acciones.component.html'
})

export class TablaAccionesComponent implements OnInit {
  @Input() item: any;
  @Input() index: number;
  @Input() ctrl: any;
  url_editar: string = '';
  url_imprimir: string = '';
  permisos = JSON.parse(localStorage.getItem("permisos"));
  carpeta;
  modulo;
  controlador;

  ngOnInit() {
    var url = location.href.split("/");
    this.carpeta = url[4];
    this.modulo = url[5];

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
    
    this.url_editar = '/' + this.carpeta + '/' + this.modulo + '/editar/' + this.item.id;
    this.url_imprimir = '/' + this.carpeta + '/' + this.modulo + '/ver/' + this.item.id;
  }
}