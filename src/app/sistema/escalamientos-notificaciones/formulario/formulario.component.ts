import { Component, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { CrudService } from '../../../crud/crud.service';

@Component({
  selector: 'escalamientos-notificaciones-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  
  public usuarios_term: string = `${environment.API_URL}/usuarios-auto?term=:keyword`;
  
  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }

  ngOnInit() {
    this.dato = this.fb.group({
      tipos_notificaciones_id: [''],
      usuarios_id: this.fb.array([]),
    });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }

  //Funciones del Autocomplete

  autocompleListFormatter = (data: any) => {

    let html = `<span>(${data.id}) - ${data.nombre} - ${data.paterno} - ${data.materno} - ${data.telefono}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  valorFormato_usuario(data: any) {
    let html = `(${data.id}) - ${data.nombre} - ${data.paterno} - ${data.materno} - ${data.telefono}`;
    return html;
  }
  select_usuario_autocomplete(modelo, data) {
    const un =<FormArray> this.dato.controls.usuarios_id;
    un.push(this.fb.group(data));
    (<HTMLInputElement>document.getElementById('usuarios_busqueda')).value = "";
  }

  quitar_form_array(modelo, i) {
    modelo.splice(i, 1);
  }
}