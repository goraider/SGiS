import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'grupos-cie10-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
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
  * Contiene los elementos del formulario donde se agregaran categorias del Grupo CIE-10.
  * @type {any}
  */
  form_categorias: any;
  /**
  * Contiene los elementos del formulario donde se agregaran subcategorias respecto ala categoria del Grupo CIE-10.
  * @type {any}
  */
  form_subcategorias: any;
  
  /**
  * Contiene las diferentes pestañas de acceso que puede tener la vista.
  * @type {number}
  */
  tab: number = 1;

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
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      categorias_cie10: this.fb.array([])
      //para acceder al array de sus elementos categorias_cie10[i]
    });
    this.form_categorias = {
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      sub_categorias_cie10: this.fb.array([])
    };
    this.form_subcategorias = {
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    };


    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    //document.getElementById("catalogos").click();
  }
  
  /**
  * Método que genera una Categoria del Grupo CIE-10
  * @returns un grupo de datos que tiene una Categoria
  */
  initCategoria() {
    return this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      sub_categorias_cie10: this.fb.array([
        this.initSubcatagoria()
      ])
    })
  }

  /**
  * Método que genera una Subcatagoria respecto a la Categoria del Grupo CIE-10
  * @returns un grupo de datos que tiene una Subcatagoria
  */
  initSubcatagoria() {
    return this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
  }

  /**
  * Método que agrega Catagoria con sus campos del Grupo CIE-10
  * @returns void
  */
  addCategoria() {
    const a: FormArray = <FormArray>this.dato.controls.categorias_cie10;
    a.controls.push(this.initCategoria());
  }

  /**
  * Método que genera una Subcatagoria respecto a la Categoria del Grupo CIE-10
  * @param i indice numerico de los campos de la subcategoria
  * @param t indice numerico de la posición de la subcategoria
  */
  addSubcategoria(i?: number, t?: number) {
    const a: FormArray = <FormArray>this.dato.controls.categorias_cie10;
    const control: FormArray = <FormArray>a.at(i).get('sub_categorias_cie10');
    control.push(this.initSubcatagoria());
  }

}