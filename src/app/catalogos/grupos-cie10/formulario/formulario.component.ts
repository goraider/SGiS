import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'grupos-cie10-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  form_categorias: any;
  form_subcategorias: any;
  tab: number = 1;
  constructor(private fb: FormBuilder) { }

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
  initCategoria() {
    return this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      sub_categorias_cie10: this.fb.array([
        this.initSubcatagoria()
      ])
    })
  }

  initSubcatagoria() {
    return this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })
  }

  addCategoria() {
    const a: FormArray = <FormArray>this.dato.controls.categorias_cie10;
    a.controls.push(this.initCategoria());
  }

  addSubcategoria(i?: number, t?: number) {
    const a: FormArray = <FormArray>this.dato.controls.categorias_cie10;
    const control: FormArray = <FormArray>a.at(i).get('sub_categorias_cie10');
    control.push(this.initSubcatagoria());
  }

}