import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'censo-personas-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      nombre: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
      materno: ['', [Validators.required]],
      domicilio: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      estados_embarazos_id: ['', [Validators.required]],
      derechohabientes_id: ['', [Validators.required]]

    });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }

}