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

  /**
  * Contiene los datos del formulario que comunican a la vista con el componente.
  * @type {FormGroup}
  */
  dato: FormGroup;
  
  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;
  
  /**
  * Contiene el id del color triage.
  * @type {any}
  */
  triage_colores_id;

  /**
  * Contiene el estado del paciente.
  * @type {any}
  */
  estados_pacientes_id;
  
  /**
  * Variable que conecta con la URL de la API, para traer los Diagnosticos CIE-10 en un Autocomplet que tiene la Vista.
  * @type {string}
  */
  cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer, private _el: ElementRef) { }
  
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
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
  
  /**
  * Método para listar los Diagnosticos CIE-10 en el Autocomplet
  * @param data contiene los elementos que se escriban en el input del Autocomplet
  */
  autocompleFormatoSubcategoriasCIE10 = (data: any) => {
    
      let html = `<span> ${data.codigo} - ${data.nombre}</span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  
  /**
  * Método para obtener el valor de la Diagnosticos CIE-10
  * @param data contiene el valor de la Diagnosticos CIE-10
  * @return void
  */
  valorFormato_SubcategoriasCIE10(data: any) {

      let html = `${data.nombre}`;
      return html;
  }

}