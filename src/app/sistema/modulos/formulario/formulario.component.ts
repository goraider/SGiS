/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'permisos-formulario',
  templateUrl: './formulario.component.html'
})

/**
* Esta clase muestra la lista del componente
* de acuerda a la ruta para acceder a los datos a mostrar.
*/
export class FormularioComponent {

  /**
  * Contiene los datos del formulario que comunican a la vista con el componente.
  * @type {FormGroup}
  */
  dato: FormGroup;

  /**
  * Contiene la bandera para preguntar si tiene o no id.
  * @type {boolean}
  */
  tieneid: boolean = false;

  /**
  * Contiene el formulario con los metodos
  * @type {boolean}
  */
  form_metodos;

  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano;

  /**
  * Contiene si el usuario es super o no
  * @type {any}
  */
  activar_super;

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }
  
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      controlador: [''],
      sis_modulos_id: [''],
      vista: ['1'],
      es_super:[0],
      metodos: this.fb.array([])
    });
    this.form_metodos = {nombre:['', [Validators.required]],   recurso:['', [Validators.required]], metodo:['', [Validators.required]], es_super:[0]}
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
      }
    });
    this.defaultMetodo(this.dato.controls.metodos);
    this.tamano = document.body.clientHeight;
    this.activar_super = JSON.parse(localStorage.getItem("usuario")).es_super;
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();  
  }

  /**
  * Este método agrega acciones a los permisos.
  * @return void
  */
  quitarAllMetodo = function(){
      this.dato.controls.metodos = this.fb.array([]);
  }

  /**
  * Este método agrega los valores y acciones que tendra cada modulo
  * como eliminar, agregar, editar, etc.
  * @param modelo son los valores que tendra el formulario
  * con las acciones a realizar.
  * @return void
  */
  defaultMetodo(modelo){
    modelo.push(this.fb.group({nombre:['Guardar', [Validators.required]],   recurso:['store', [Validators.required]],   metodo:['post', [Validators.required]], es_super:[0] }));
    modelo.push(this.fb.group({nombre:['Modificar', [Validators.required]],   recurso:['update', [Validators.required]],   metodo:['put', [Validators.required]], es_super:[0] }));
    modelo.push(this.fb.group({nombre:['Eliminar', [Validators.required]],   recurso:['destroy', [Validators.required]],   metodo:['delete', [Validators.required]], es_super:[0] }));
    modelo.push(this.fb.group({nombre:['Listar', [Validators.required]],   recurso:['index', [Validators.required]],   metodo:['get', [Validators.required]], es_super:[0] }));
    modelo.push(this.fb.group({nombre:['Ver', [Validators.required]],   recurso:['show', [Validators.required]],   metodo:['get', [Validators.required]], es_super:[0] }));    
  }

}