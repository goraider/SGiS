import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'tipo-medio-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  temp_paises_id;
  paises_id;
  tamano = document.body.clientHeight;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''], 
      clave: ['', [Validators.required]],     
      nombre: ['', [Validators.required]],
      paises_id: ['', [Validators.required]]    
    });  
    
    var ip = 0, ie = 0, im = 0;
    this.dato.controls.paises_id.valueChanges.
      subscribe(val => {
        if(val && ip == 0){
          ip++;
          this.temp_paises_id = val;
        }
    });
    
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();    
  }
  autovalor_pais(){
    setTimeout(() => {
      this.paises_id = this.temp_paises_id;
    }, 2000);
  }
  
}