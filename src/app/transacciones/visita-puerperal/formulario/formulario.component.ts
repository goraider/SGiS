/**
* dependencias a utilizar
*/
import { Component, OnInit, ElementRef} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActivatedRoute, Params } from '@angular/router'
import { environment } from 'environments/environment';

/**
* selector si se desea ocupar en un HTML
* y su archivo HTML
*/
@Component({
  selector: 'visita-puerperal-formulario',
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
  * Contiene los datos de la Unidad Medica del LocalStorage
  * @type {any}
  */
  private c = JSON.parse(localStorage.getItem("clues"));
  
  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;
  
  /**
  * Contiene el tamaño del cuerpo del editor de texto para darle dormato al text area que esta en la vista.
  * @type {any}
  */
  CkeditorConfig = {
      height:document.body.clientHeight - 760
  }

  /**
  * Variable que conecta con la URL de la API, para traer Unidades Medicas en un Autocomplet que tiene la Vista.
  * @type {string}
  */
  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;
  
  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }
  
  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {

    this.dato = this.fb.group({

      no_cargar: [true],
      id: [''],
      motivo_ingreso: ['', [Validators.required]],
      impresion_diagnostica: ['', [Validators.required]],
      clues: [this.c.clues],
      estados_incidencias_id: [1],
      tieneReferencia: [''],

      pacientes: this.fb.array([
        this.fb.group({
              //pacientes[0] indice 0;
              id: [''],
              personas_id: [''],
              personas_id_viejo:[''],
              //personas objeto
          personas: this.fb.group({
              id: [''],
              nombre: ['', [Validators.required]],
              paterno: ['', [Validators.required]],
              materno: ['', [Validators.required]],
              domicilio: ['', [Validators.required]],
              fecha_nacimiento: ['', [Validators.required]],
              telefono: ['', [Validators.required, Validators.pattern("[0-9]*")]],

              estados_embarazos_id: ['', [Validators.required]],
              derechohabientes_id: ['', [Validators.required]],
              municipios_id: ['', [Validators.required]],
              localidades_id: ['', [Validators.required]],
          }),
          acompaniantes: this.fb.array([
            this.fb.group({
                  //indice 0;
                  id: [''],
                  personas_id: [''],
                  parentescos_id: ['', [Validators.required]],
                  esResponsable: [1],
                  //objeto
              personas: this.fb.group({
                  id: [''],
                  nombre: ['', [Validators.required]],
                  paterno: ['', [Validators.required]],
                  materno: ['', [Validators.required]],
                  telefono: ['', [Validators.required, Validators.pattern("[0-9]*")]],
                  domicilio: ['', [Validators.required]],
                  fecha_nacimiento: [null],
              }),
            }),
            ]),
        }),
      ]),

      referencias: this.fb.array([
          this.fb.group({
              id: [''],
              medico_refiere_id: [''],
              diagnostico: [''],
              resumen_clinico: [''],
              clues_origen: [''],
              clues_destino: [this.c.clues],
              //multimedias:[''],
              multimedias: this.fb.group({
                  img: this.fb.array([])
              }),
              esIngreso: [1]
          }),
      ]),

      altas_incidencias: this.fb.array([
        this.fb.group({
          id:[''],
          medico_reporta_id: [''],
          metodos_planificacion_id: [''],
          tipos_altas_id:[''],
          turnos_id:[''],
          diagnostico_egreso: [''],
          observacion_trabajo_social: [''],
          clues_contrarefiere:[''],
          clues_regresa:[''],
          resumen_clinico:[''],
          instrucciones_recomendaciones:[''],
          visitas_puerperales: this.fb.array([
            this.fb.group({
              id: [''],
              fecha_visita:  [''],
              observaciones: [''],
              seAtendio:[''],
              porque:[''],
            }),
          ]),
          multimedias: this.fb.group({
            img:this.fb.array([])
          }),
        }),
      ]),

  });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();

  }

  /**
  * Método para listar Unidades Medicas en el Autocomplet
  * @param data contiene los elementos que se escriban en el input del Autocomplet
  */
  autocompleListFormatter = (data: any) => {

    let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);

  }
  
  /**
  * Método para obtener el valor de la Unidad Medica
  * @param data contiene el valor de la Unidad Medica
  * @return void
  */
  valorFormato_clue_usuario(data: any)  {
    
    let html = `${data.nombre}`;
    return html;

  }


}