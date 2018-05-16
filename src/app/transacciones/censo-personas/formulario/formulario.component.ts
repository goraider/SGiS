import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'censo-personas-formulario',
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
  * Contiene el id del estado de embarazo.
  * @type {any}
  */
  estados_embarazos_id;

  /**
  * Contiene el id del ederechohabiente.
  * @type {any}
  */
  derechohabientes_id;
  
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
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
      materno: ['', [Validators.required]],
      domicilio: ['', [Validators.required]],
      municipios_id: ['', [Validators.required]],
      localidades_id: ['', [Validators.required]],
      telefono: ['',  [Validators.required, Validators.pattern("[0-9]*")]],
      fecha_nacimiento: ['', [Validators.required]],
      estados_embarazos_id: ['', [Validators.required]],
      derechohabientes_id: ['', [Validators.required]]

    });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();

  }
}