import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'municipio-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  temp_paises_id;
  temp_estados_id;
  temp_municipios_id;

  paises_id
  estados_id;
  municipios_id;
  tamano = document.body.clientHeight;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],
      clave: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      paises_id: ['', [Validators.required]],
      estados_id: ['', [Validators.required]]
    });

    var ip = 0, ie = 0, im = 0;
    this.dato.controls.paises_id.valueChanges.
      subscribe(val => {
        if (val && ip == 0) {
          ip++;
          this.temp_paises_id = val;
        }
      });

    this.dato.controls.estados_id.valueChanges.
      subscribe(val => {
        if (val && ie == 0) {
          ie++;
          this.temp_estados_id = val;
        }
      });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }
  autovalor_pais() {
    setTimeout(() => {
      this.paises_id = this.temp_paises_id;
    }, 2000);
  }
  autovalor_estado() {
    setTimeout(() => {
      this.estados_id = this.temp_estados_id;
    }, 3000);
  }
}