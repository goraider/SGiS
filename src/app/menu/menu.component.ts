import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from '../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'sistema-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  mostrarMenuAside: boolean = false;
  mostrarCambiarclues: boolean = false;
  usuario: any = {};
  configuracion: any = {};
  clues;
  usuario_clues;
  private API_PATH = environment.API_PATH;
  constructor(private fb: FormBuilder, private notificacion: NotificationsService) { }

  menuactual: string;
  menutitulo: string;
  menuicono: string;
  mostrar = [];
  @Input() ctrl: any;
  private mensaje_cambiar_clues:string = '';
  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.usuario_clues = JSON.parse(localStorage.getItem("usuario_clues"));
 
    var menu = JSON.parse(localStorage.getItem("menu"));

    var url = location.href.split("/");
    this.menuactual = url[4];
    menu.forEach(element => {
      if(element.path.indexOf(this.menuactual) > -1){
        this.menutitulo = element.titulo;
        this.menuicono = element.icono;
      }
    });
    
    this.clues = localStorage.getItem("clues") ? JSON.parse(localStorage.getItem("clues")) : {clues: "", nombre: ""};
    
    var abrir = false;
    if(this.clues.nombre == '')
      abrir = true;

    if(abrir){
      this.mensaje_cambiar_clues = "No se ha seleccionado ninguna clues, Por favor seleccione una";
      this.toggleCambiarclues();
    }
    
  }
  toggleMenuAside() {
    this.mostrarMenuAside = !this.mostrarMenuAside;
  }

  toggleCambiarclues() {
    this.mostrarCambiarclues = !this.mostrarCambiarclues;
  }

  cambiar_clues(val){

    localStorage.setItem('clues', JSON.stringify(val));

    if(document.getElementById("cargar_datos_actualizar"))
      document.getElementById("cargar_datos_actualizar").click();
    
    this.clues = JSON.parse(localStorage.getItem("clues"));
    this.mostrarCambiarclues = false;
  }
  
}
