import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'directorio-apoyos-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  form_apoyos: any;

  municipios_id: number = null;
  temp_municipios_id: number = null;

  localidades_id: number = null;
  temp_localidades_id: number = null;
  selectedDeal;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dato = this.fb.group({
      institucion: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      correo: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      municipios_id: ['', [Validators.required]],
      localidades_id: ['', [Validators.required]],
      apoyos: this.fb.array([])
    });
    
    // const pacientes = <FormArray>this.dato.controls.pacientes['controls']['personas']['controls']['municipios_id'];

      //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
      document.getElementById("catalogos").click();

  }


  
  ngAfterViewInit() {
    //Solo si se tiene el control mover izquierda-derecha poner un <a id="initMover" (click)="ctrl.initMover(ctrl.dato.controls.almacen_tipos_movimientos.controls, ctrl.tipos_movimientos)>refresh</a>
    //incrementar el tiempo segun sea el caso para que cargue el catalogo en este caso va a acrgar 2 catalogos por eso pongo 5000
    setTimeout(() => {
      document.getElementById("initMover").click();
    }, 4000);

  }

}