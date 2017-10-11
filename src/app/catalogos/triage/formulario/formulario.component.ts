import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'triage-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  form_sintomas: any;
  form_resultado: any;
  tab:number = 1;
  constructor(private fb: FormBuilder) { }

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
  initSintomas() {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      triage_color_triage_sintoma: this.fb.array([
        this.initResultado()
      ])
    })
  }

  initResultado() {
    return this.fb.group({
      nombre: ['', [Validators.required]],
      triage_colores_id: ['', [Validators.required]]
    })
  }

  addSintoma() {
    const a: FormArray = <FormArray> this.dato.controls.triage_sintomas;
    a.controls.push(this.initSintomas());
  }

  addResultado(i?: number, t?: number) {
    const a: FormArray = <FormArray> this.dato.controls.triage_sintomas;
    const control: FormArray = <FormArray> a.at(i).get('triage_color_triage_sintoma');
    control.push(this.initResultado());
  }

}