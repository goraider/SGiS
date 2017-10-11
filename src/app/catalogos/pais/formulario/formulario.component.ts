import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'pais-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],      
      nombre: ['', [Validators.required]],
      clave_ISOA2: [''],
      clave_A3: [''],
      clave_N3: [''],
      prefijo_telefono: ['']   
    });  
    
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    //document.getElementById("catalogos").click();  
  }
  
}