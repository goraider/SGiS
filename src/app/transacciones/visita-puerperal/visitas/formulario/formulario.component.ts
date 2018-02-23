import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormsModule } from '@angular/forms';
import { CrudService } from '../../../../crud/crud.service';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { concat } from 'rxjs/observable/concat';



@Component({
  selector: 'visita-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ["./formulario.component.css"]
})

export class FormularioComponent {

  @ViewChild('seAtendio') seAtendio: ElementRef;
  @ViewChild('noAtendio') noAtendio: ElementRef;
  
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
  ReciboAtencion: number = 1;
  porque: any = '';
  
  esDetalle:boolean = true;
  id:  any = '';
  


  //detalle de la visita
  fecha_detalle:  any = '';
  observaciones_detalle: any = '';
  porque_detalle: any = '';
  seAtendio_detalle: any = '';




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
    
 
        //document.getElementById("catalogos").click();
        

}

  cerrarModal() {
    this.fecha_visita = '';
    this.observaciones = '';
    this.porque = '';
    this.ReciboAtencion = 1;
    this.seAtendio.nativeElement.checked = false;
    this.noAtendio.nativeElement.checked = false;







    document.getElementById("visita").classList.remove('is-active');
  }

  nueva_visita() {
    document.getElementById("visita").classList.add('is-active');
  }

  validar_visita() {
    document.getElementById("visita_datos_vacios").classList.add('is-active');
  }

  detalle_visita(data) {


    this.fecha_detalle = data.created_at;
    this.observaciones_detalle = data.observaciones;
    this.porque_detalle = data.porque;
    this.seAtendio_detalle = data.seAtendio;





    document.getElementById("detalle_visita").classList.add('is-active');
  }
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
      
      
          var datoVisita = {
      
            id: [''],
      
            nuevo: [1],
            esQuitar: true,

            fecha_visita:  [this.fecha_visita, [Validators.required]],
            observaciones: [this.observaciones, [Validators.required]],
            seAtendio:[this.ReciboAtencion, [Validators.required]],
            porque:[this.porque],
                

      
            //asignaciones a las variables que recorren el objeto para obtener sus valores        
          };

          //agrega al array de visitas_puerperales para que estos tengan valores respecto a sus variables en cada seguimiento que se le realice al paciente

          const visitas_puerperales: FormArray = <FormArray>this.dato.controls.altas_incidencias['controls'][0]['controls']['visitas_puerperales'];
          visitas_puerperales.push(this.fb.group(datoVisita));


          this.fecha_visita = '';
          this.observaciones = '';
          this.porque = '';
          this.ReciboAtencion = 1;
          this.seAtendio.nativeElement.checked = false;
          this.noAtendio.nativeElement.checked = false;
          this.cerrarModal();

    }else
    {
      this.validar_visita();
    }

  }

  atencionVisita(){

    if(this.seAtendio.nativeElement.checked == true && this.noAtendio.nativeElement.checked == false){

      this.ReciboAtencion = 1;
      
    } else if (this.seAtendio.nativeElement.checked == false && this.noAtendio.nativeElement.checked == true) {

      this.ReciboAtencion = 0;
      
    }

  }

  cerrarModalValidacionVisita() {
    document.getElementById("visita_datos_vacios").classList.remove('is-active');
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