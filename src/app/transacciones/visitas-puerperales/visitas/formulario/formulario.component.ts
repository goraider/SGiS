import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormsModule } from '@angular/forms';
import { CrudService } from '../../../../crud/crud.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { concat } from 'rxjs/observable/concat';


declare var google: any;
//declare var Pusher: any;


@Component({
  selector: 'visitas-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent {
  
  dato: FormGroup;
  visitasArray: any[] = [];
  tamano = document.body.clientHeight;
  
  CkeditorConfig = {
    height:document.body.clientHeight - 760
  }
  
  personas: any;
  tab: number = 1;

  fecha_visita: any = '';
  observaciones: any = '';
  seAtendio: any = '';
  porque: any = '';



  //Seguimiento
  nuevo;
  antiguedad:  any = '';
  medico_reporta_id:  any = '';
  incidencias_id:  any = '';
  indicaciones:  any = '';
  reporte_medico:  any = '';
  diagnostico_egreso:  any = '';
  observacion_trabajo_social:  any = '';
  metodos_planificacion_id:  any = '';
  estados_incidencias_id:  any = '';

  ubicaciones_pacientes_id:  any = '';
  estados_pacientes_id:  any = '';
  triage_colores_id:  any = '';
  subcategorias_cie10_id:  any = '';
  turnos_id:  any = '';

  metodos_planificacion:  any = '';
  estados_incidencias:  any = '';
  estados_pacientes:  any = '';
  ubicaciones_pacientes:  any = '';
  triage_colores:  any = '';
  subcategorias_cie10:  any = '';
  turnos:  any = '';
  id:  any = '';
  esDetalle:boolean = true;


  //detalle seguimiento
  fecha:  any = '';
  medico:  any = '';
  indi:  any = '';
  reporte:  any = '';
  estado_paciente:  any = '';
  no_incidencia:  any = '';
  sub_cie10:  any = '';
  color:  any = '';
  turno:  any = '';
  ubicacion_paciente:  any = '';




  //public medicos_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

  public cie10_term: string = `${environment.API_URL}/subcategoriascie10-auto?term=:keyword`;

  public clues_term: string = `${environment.API_URL}/clues-auto?term=:keyword`;

  public url_img_referencias: string = `${environment.API_PATH}/adjunto/referencias/`;

  public url_img_altas: string = `${environment.API_PATH}/adjunto/contrareferencias/`;

  constructor(
            private router: Router,
            private route: ActivatedRoute,
            private crudService: CrudService,
            private fb: FormBuilder,
            private _sanitizer: DomSanitizer,
            private _el: ElementRef) { }
  


  ngOnInit() {


    this.route.params.subscribe(params => {
      this.id = params['id']; // Se puede agregar un simbolo + antes de la variable params para volverlo number

    });

    this.dato = this.fb.group({

      id: [''],
      impresion_diagnostica: [''],
      motivo_ingreso: [''],
      estados_incidencias_id: [''],
      clues: [''],
      tieneReferencia: [''],

      pacientes: this.fb.array([
        this.fb.group({

          personas_id: [''],

          personas: this.fb.group({
            id: [''],
            nombre: [''],
            paterno: [''],
            materno: [''],
            domicilio: [''],
            fecha_nacimiento: [''],
            telefono: [''],

            estados_embarazos_id: [''],
            derechohabientes_id: [''],
            localidades_id: [''],
          }),
          acompaniantes: this.fb.array([
            this.fb.group({

              personas_id: [''],

              personas: this.fb.group({
                id: [''],
                nombre: [''],
                paterno: [''],
                materno: [''],
                domicilio: [''],
                fecha_nacimiento: [''],
                telefono: [''],

                estados_embarazos_id: [''],
                derechohabientes_id: [''],
                localidades_id: [''],
              }),
            }),
          ]),
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
          visitas_puerperales: this.fb.array([
            this.fb.group({
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

    console.log(this.dato.controls.altas_incidencias['controls'][0]['controls']['visitas_puerperales']);

    
    


      //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    
 
        //document.getElementById("catalogos").click();

}

  cerrarModal() {
    this.ubicaciones_pacientes_id = '';
    this.estados_pacientes_id = '';
    this.triage_colores_id = '';
    this.indicaciones = '';
    this.reporte_medico = '';
    this.medico_reporta_id = '';
    this.turnos_id = '';
    this.subcategorias_cie10_id = "";
    document.getElementById("visita").classList.remove('is-active');
  }

  nueva_visita() {
    document.getElementById("visita").classList.add('is-active');
  }

  validar_visita() {
    document.getElementById("visita_datos_vacios").classList.add('is-active');
  }

  // detalle_visita(data): void {

  //   this.fecha = data.created_at;
  //   this.indi = data.indicaciones;
  //   this.reporte = data.reporte_medico;
  //   this.estado_paciente = data.estados_pacientes.nombre;
  //   this.no_incidencia = data.incidencias_id;
  //   this.sub_cie10 = data.subcategorias_cie10.nombre;
  //   this.color = data.triage_colores.nombre;
  //   this.turno = data.turnos.nombre;
  //   this.ubicacion_paciente = data.ubicaciones_pacientes.nombre;
  //   this.medico = data.medico_reporta_id;




  //   document.getElementById("detalle_visita").classList.add('is-active');
  // }
  cerrarModalDetalleVisita() {
    document.getElementById("detalle_visita").classList.remove('is-active');
  }
  cerrarModalDetalle(id) {
    document.getElementById(id).classList.remove('is-active');
  }

  abrirModalDetalle(id) {
    document.getElementById(id).classList.add('is-active');
  }

  agregarVisita() {

    this.esDetalle = false;


  if(this.fecha_visita != "" && this.observaciones != ""){

      
          var tur = 0;
          if (this.turnos)
            for (let item of this.turnos) {
              if (this.turnos_id == item.id)
                break;
              tur++;
            };
      
          var sci10 = 0;
          if (this.subcategorias_cie10)
            for (let item of this.subcategorias_cie10) {
              if (this.subcategorias_cie10_id == item.id)
                break;
              sci10++;
            };
      
      
      
          var datoVisita = {
      
            id: [''],
      
            nuevo: [1],

            esQuitar: true,

            fecha_visita:  [this.fecha_visita, [Validators.required]],
            observaciones: [this.observaciones, [Validators.required]],
            seAtendio:['1', [Validators.required]],
            porque:['razones', [Validators.required]],
                

      
            //asignaciones a las variables que recorren el objeto para obtener sus valores        
          };
      
      

      
          // if(this.estados_incidencias)      
          //   datomodal["estados_incidencias"] = this.estados_incidencias[ei]; 
      
      
      console.log("dato a pushear",datoVisita);

          //agrega al array de movimientos_incidencias para que estos tengan valores respecto a sus variables en cada seguimiento que se le realice al paciente

          const visitas_puerperales: FormArray = <FormArray>this.dato.controls.altas_incidencias['controls'][0]['controls']['visitas_puerperales'];
      
          //const visitasP: FormGroup = <FormGroup>mv.controls.visitas_puerperiales;

          console.log("visitas_puerperales",visitas_puerperales);
          visitas_puerperales.push(this.fb.group(datoVisita));



          


      
      
          


          console.log("valorArray",this.visitasArray);

          console.log("dato",this.dato.value);
      
          //asigna el estado de incidencia en proceso con numero 2 this.fb.group(datoVisita)
      
      
      
          this.fecha_visita = '';
          this.observaciones = '';

          this.cerrarModal();

    }else
    {
      this.validar_visita();
    }

  }
  cerrarModalValidacionSeguimiento() {
    document.getElementById("visitas_datos_vacios").classList.remove('is-active');
  }

  //carga la lista de catalogos de manera local
  cargarCatalogo(item, url) {
    this.crudService.lista(0, 0, url).subscribe(
      resultado => {
        this[item] = resultado.data;
      },
      error => {
      }
    );
  }

  actualizarDatos() {

    var json = this.dato.getRawValue();
    this.crudService.editar(this.id, json, 'visitas-puerperales').subscribe(
      resultado => {
      },
      error => {
      }
    )
  }

}