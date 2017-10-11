import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'permisos-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  private tieneid: boolean = false;
  private form_metodos;
  private tamano;
  private activar_super;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      controlador: [''],
      sis_modulos_id: [''],
      vista: ['1'],
      es_super:[0],
      metodos: this.fb.array([])
    });
    this.form_metodos = {nombre:['', [Validators.required]],   recurso:['', [Validators.required]], metodo:['', [Validators.required]], es_super:[0]}
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
      }
    });
    this.defaultMetodo(this.dato.controls.metodos);
    this.tamano = document.body.clientHeight;
    this.activar_super = JSON.parse(localStorage.getItem("usuario")).es_super;
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();  
  }

  quitarAllMetodo = function(){
      this.dato.controls.metodos = this.fb.array([]);
  }

  defaultMetodo(modelo){
    modelo.push(this.fb.group({nombre:['Guardar', [Validators.required]],   recurso:['store', [Validators.required]],   metodo:['post', [Validators.required]], es_super:[0] }));
    modelo.push(this.fb.group({nombre:['Modificar', [Validators.required]],   recurso:['update', [Validators.required]],   metodo:['put', [Validators.required]], es_super:[0] }));
    modelo.push(this.fb.group({nombre:['Eliminar', [Validators.required]],   recurso:['destroy', [Validators.required]],   metodo:['delete', [Validators.required]], es_super:[0] }));
    modelo.push(this.fb.group({nombre:['Listar', [Validators.required]],   recurso:['index', [Validators.required]],   metodo:['get', [Validators.required]], es_super:[0] }));
    modelo.push(this.fb.group({nombre:['Ver', [Validators.required]],   recurso:['show', [Validators.required]],   metodo:['get', [Validators.required]], es_super:[0] }));    
  }
}