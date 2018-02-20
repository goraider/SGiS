import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'triage-colores-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;

  CkeditorConfig = {
    height:document.body.clientHeight - 760
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tiempo_minimo: ['', [Validators.required, Validators.pattern("[0-9-:]*")]],
      tiempo_maximo: ['', [Validators.required, Validators.pattern("[0-9-:]*")]]
    });


    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    //document.getElementById("catalogos").click();
  }


}
