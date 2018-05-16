import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'cartera-servicios-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

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
  * Contiene los elementos del formulario para crear los elementos que tendra la cartera de servicio.
  * @type {any}
  */
  form_items: any;

  /**
  * Contiene los niveles de cone que se le puede asignar a una cartera de sevicio, basico o completo.
  * @type {any}
  */
  form_niveles_cones: any;

  /**
  * Contiene las diferentes pestañas de acceso que puede tener la vista.
  * @type {number}
  */
  tab:number = 1;

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
        niveles_cones: this.fb.array([]),
        items: this.fb.array([])
      });
        this.form_niveles_cones = {
          niveles_cones_id: ['', [Validators.required]]     
        };

        this.form_items = {
        nombre: ['', [Validators.required]],
        tipos_items_id: ['', [Validators.required]]
      };

      //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
      document.getElementById("catalogos").click();
    }

    ngAfterViewInit() {
    //Solo si se tiene el control mover izquierda-derecha poner un <a id="initMover" (click)="ctrl.initMover(ctrl.dato.controls.almacen_tipos_movimientos.controls, ctrl.tipos_movimientos)>refresh</a>
    //incrementar el tiempo segun sea el caso para que cargue el catalogo en este caso va a acrgar 2 catalogos por eso pongo 5000
    setTimeout(() => {
      document.getElementById("initMover").click();
    }, 4000);

  }

}