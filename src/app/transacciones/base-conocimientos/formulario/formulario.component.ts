import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'base-conocimientos-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  dato: FormGroup;
  tamano = document.body.clientHeight;
  ubicaciones_pacientes_id;
  triage_colores_id;
  estados_pacientes_id;
  

  cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;
  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer, private _el: ElementRef) { }

  ngOnInit() {
    this.dato = this.fb.group({
      proceso: ['', [Validators.required]],
      triage_colores_id: ['', [Validators.required]],
      subcategorias_cie10_id: ['', [Validators.required]],
      estados_pacientes_id: ['', [Validators.required]],
    });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }

  autocompleFormatoSubcategoriasCIE10 = (data: any) => {
    
      let html = `<span> ${data.codigo} - ${data.nombre}</span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);
  }
    
  valorFormato_SubcategoriasCIE10(data: any) {

      let html = `${data.nombre}`;
      return html;
  }

}