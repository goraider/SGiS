import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'simple-opciones',
  templateUrl: './simple-opciones.component.html'
})

export class SimpleOpcionesComponent{
  @Input() ctrl: any; 

  private url_nuevo: string = '';
  private permisos;
  private carpeta;
  private modulo;
  private controlador;
  private modulo_actual;
  private icono;

  ngOnInit() {
    var url = location.href.split("/");
    this.carpeta = url[3];
    this.modulo = url[4];
    this.modulo_actual = this.modulo.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/[-_]+/g, ' ');

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
    
    this.permisos = JSON.parse(localStorage.getItem("permisos"));
    this.url_nuevo = '/' + this.carpeta + '/' + this.modulo + '/nuevo';

    this.icono = this.obtener_icono(this.controlador, JSON.parse(localStorage.getItem("menu")));
  }
  
  obtener_icono(controlador, menu){    
    menu.map((element, key) => {
      if(typeof this.icono == 'undefined'){
        if(element.lista){
          this.icono = this.obtener_icono(controlador, element.lista);        
          return this.icono;
        }
        if(element.key.indexOf(controlador) > -1 ){
          this.icono = element.icono;
          return this.icono;        
        }
      }
      else
        return this.icono;     
    });
    return this.icono;
  }  
}