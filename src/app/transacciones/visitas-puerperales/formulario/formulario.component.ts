import { Component, OnInit, ElementRef} from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActivatedRoute, Params } from '@angular/router'
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'visitas-puerperales',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {
  
  dato: FormGroup;
  private c = JSON.parse(localStorage.getItem("clues"));
    
  tamano = document.body.clientHeight;

  CkeditorConfig = {
      height:document.body.clientHeight - 760
  }

public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _sanitizer: DomSanitizer, private _el: ElementRef) { }

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
          visitas_puerperiales: this.fb.array([]),
          multimedias: this.fb.group({
            img:this.fb.array([])
          }),
        }),
      ]),

  });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();

  }

autocompleListFormatter = (data: any) => {

      let html = `<span>(${data.clues}) - ${data.nombre} </span>`;
      return this._sanitizer.bypassSecurityTrustHtml(html);

}

valorFormato_clue_usuario(data: any)  {

      let html = `${data.nombre}`;
      return html;
}


}