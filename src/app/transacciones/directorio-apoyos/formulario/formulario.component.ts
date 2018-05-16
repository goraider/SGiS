/**
* dependencias a utilizar
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'directorio-apoyos-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

/**
* Esta clase inicializa la lista del componente
* con los datos que se requieran.
*/
export class FormularioComponent {
  
  /**
  * Contiene los datos del formulario que comunican a la vista con el componente.
  * @type {FormGroup}
  */
  dato: FormGroup;
  
  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;

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
      institucion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      correo: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      municipios_id: ['', [Validators.required]],
      localidades_id: ['', [Validators.required]],
      apoyos: this.fb.array([])
    });
    


    // const pacientes = <FormArray>this.dato.controls.pacientes['controls']['personas']['controls']['municipios_id'];

    /**
    * Este metodo da click a un elemento que tiene cargados los catalogos a ocupar.
    * Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    */
    document.getElementById("catalogos").click();

  }

  /**
  * Este método da click a un elemento de izquierda
  * o derecha en el catalogo seleccionado en editar.
  * @return void
  */
  ngAfterViewInit() {
    //Solo si se tiene el control mover izquierda-derecha poner un <a id="initMover" (click)="ctrl.initMover(ctrl.dato.controls.almacen_tipos_movimientos.controls, ctrl.tipos_movimientos)>refresh</a>
    //incrementar el tiempo segun sea el caso para que cargue el catalogo en este caso va a acrgar 2 catalogos por eso pongo 5000
    setTimeout(() => {
      document.getElementById("initMover").click();
    }, 4000);

  }

}