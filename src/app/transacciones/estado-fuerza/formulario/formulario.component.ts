import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';

@Component({
  selector: 'estado-fuerza-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;

  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

   usuario = JSON.parse(localStorage.getItem("usuario"));

   clues_login = JSON.parse(localStorage.getItem("clues"));

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }
  fecha = new Date();

  ngOnInit() {
    this.dato = this.fb.group({
      clues: ['', [Validators.required]],
      sis_usuarios_id: [this.usuario.id, [Validators.required]],
      usuario: [this.usuario.nombre],
      turnos_id: ['', [Validators.required]],
      created_at: [this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' + this.fecha.getDate(), [Validators.required]],
      cartera_servicios: this.fb.array([
        this.fb.group({
          items: this.fb.array([

            this.fb.group({
              "id": [''],
              "nombre": [''],
              "cartera_servicios_id": ['', [Validators.required]],
              "tipos_items_id": ['', [Validators.required]],
              "respuesta": ['', [Validators.required]]              
            })

          ])
        })
      ])
    });
    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();

    setTimeout(()=> {
      if(this.dato.get("sis_usuarios_id").value == ""){
        this.dato.controls.sis_usuarios_id.patchValue(this.usuario.id);
        this.dato.controls.usuario.patchValue(this.usuario.nombre);
        this.dato.controls.created_at.patchValue(this.fecha);
      }
    }, 3000);

  }

  autocompleListFormatter = (data: any) => {
    let html = `<span>(${data.clues}) - ${data.nombre} - ${data.jurisdicciones.nombre}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  valorFormato_clue(data: any) {
    let html = `(${data.clues}) - ${data.nombre} - ${data.jurisdicciones.nombre}`;
    return html;
  }
  select_clue_autocomplete(modelo, data) {
    const um = <FormArray>this.dato.controls.clues;
    um.push(this.fb.group(data));
    (<HTMLInputElement>document.getElementById('clues_busqueda')).value = "";

    
      if(this.dato.get("sis_usuarios_id").value == ""){
        this.dato.controls.sis_usuarios_id.patchValue(this.usuario.id);
        this.dato.controls.usuario.patchValue(this.usuario.nombre);
        this.dato.controls.created_at.patchValue(this.fecha);
      }

  }



 
}