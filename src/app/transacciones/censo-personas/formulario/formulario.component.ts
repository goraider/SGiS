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

  private municipios_id: number = null;
  private temp_municipios_id: number = null;

  private localidades_id: number = null;
  private temp_localidades_id: number = null;
  private selectedDeal;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      paterno: ['', [Validators.required]],
      materno: ['', [Validators.required]],
      domicilio: ['', [Validators.required]],
      municipios_id: ['', [Validators.required]],
      localidades_id: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      fecha_nacimiento: ['', [Validators.required]],
      estados_embarazos_id: ['', [Validators.required]],
      derechohabientes_id: ['', [Validators.required]]

    });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();


    var im = 0, il = 0;
    
    //        const pacientes = <FormArray>this.dato.controls.pacientes['controls']['personas']['controls']['municipios_id'];
      this.dato.controls.municipios_id.valueChanges.
      subscribe(val => {
        if (val && im == 0) {
          im++;
          this.temp_municipios_id = val;
        }
      });

      this.dato.controls.localidades_id.valueChanges.
      subscribe(val => {
        if (val && il == 0) {
          il++;
          this.temp_localidades_id = val;
        }
      });
  }


  
  autovalor_municipio() {
    setTimeout(() => {
      this.municipios_id = this.temp_municipios_id;
    }, 3000);
  }

  autovalor_localidad() {
    setTimeout(() => {
      this.localidades_id = this.temp_localidades_id;
    }, 3000);
  }

}