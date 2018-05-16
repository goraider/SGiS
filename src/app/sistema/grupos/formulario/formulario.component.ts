/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'usuarios-formulario',
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
  * Contiene las diferentes pestañas de acceso que puede tener la vista.
  * @type {number}
  */
  tab = 0;

  /**
  * Contiene todos los permisos
  * para el usuario.
  * @type {Array:any}
  */
  permisos_all: any[] = [];

  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;

  /**
  * Contiene si es super usuario o no.
  * @type {any}
  */
  activar_super;
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private fb: FormBuilder) { }
  
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    this.dato = this.fb.group({
      nombre: ['', [Validators.required]],      
      id: [''],
      permisos: [{}]
    }); 

    this.dato.controls.permisos.valueChanges.
      subscribe(val => {
        if(typeof this.dato.controls.permisos.value == 'string'){
          this.dato.controls.permisos.patchValue(JSON.parse(val));
        }
      });
    this.activar_super = JSON.parse(localStorage.getItem("usuario")).es_super;
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();  
  }
  
  /**
  * Este método realiza todas las acciones de agregar los permisos
  * @param padre indice con los permisos padre
  * @param accion contiene los clave valor para iterar y asignar
  * @param modelo los valores a obtener,
  * @return void
  */
  todosAccion(padre, accion, modelo){     
    if(typeof this.dato.controls.permisos.value == 'string'){
      this.dato.controls.permisos.patchValue(JSON.parse(this.dato.controls.permisos.value));
    }
    if(!this.permisos_all[padre])  
      this.permisos_all[padre] = false;
    
    this.permisos_all[padre] = !this.permisos_all[padre];
    var valor = this.permisos_all[padre]; 

    accion.forEach(function(value, key){
        if(!valor){
          delete modelo.value[padre + "." + value.recurso];
        }        
        else{
          modelo.value[padre + "." + value.recurso] = valor ? 1 : 0; 
        }                      
    });
  }

  /**
  * Este método agrega acciones a los permisos.
  * @param clave indice para agregar acciones al permiso
  * @return void
  */
  agregar_accion(clave){
    if(this.dato.controls.permisos.value[clave])
      delete this.dato.controls.permisos.value[clave];
    else
      this.dato.controls.permisos.value[clave] = 1;      
  }


}