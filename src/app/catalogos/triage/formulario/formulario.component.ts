import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'triage-formulario',
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
  * Contiene los elementos del formulario donde se agregaran los sintomas del codigo triage.
  * @type {any}
  */
  form_sintomas: any;

  /**
  * Contiene los elementos del formulario donde se agregaran los resultados del codigo triage.
  * @type {any}
  */
  form_resultado: any;

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
      descripcion: [''],
      triage_sintomas: this.fb.array([])
      //para acceder al array de sus elementos triage_sintomas[i]
    });
      this.form_sintomas = {
      nombre: ['', [Validators.required]],
      triage_color_triage_sintoma: this.fb.array([])
    };
    this.form_resultado = {
      nombre: ['', [Validators.required]],
      triage_colores_id: ['', [Validators.required]],
    };


    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }
  
  /**
  * Método que genera los sintomas del Codigo Tiage
  * @returns un grupo de datos que tiene unos Sintomas
  */
  initSintomas() {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      triage_color_triage_sintoma: this.fb.array([
        this.initResultado()
      ])
    })
  }

  /**
  * Método que genera los resultados de los sintomas del Codigo Tiage
  * @returns un grupo de datos que tienen un Resultado
  */
  initResultado() {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      triage_colores_id: ['', [Validators.required]]
    })
  }

  /**
  * Método que agrega un sintoma
  * @returns un grupo de datos que tiene un sintoma
  */
  addSintoma() {
    const a: FormArray = <FormArray> this.dato.controls.triage_sintomas;
    a.controls.push(this.initSintomas());
  }

  /**
  * Método que agrega un resultado
  * @returns un grupo de datos que tiene un resultado de acuerdo a un sintoma
  */
  addResultado(i?: number, t?: number) {
    const a: FormArray = <FormArray> this.dato.controls.triage_sintomas;
    const control: FormArray = <FormArray> a.at(i).get('triage_color_triage_sintoma');
    control.push(this.initResultado());
  }

}