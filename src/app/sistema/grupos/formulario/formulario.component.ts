import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'usuarios-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  tab = 0;
  permisos_all: any[] = [];
  tamano = document.body.clientHeight;
  activar_super;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      nombre: ['', [Validators.required]],      
      id: [''],
      permisos: [{}]
    }); 

    this.dato.controls.permisos.valueChanges.
      subscribe(val => {
        if(typeof this.dato.controls.permisos.value == 'string'){
          this.dato.controls.permisos.patchValue(JSON.parse(val));
        }
      });
    this.activar_super = JSON.parse(localStorage.getItem("usuario")).es_super;
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();  
  }
  
  todosAccion(padre , accion, modelo){     
    if(typeof this.dato.controls.permisos.value == 'string'){
      this.dato.controls.permisos.patchValue(JSON.parse(this.dato.controls.permisos.value));
    }
    if(!this.permisos_all[padre])  
      this.permisos_all[padre] = false;
    
    this.permisos_all[padre] = !this.permisos_all[padre];
    var valor = this.permisos_all[padre]; 

    accion.forEach(function(value, key){
        if(!valor){
          delete modelo.value[padre + "." + value.recurso];
        }        
        else{
          modelo.value[padre + "." + value.recurso] = valor ? 1 : 0; 
        }                      
    });
  }
  agregar_accion(clave){
    if(this.dato.controls.permisos.value[clave])
      delete this.dato.controls.permisos.value[clave];
    else
      this.dato.controls.permisos.value[clave] = 1;      
  }
}