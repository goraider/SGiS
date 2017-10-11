import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'base-conocimientos-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      procesos: ['', [Validators.required]],
      triage_colores_id: [[""], [Validators.required]],
      subcategorias_cie10_id: [[""], [Validators.required]],
      valoraciones_pacientes_id: [[""], [Validators.required]],
      estados_pacientes_id: [[""], [Validators.required]],
    });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }

}