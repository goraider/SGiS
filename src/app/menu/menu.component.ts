/**
* dependencias a utilizar
*/
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { environment } from '../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { CrudService } from '../crud/crud.service';
import { Router, ActivationEnd } from '@angular/router';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'sistema-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})

/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
export class MenuComponent implements OnInit {

  /**
  * Contiene el menu aside a mostrar.
  * @type {any}
  */
  mostrarMenuAside: boolean = false;
  
  /**
  * Contiene la bandera
  * del cambio de clues o no.
  * @type {boolean}
  */
  mostrarCambiarclues: boolean = false;

  /**
  * Contiene el objeto con los datos del usuario.
  * @type {any}
  */
  usuario: any = {};

  /**
  * Contiene el objeto
  * de la configuración.
  * @type {any}
  */
  configuracion: any = {};

  /**
  * Contiene los datos de la
  * Unidad Medica.
  * @type {any}
  */
  clues;

  /**
  * Contiene el valor inicial
  * de la Unidad Medica del LocalStorage.
  * @type {any}
  */
  directorio_apoyos_clue: any = '';

  /**
  * Contiene el valor de la URL
  * concatenando el municipio que traiga del LocalStorage
  * respecto a la Unidad Medica Correspondiente.
  * @type {any}
  */
  URLdirectorio_apoyos_clue: any = '';

  /**
  * Contiene
  * el suario con la unidad medica correspondiente.
  * @type {any}
  */
  usuario_clues;
  
  /**
  * Contiene la ruta del Evironments
  * @type {string}
  */
  API_PATH = environment.API_PATH;

  /**
  * Contiene la bandera
  * para activar o no
  * @type {string}
  */
  activar;

  /**
  * Contiene la bandera
  * cuando se cargue la lista.
  * @type {string}
  */
  cargando: boolean = false;

  /**
  * Contiene la ruta actual.
  * @type {string}
  */
  rutaActual: any = '';
 
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private fb: FormBuilder,
              private notificacion: NotificationsService,
              private ubicacion: Location,
              private crudService: CrudService,
              private ruta: Router) {

                this.obtenerLink();
              }
  /**
  * Contiene el menu actual donde
  * se este hubicado.
  * @type {string}
  */
  menuactual: string;

  /**
  * Contiene el titulo del modulo
  * donde se este hubicado.
  * @type {string}
  */
  menutitulo: string;

  /**
  * Contiene el icono del menu
  * donde se este hubicado
  * @type {string}
  */
  menuicono: string;

  /**
  * Contiene el arreglo a mostrar.
  * @type {string}
  */
  mostrar = [];

  /**
  * Contiene los elementos
  * para acceder a los metodos del crud.
  * @type {any}
  */
  @Input() ctrl: any;

  /**
  * Contiene los datos
  * a mostrar en otros componentes.
  * @type {Array:any}
  */
  @Output() datos: any[] = [];
  
  /**
  * Contiene el mensaje a mostrar de
  * la Unidad Medica.
  * @type {any}
  */
  mensaje_cambiar_clues:string = '';

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
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

    this.listar_dorectorio_apoyos();


  }

  /**
  * Este método obtiene el actual donde de este hubicado.
  * @return void
  */
  obtenerLink(){

    this.ruta.events
    .filter( evento => evento instanceof ActivationEnd )
    .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
    .map( (evento: ActivationEnd) => evento.snapshot.root.children[0].routeConfig.path )
    .subscribe(event => {

      this.rutaActual = event;
  
    });

  }

  /**
  * Este método muestra o no el menu aside.
  * @return void
  */
  toggleMenuAside() {
    this.mostrarMenuAside = !this.mostrarMenuAside;
  }

  /**
  * Este método indica el cambio o
  * no de la Unidad Medica.
  * @return void
  */
  toggleCambiarclues() {
    this.mostrarCambiarclues = !this.mostrarCambiarclues;
  }

  /**
  * Este método indica el cambio de la Unidad Medica.
  * para actualizar los datos.
  * @return void
  */
  cambiar_clues(val){


    localStorage.setItem('clues', JSON.stringify(val));
    
    //envia el valor de val respecto al valor del municipio,
    //para mostrar el directorio de apoyos.
    this.URLdirectorio_apoyos_clue = 'directorio-apoyos?municipio_id='+val.municipios_id;
    this.listar_dorectorio_apoyos();

      if(this.rutaActual == 'transacciones/seguimiento'){
  
          //location.reload();
          this.ruta.navigate(['/transacciones/incidencia/lista']);
          //document.getElementById("cargar_datos_actualizar").click();


      }
      else{
        document.getElementById("cargar_datos_actualizar").click();
        
      }

      if(document.getElementById("graficas"))
        document.getElementById("graficas").click();




    this.clues = JSON.parse(localStorage.getItem("clues"));
    this.mostrarCambiarclues = false;
  }

  /**
  * Este método contiene el metodo
  * para listar el directorio de apoyos
  * de la Unidad Medica.
  * @return void
  */
  listar_dorectorio_apoyos() {
    
    this.cargando = true;
    this.crudService.lista_general('directorio-apoyos?municipio_id='+this.clues.municipios_id).subscribe(
        resultado => {

            this.cargando = false;
            this.datos = resultado as any[];
        },
        error => {

        }
    );
  }

  /**
  * Este método abre la ventana modal
  * del directorio de apoyos.
  * @return void
  */
  abrirModalDirectorioApoyos(){
    document.getElementById("directorio_apoyos").classList.add('is-active');
  }

  /**
  * Este método cuerra la ventana modal
  * del directorio de apoyos.
  * @return void
  */
  cerrarModalDirectorioApoyos() {
    document.getElementById("directorio_apoyos").classList.remove('is-active');
  }
  
}
