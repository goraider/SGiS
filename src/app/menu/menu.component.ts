import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from '../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { CrudService } from '../crud/crud.service';

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
  API_PATH = environment.API_PATH;
  activar;
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private notificacion: NotificationsService,
              private crudService: CrudService) { }

  menuactual: string;
  menutitulo: string;
  menuicono: string;
  mostrar = [];
  @Input() ctrl: any;
  @Output() datos: any[] = []; 
  mensaje_cambiar_clues:string = '';


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
    this.listar();
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

  listar() {
    
    this.cargando = true;
    this.crudService.lista_general('directorio-apoyos').subscribe(
        resultado => {
            this.cargando = false;
            this.datos = resultado as any[];
        },
        error => {

        }
    );
}
abrirModalDirectorioApoyos(){
  document.getElementById("directorio_apoyos").classList.add('is-active');
}
cerrarModalDirectorioApoyos() {
  document.getElementById("directorio_apoyos").classList.remove('is-active');
}
  
}
