import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'municipios-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      clave: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      jurisdicciones_id: ['', [Validators.required]],
      entidades_id: ['7'],
    });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }

}